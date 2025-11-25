// netlify/functions/pnx-charge.js

import fetch from "node-fetch";

export const handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method not allowed" }),
        };
    }

    const PNX_API_KEY = process.env.PNX_API_KEY;
    const PNX_PAYMENT_API_BASE =
        process.env.PNX_PAYMENT_API_BASE || "https://api.qa.paynetworx.net/v0";

    if (!PNX_API_KEY) {
        console.error("PNX_API_KEY missing");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server config error: PNX_API_KEY missing" }),
        };
    }

    let body;
    try {
        body = JSON.parse(event.body || "{}");
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid JSON body" }),
        };
    }

    const { tokenId, amount, currency = "USD", orderId, items = [], customer = {} } =
        body;

    if (!tokenId || !amount) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "tokenId and amount are required" }),
        };
    }

    try {
        const payload = {
            Amount: {
                Total: String(Number(amount).toFixed(2)), // "12499.00"
                Currency: currency, // "USD", "CAD", etc.
            },
            PaymentMethod: {
                Token: {
                    TokenID: tokenId,
                },
            },
            Attributes: {
                EntryMode: "manual",
                ProcessingSpecifiers: {
                    InitiatedByECommerce: true,
                },
            },
            Detail: {
                Order: {
                    OrderNumber: orderId || `ELEV8-${Date.now()}`,
                },
                Item: items.map((item, idx) => ({
                    ItemID: item.id || `item-${idx + 1}`,
                    Description: item.name,
                    Quantity: item.quantity,
                    UnitPrice: String(
                        item.pricePerUnit != null
                            ? Number(item.pricePerUnit).toFixed(2)
                            : Number(item.price || 0).toFixed(2)
                    ),
                })),
                MerchantData: {
                    MerchantDefinedKey1: "Elev8 Kitchens Checkout",
                },
                ShipTo: customer.shippingAddress
                    ? {
                        Name: customer.name,
                        City: customer.shippingAddress.city,
                        State: customer.shippingAddress.state,
                        PostalCode: customer.shippingAddress.postalCode,
                        Country: customer.shippingAddress.country || "US",
                    }
                    : undefined,
            },
        };

        const resp = await fetch(
            `${PNX_PAYMENT_API_BASE}/transaction/authcapture`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: PNX_API_KEY,
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await resp.json();

        // Adjust based on Paynetworx response fields – most gateways return something like Approved/ResultCode etc.
        if (!resp.ok || data.Approved === false) {
            console.error("PNX charge declined:", data);
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Payment not approved",
                    pnx: data,
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                transactionId: data.TransactionID,
                pnx: data,
            }),
        };
    } catch (err) {
        console.error("PNX charge exception:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error charging card" }),
        };
    }
};
