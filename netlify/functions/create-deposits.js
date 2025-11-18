// netlify/functions/create-deposits.js
import { SquareClient, SquareError } from "square";
import { randomUUID } from "crypto";

console.log(
    "SQUARE_ENVIRONMENT =", process.env.SQUARE_ENVIRONMENT,
    "TOKEN_PRESENT =", !!process.env.SQUARE_ACCESS_TOKEN
);

// Make sure these are set in Netlify / .env:
//   SQUARE_ACCESS_TOKEN  = your Sandbox Access Token (starts with EAAA...)
//   SQUARE_LOCATION_ID   = your Sandbox location ID (e.g. LYYKJ0GMAEG2G)
const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
});

// $1,000 minimum in cents, as BigInt
const MIN_DEPOSIT = 1000n * 100n; // 100000n

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
            body: JSON.stringify({ success: false, error: "Method not allowed" }),
        };
    }

    try {
        const { nonce, customerId, currency = "USD", depositAmount } = JSON.parse(
            event.body || "{}"
        );

        if (!nonce) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ success: false, error: "Missing nonce" }),
            };
        }

        // depositAmount is expected in **cents** from the frontend
        let amountMinor = 0;
        if (typeof depositAmount === "number") {
            amountMinor = depositAmount;
        } else if (typeof depositAmount === "string") {
            amountMinor = parseInt(depositAmount, 10) || 0;
        }

        if (!Number.isFinite(amountMinor) || amountMinor <= 0) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    success: false,
                    error: "Invalid deposit amount.",
                }),
            };
        }

        // Convert to BigInt for the new SDK
        const amountMinorBigInt = BigInt(amountMinor);

        // Enforce minimum $1,000
        if (amountMinorBigInt < MIN_DEPOSIT) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    success: false,
                    error: "Deposit must be at least $1,000.",
                }),
            };
        }

        const locationId =
            process.env.SQUARE_LOCATION_ID || "REPLACE_WITH_LOCATION_ID";

        // 1️⃣ Create the deposit payment (new SDK style)
        const paymentResponse = await client.payments.create({
            sourceId: nonce,
            idempotencyKey: randomUUID(),
            amountMoney: {
                amount: amountMinorBigInt, // BigInt cents
                currency,
            },
            locationId,
            customerId, // can be undefined
            autocomplete: true,
            note: `Custom deposit (${amountMinor} cents)`,
        });

        const payment = paymentResponse.payment;
        if (!payment) throw new Error("No payment returned from Square.");

        // 2️⃣ If we don't have a customer yet, create one
        let finalCustomerId = customerId;
        if (!finalCustomerId) {
            const customerResponse = await client.customers.create({
                idempotencyKey: randomUUID(),
                givenName: "Deposit Customer",
                note: "Auto-created during deposit checkout",
            });
            finalCustomerId = customerResponse.customer?.id;
        }

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                success: true,
                paymentId: payment.id,
                customerId: finalCustomerId,
            }),
        };
    } catch (err) {
        console.error("Square error", err);

        if (err instanceof SquareError) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    success: false,
                    error: "Square API error",
                    details: err.body,
                }),
            };
        }

        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                success: false,
                error: "Internal server error",
                message: err.message,
            }),
        };
    }
};
