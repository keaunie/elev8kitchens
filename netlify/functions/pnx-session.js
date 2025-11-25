// netlify/functions/pnx-session.js

// NOTE: On Netlify (Node 18+), fetch is built-in – no need for node-fetch

const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // or lock to your Hostinger domain
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: corsHeaders,
            body: "",
        };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Method not allowed" }),
        };
    }

    const PNX_API_KEY = process.env.PNX_API_KEY;
    const PNX_HOSTED_SESSIONS_URL =
        process.env.PNX_HOSTED_SESSIONS_URL ||
        "https://api.hosted-payments-qa.paynetworx.cloud/v1/payments/sessions/create";

    if (!PNX_API_KEY) {
        console.error("PNX_API_KEY missing");
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: "Server config error: PNX_API_KEY missing",
            }),
        };
    }

    try {
        const resp = await fetch(PNX_HOSTED_SESSIONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Paynetworx usually expects Authorization: <API_KEY>
                Authorization: PNX_API_KEY,
            },
            body: JSON.stringify({
                payment_session: {
                    payment_session_use: "TOKENIZE",
                },
            }),
        });

        const data = await resp.json().catch(() => ({}));

        if (!resp.ok || !data.payment_session?.payment_session_url) {
            console.error("Paynetworx session error:", data);
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: "Failed to create paynetworx session",
                    details: data,
                }),
            };
        }

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                payment_session_url: data.payment_session.payment_session_url,
                expires_at: data.payment_session.expires_at,
            }),
        };
    } catch (err) {
        console.error("PNX session exception:", err);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Server error creating session" }),
        };
    }
};
