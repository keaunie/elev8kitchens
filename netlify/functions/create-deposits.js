// netlify/functions/create-deposits.js
import { Client, ApiError } from "square";
import { randomUUID } from "crypto";

const MIN_DEPOSIT = 1000 * 100; // $1,000 in cents

// 🔧 Initialize Square client in **sandbox** mode
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox", // 👈 string form is supported in the Node SDK
});

// Optional debug logs to verify env vars are loaded
console.log("Has SQUARE_ACCESS_TOKEN?", !!process.env.SQUARE_ACCESS_TOKEN);
console.log("Has SQUARE_LOCATION_ID?", !!process.env.SQUARE_LOCATION_ID);

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

    const locationId = process.env.SQUARE_LOCATION_ID;
    if (!locationId) {
      return {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          success: false,
          error: "SQUARE_LOCATION_ID is not configured on the server.",
        }),
      };
    }

    // 🔢 depositAmount from frontend is in minor units (cents)
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

    const paymentsApi = client.paymentsApi;

    // 💳 1) Create the deposit payment
    const paymentResponse = await paymentsApi.createPayment({
      sourceId: nonce,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: amountMinor, // integer cents
        currency,
      },
      locationId,
      customerId, // may be undefined
      autocomplete: true,
      note: `Custom deposit (${amountMinor} cents)`,
    });

    const payment = paymentResponse.result.payment;
    if (!payment) throw new Error("No payment returned from Square.");

    // 👤 2) Ensure we have a customer (if none was passed)
    let finalCustomerId = customerId;
    if (!finalCustomerId) {
      const customersApi = client.customersApi;
      const custResp = await customersApi.createCustomer({
        idempotencyKey: randomUUID(),
        givenName: "Deposit Customer",
        note: "Auto-created during deposit checkout",
      });
      finalCustomerId = custResp.result.customer?.id;
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

    if (err instanceof ApiError) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          success: false,
          error: "Square API error",
          details: err.result,
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
