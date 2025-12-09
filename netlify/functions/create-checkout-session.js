import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const successUrl = process.env.STRIPE_SUCCESS_URL || "http://localhost:5173/order-complete";
const cancelUrl = process.env.STRIPE_CANCEL_URL || "http://localhost:5173/cart";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!stripeSecret) {
    return { statusCode: 500, body: JSON.stringify({ error: "Stripe secret key missing" }) };
  }

  try {
    const stripe = new Stripe(stripeSecret);
    const { lineItems = [] } = JSON.parse(event.body || "{}");

    const items = lineItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title || "ELEV8 Kitchen" },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Stripe error" }),
    };
  }
}
