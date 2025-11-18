// netlify/functions/create-deposits.js
import Square from "square";
import { randomUUID } from "crypto";

// Pull the classes off the default export (CJS interop)
const { SquareClient, SquareEnvironment, SquareError } = Square;

const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const LOCATION_ID = process.env.SQUARE_LOCATION_ID;

console.log("ENV CHECK:", {
    APP_ID: process.env.VITE_SQUARE_APP_ID,
    LOC_ID: process.env.SQUARE_LOCATION_ID,
    TOKEN: process.env.SQUARE_ACCESS_TOKEN ? "OK" : "MISSING",
    ENV: process.env.SQUARE_ENVIRONMENT,
});



// Hard-code sandbox while testing to avoid confusion
const client = new SquareClient({
    token: ACCESS_TOKEN,
    environment: SquareEnvironment.Sandbox, // ← this forces sandbox host
});

// $1,000 minimum deposit (in cents)
const MIN_DEPOSIT = 1000 * 100;

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

        if (!LOCATION_ID) {
            return {
                statusCode: 500,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    success: false,
                    error: "SQUARE_LOCATION_ID is not configured on the server.",
                }),
            };
        }

        // ---- validate deposit in minor units (cents) ----
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

        // ---- Payments API call (new SDK pattern) ----
        const paymentsApi = client.payments;
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


        const payment = paymentResponse.payment;
        if (!payment) {
            throw new Error("No payment returned from Square.");
        }

        // 🔄 Create a customer if we don't already have one
        let finalCustomerId = customerId;
        if (!finalCustomerId) {
            const customersApi = client.customers;
            const custResp = await customersApi.create({
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
                    details: err.body || err,
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
