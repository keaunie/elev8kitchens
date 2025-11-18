// netlify/functions/create-deposit.js
import { SquareClient, SquareError } from "square";
import { randomUUID } from "crypto";

const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
});

export const handler = async (event) => {
    // CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
            },
            body: "",
        };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Method not allowed" }),
        };
    }

    try {
        const { nonce, customerId, currency = "USD" } = JSON.parse(event.body || "{}");

        if (!nonce) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Missing nonce" }),
            };
        }

        const locationId =
            process.env.SQUARE_LOCATION_ID || "REPLACE_WITH_LOCATION_ID";

        // 🔒 Enforce fixed deposit amount on the server
        const DEPOSIT_AMOUNT = 100000n; // $1,000.00 in minor units (cents) as BigInt

        // 1️⃣ Create the deposit payment
        const paymentResponse = await client.payments.create({
            sourceId: nonce,
            idempotencyKey: randomUUID(),
            amountMoney: {
                amount: DEPOSIT_AMOUNT,
                currency,
            },
            locationId,
            customerId, // optional but recommended if you have one
            autocomplete: true,
            note: "Deposit payment",
        });

        const payment = paymentResponse.payment;
        if (!payment) {
            throw new Error("No payment returned from Square.");
        }

        // 2️⃣ Ensure we have a customer (you can also create one here if needed)
        let finalCustomerId = customerId;
        if (!finalCustomerId) {
            const custResp = await client.customers.create({
                idempotencyKey: randomUUID(),
                givenName: "Deposit Customer",
                note: "Created automatically during deposit checkout",
            });
            finalCustomerId = custResp.customer?.id;
        }

        // 3️⃣ Save the card on file using the payment ID as the source
        const cardResp = await client.cards.create({
            idempotencyKey: randomUUID(),
            sourceId: payment.id, // payment ID as source for card-on-file
            card: {
                customerId: finalCustomerId,
            },
        });

        const card = cardResp.card;

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                success: true,
                paymentId: payment.id,
                customerId: finalCustomerId,
                cardId: card?.id,
            }),
        };
    } catch (err) {
        console.error("Square error", err);

        if (err instanceof SquareError) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    error: "SquareError",
                    details: err.body,
                }),
            };
        }

        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                error: "Internal server error",
                message: err.message,
            }),
        };
    }
};
