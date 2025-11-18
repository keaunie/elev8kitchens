// src/DepositCheckout.jsx
import React, { useEffect, useState } from "react";

const appId = import.meta.env.VITE_SQUARE_APP_ID || "REPLACE_WITH_APP_ID";
const locationId =
    import.meta.env.VITE_SQUARE_LOCATION_ID || "REPLACE_WITH_LOCATION_ID";

const MIN_DEPOSIT = 1000; // dollars

export default function DepositCheckout() {
    const [card, setCard] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [deposit, setDeposit] = useState("1000"); // user-controlled amount
    const [error, setError] = useState("");

    // Initialize Square Payments SDK
    useEffect(() => {
        let isMounted = true;

        async function initSquare() {
            try {
                if (!window.Square) {
                    console.error("Square Web Payments SDK not loaded.");
                    setStatus("Payment SDK not loaded.");
                    return;
                }

                const container = document.getElementById("card-container");
                if (!container) {
                    console.warn("card-container not found in DOM.");
                    return;
                }
                // Prevent double-attach in React 18 StrictMode
                if (container.children.length > 0) {
                    return;
                }

                const paymentsInstance = window.Square.payments(appId, locationId);
                const cardInstance = await paymentsInstance.card();
                await cardInstance.attach("#card-container");

                if (isMounted) {
                    setCard(cardInstance);
                }
            } catch (err) {
                console.error("Error initializing Square", err);
                setStatus("Failed to initialize payments.");
            }
        }

        initSquare();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!card) return;

        // validate deposit
        const raw = (deposit || "").toString().replace(/,/g, "");
        const amount = parseFloat(raw);

        if (Number.isNaN(amount) || amount <= 0) {
            setError("Please enter a valid deposit amount.");
            return;
        }
        if (amount < MIN_DEPOSIT) {
            setError(`Minimum deposit is $${MIN_DEPOSIT.toLocaleString()}.`);
            return;
        }

        setError("");
        setLoading(true);
        setStatus("");

        try {
            const result = await card.tokenize();
            if (result.status !== "OK") {
                console.error("Tokenization failed:", result);
                const firstError = result.errors?.[0]?.message;
                setStatus(
                    firstError || "Card tokenization failed. Please check your details."
                );
                setLoading(false);
                return;
            }

            const nonce = result.token;
            const depositAmountMinor = Math.round(amount * 100); // cents

            const res = await fetch("/.netlify/functions/create-deposits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nonce,
                    currency: "USD",
                    depositAmount: depositAmountMinor, // <-- dynamic amount
                    // customerId: "optional-your-own-user-id",
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                console.error("Deposit error", data);
                const apiError =
                    data.error ||
                    data?.details?.errors?.[0]?.detail ||
                    "Unknown error from payment gateway.";
                setStatus("Payment failed: " + apiError);
            } else {
                setStatus(
                    `Deposit successful! A $${amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })} deposit has been charged.`
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
            <h2>Pay a custom deposit</h2>
            <p>
                Choose how much you want to pay today (minimum $
                {MIN_DEPOSIT.toLocaleString()}). The remaining balance will be arranged
                with our team.
            </p>

            <form onSubmit={handleSubmit}>
                {/* Deposit amount input */}
                <label style={{ display: "block", marginTop: "1rem", fontSize: 12 }}>
                    Deposit amount (USD, min ${MIN_DEPOSIT.toLocaleString()})
                </label>
                <input
                    type="number"
                    min={MIN_DEPOSIT}
                    step="0.01"
                    value={deposit}
                    onChange={(e) => {
                        setDeposit(e.target.value);
                        setError("");
                    }}
                    style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 9999,
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "#000",
                        color: "#fff",
                        marginTop: 4,
                    }}
                    placeholder="e.g. 2500"
                />
                {error && (
                    <p style={{ color: "#fca5a5", fontSize: 11, marginTop: 4 }}>
                        {error}
                    </p>
                )}

                {/* Square card field */}
                <div id="card-container" style={{ margin: "1rem 0" }} />

                <button type="submit" disabled={loading || !card}>
                    {loading ? "Processing deposit..." : "Pay Deposit via Square"}
                </button>
            </form>

            {status && <p style={{ marginTop: "1rem", fontSize: 12 }}>{status}</p>}
        </div>
    );
}
