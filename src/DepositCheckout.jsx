// src/DepositCheckout.jsx
import React, { useEffect, useState } from "react";

const appId = import.meta.env.VITE_SQUARE_APP_ID || "REPLACE_WITH_APP_ID";
const locationId =
    import.meta.env.VITE_SQUARE_LOCATION_ID || "REPLACE_WITH_LOCATION_ID";

export default function DepositCheckout() {
    const [card, setCard] = useState(null);
    const [payments, setPayments] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // Initialize Square Payments SDK
    useEffect(() => {
        async function initSquare() {
            try {
                if (!window.Square) {
                    console.error("Square Web Payments SDK not loaded.");
                    setStatus("Payment SDK not loaded.");
                    return;
                }

                const paymentsInstance = window.Square.payments(appId, locationId);
                const cardInstance = await paymentsInstance.card();
                await cardInstance.attach("#card-container");

                setPayments(paymentsInstance);
                setCard(cardInstance);
            } catch (err) {
                console.error("Error initializing Square", err);
                setStatus("Failed to initialize payments.");
            }
        }

        initSquare();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!card) return;

        setLoading(true);
        setStatus("");

        try {
            const result = await card.tokenize();
            if (result.status !== "OK") {
                console.error("Tokenization failed:", result);
                setStatus("Card tokenization failed. Please try again.");
                setLoading(false);
                return;
            }

            const nonce = result.token;

            // Optional: pass your own customerId if you manage users
            const res = await fetch("/.netlify/functions/create-deposit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nonce,
                    // customerId: "your-own-user-id-if-you-have-one",
                    currency: "USD", // or "CAD", etc.
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                console.error("Deposit error", data);
                setStatus("Payment failed: " + (data.error || "Unknown error"));
            } else {
                setStatus(
                    `Deposit successful! Customer ID: ${data.customerId}, Card ID: ${data.cardId}`
                );
            }
        } catch (err) {
            console.error("Unexpected error", err);
            setStatus("Unexpected error during payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="deposit-checkout">
            <h2>Pay $1,000 Deposit</h2>
            <p>This will securely charge a $1,000 deposit through Square.</p>

            <form onSubmit={handleSubmit}>
                <div id="card-container" style={{ margin: "1rem 0" }}></div>

                <button type="submit" disabled={loading || !card}>
                    {loading ? "Processing..." : "Pay $1,000 Deposit"}
                </button>
            </form>

            {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
        </div>
    );
}
