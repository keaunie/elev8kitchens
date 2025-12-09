import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const successUrl =
  process.env.STRIPE_SUCCESS_URL ||
  "https://elev8kitchens.netlify.app/order-complete";
const cancelUrl =
  process.env.STRIPE_CANCEL_URL || "https://elev8kitchens.netlify.app/cart";

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

    const items = lineItems.map((item) => {
      const descriptionParts = [];
      if (item.size) descriptionParts.push(`Size: ${item.size}`);
      if (item.color) descriptionParts.push(`Finish: ${item.color}`);
      if (item.type) descriptionParts.push(`Type: ${item.type}`);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title || "ELEV8 Kitchen",
            description: descriptionParts.join(" | ") || undefined,
            metadata: {
              size: item.size || "",
              color: item.color || "",
              type: item.type || "",
              isDeposit: item.isDeposit ? "true" : "false",
            },
          },
          unit_amount: Math.round((item.price || 0) * 100),
        },
        quantity: item.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      phone_number_collection: { enabled: true },
      metadata: {
        orderType: items.some((i) => i.price_data?.product_data?.metadata?.isDeposit === "true")
          ? "deposit"
          : "full",
      },
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
