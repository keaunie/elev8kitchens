// netlify/functions/create-deposits.js
import { SquareClient, SquareError } from "square";
import { randomUUID } from "crypto";

// Make sure these are set in Netlify environment variables:
// SQUARE_ACCESS_TOKEN  (sandbox or production)
// SQUARE_LOCATION_ID
const client = new SquareClient({
    // with the new SDK, you just pass the token; sandbox vs prod is based on token
    token: process.env.SQUARE_ACCESS_TOKEN,
});

const MIN_DEPOSIT = 1000 * 100; // $1,000 in cents (number)

/**
 * Netlify Function: create-deposits
 * URL: /.netlify/functions/create-deposits
 */
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

        // Validate deposit amount from frontend (in minor units / cents)
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

        if (amountMinor < MIN_DEPOSIT) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    success: false,
                    error: "Deposit must be at least $1,000.",
                }),
            };
        }

        // 👇 put your real sandbox Location ID here as a fallback
        const locationId =
            process.env.SQUARE_LOCATION_ID || "LYYKJ0GMAEG2G";

        if (!locationId || locationId === "YOUR_SANDBOX_LOCATION_ID_HERE") {
            return {
                statusCode: 500,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    success: false,
                    error: "SQUARE_LOCATION_ID is not configured correctly on the server.",
                }),
            };
        }


        // 1️⃣ Create the deposit payment with the new SquareClient style
        const paymentResponse = await client.payments.create({
            sourceId: nonce,
            idempotencyKey: randomUUID(),
            amountMoney: {
                amount: BigInt(amountMinor), // convert to BigInt for the new SDK
                currency,
            },
            locationId,
            customerId, // can be undefined
            autocomplete: true,
            note: `Custom deposit (${amountMinor} cents)`,
        });

        const payment = paymentResponse.payment;
        if (!payment) throw new Error("No payment returned from Square.");

        // 2️⃣ Ensure we have a customer (if no customerId was passed)
        let finalCustomerId = customerId;
        if (!finalCustomerId) {
            const custResp = await client.customers.create({
                idempotencyKey: randomUUID(),
                givenName: "Deposit Customer",
                note: "Auto-created during deposit checkout",
            });
            finalCustomerId = custResp.customer?.id;
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
                    details: err.body ?? err.result,
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
