// netlify/functions/charge-remaining.js
import Square from "square";
import { randomUUID } from "crypto";

// Pull the classes off the default export (CJS interop), same as create-deposits.js
const { SquareClient, SquareEnvironment, SquareError } = Square;

const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const LOCATION_ID = process.env.SQUARE_LOCATION_ID;
const ENVIRONMENT = process.env.SQUARE_ENVIRONMENT;

// Optional debug
console.log("CHARGE REMAINING ENV:", {
  LOC_ID: LOCATION_ID,
  TOKEN: ACCESS_TOKEN ? "OK" : "MISSING",
  ENV: ENVIRONMENT,
});

// Use the same sandbox-forced client you use for deposits
const client = new SquareClient({
  token: ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
});

// This function charges the remaining balance using a saved card-on-file
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
    const {
      customerId,
      cardId,          // card-on-file ID
      remainingAmount, // in minor units (cents) e.g. 200000 for $2,000
      currency = "USD",
      note = "Remaining balance",
    } = JSON.parse(event.body || "{}");

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

    if (!customerId || !cardId || remainingAmount == null) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          success: false,
          error: "Missing customerId, cardId, or remainingAmount",
        }),
      };
    }

    // ---- validate amount in cents ----
    let amountMinor = 0;
    if (typeof remainingAmount === "number") {
      amountMinor = remainingAmount;
    } else if (typeof remainingAmount === "string") {
      amountMinor = parseInt(remainingAmount, 10) || 0;
    }

    if (!Number.isFinite(amountMinor) || amountMinor <= 0) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          success: false,
          error: "Invalid remainingAmount.",
        }),
      };
    }

    const paymentsApi = client.payments;

    // 🔁 Charge the remaining balance using the saved card
    const paymentResponse = await paymentsApi.create({
      sourceId: cardId, // card on file
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amountMinor), // must be BigInt for this SDK
        currency,
      },
      locationId: LOCATION_ID,
      customerId,
      autocomplete: true,
      note,
    });

    const payment = paymentResponse.payment;
    if (!payment) {
      throw new Error("No payment returned from Square for remaining charge.");
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        success: true,
        paymentId: payment.id,
        customerId,
        amountCharged: amountMinor,
      }),
    };
  } catch (err) {
    console.error("Square error (remaining)", err);

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
