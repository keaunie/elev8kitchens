// netlify/functions/charge-remaining.js
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
        const {
            customerId,
            cardId,
            remainingAmount, // in minor units (cents) e.g. 200000 for $2,000
            currency = "USD",
            note = "Remaining balance",
        } = JSON.parse(event.body || "{}");

        if (!customerId || !cardId || !remainingAmount) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    error: "Missing customerId, cardId, or remainingAmount",
                }),
            };
        }

        const locationId =
            process.env.SQUARE_LOCATION_ID || "REPLACE_WITH_LOCATION_ID";

        const paymentResponse = await paymentsApi.create({
            sourceId: nonce,
            idempotencyKey: randomUUID(),
            amountMoney: {
                amount: BigInt(amountMinor), // FIXED — must be BigInt
                currency,
            },
            locationId: LOCATION_ID,
            customerId,
            autocomplete: true,
            note: `Custom deposit (${amountMinor} cents)`,
        });


        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                success: true,
                payment: paymentResponse.payment,
            }),
        };
    } catch (err) {
        console.error("Square error (remaining)", err);

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
