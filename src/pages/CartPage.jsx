// CartPage.jsx — Elev8 Kitchens / ELEV8 theme

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import catalog from "../data/products.json";

const SQUARE_APP_ID =
  import.meta.env.VITE_SQUARE_APP_ID || "REPLACE_WITH_APP_ID";
const SQUARE_LOCATION_ID =
  import.meta.env.VITE_SQUARE_LOCATION_ID || "REPLACE_WITH_LOCATION_ID";

const formatMoney = (dollars) =>
  `$ ${Number(dollars || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function findProductByHandleOrId(handle, productId) {
  return (
    catalog.products.find((p) => p.handle === handle) ||
    catalog.products.find((p) => p.id === productId) ||
    catalog.products[0]
  );
}

function findVariant(product, { sku, size, color }) {
  if (!product) return null;
  return (
    product.variants.find((v) => v.sku === sku) ||
    product.variants.find(
      (v) => v.options?.Size === size && v.options?.Color === color
    ) ||
    product.variants[0]
  );
}

export default function CartPage({ onCheckout }) {
  const { items, updateQuantity, removeItem } = useCart();

  // Modal state for checkout
  const [showMultiModal, setShowMultiModal] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState("standard"); // "standard" | "split" | "custom"
  const [customDepositAmount, setCustomDepositAmount] = useState(null);

  // Hydrate each cart line with product + variant data
  const hydrated = useMemo(() => {
    return items.map((line) => {
      const product = findProductByHandleOrId(line.handle, line.productId);
      const variant = findVariant(product, line);
      return {
        line,
        product,
        variant,
        title: product?.title || "ELEV8 Modular Outdoor BBQ Kitchen",
        variantTitle: `${line.size} · ${line.color}`,
        price: variant?.price ?? 0,
        compareAt: variant?.compare_at_price ?? null,
        image: (variant?.images && variant.images[0]) || "",
      };
    });
  }, [items]);

  const hasItems = hydrated.length > 0;

  const subtotal = useMemo(
    () => hydrated.reduce((sum, item) => sum + item.price * item.line.qty, 0),
    [hydrated]
  );

  const shippingEstimate = 0; // show as "TBD via custom quote"
  const taxEstimate = 0; // "Calculated at checkout"
  const total = subtotal + shippingEstimate + taxEstimate;

  // Standard full-payment checkout (multi-item)
  const MULTI_ITEM_CHECKOUT_URL = "https://square.link/u/EKt1svLu";

  // Split payment checkout (20% deposit)
  const SPLIT_PAYMENT_CHECKOUT_URL = "https://square.link/u/EKt1svLu";
  // const SPLIT_PAYMENT_CHECKOUT_URL = "https://square.link/u/4WPmgEHA"; Monthly (Not Recommended)

  const handleCheckout = () => {
    if (!hydrated.length) return;

    // If all items are the same variant (same SKU), send directly to that variant's Square link
    const skus = hydrated
      .map((item) => item.variant?.sku)
      .filter(Boolean);

    const uniqueSkus = Array.from(new Set(skus));

    if (uniqueSkus.length === 1) {
      const firstVariant = hydrated[0]?.variant;
      const paymentLink = firstVariant?.payment_link; // from products.json

      if (paymentLink) {
        window.location.href = paymentLink;
        return;
      }
    }

    // Fallback: multi-item cart → standard full-payment checkout via modal
    setCheckoutMode("standard");
    setShowMultiModal(true);
  };

  const handleSplitCheckout = () => {
    if (!hydrated.length) return;
    setCheckoutMode("split");
    setShowMultiModal(true);
  };

  const handleCustomDepositCheckout = (amount) => {
    if (!hydrated.length) return;
    if (!amount || amount <= 0) {
      alert("Please enter a valid deposit amount greater than 0.");
      return;
    }
    if (amount > total) {
      alert("Deposit amount cannot be greater than the cart total.");
      return;
    }
    setCustomDepositAmount(amount);
    setCheckoutMode("custom");
    setShowMultiModal(true);
  };

  const handleConfirmMultiCheckout = () => {
    const targetUrl =
      checkoutMode === "split"
        ? SPLIT_PAYMENT_CHECKOUT_URL
        : MULTI_ITEM_CHECKOUT_URL; // "custom" also goes through multi-item checkout

    if (!targetUrl) {
      alert(
        "Checkout link is not configured yet. Please contact support or try again later."
      );
      return;
    }
    setShowMultiModal(false);
    window.location.href = targetUrl;
  };

  const handleCancelMultiCheckout = () => {
    setShowMultiModal(false);
  };

  return (
    <section className="relative min-h-screen bg-black text-white pb-24">
      {/* Ambient gold glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#C1A88B]/10 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-[#C1A88B]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-24 lg:pt-28">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl text-[#C1A88B]">
              Your ELEV8 Cart
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base text-white/70">
              Review your ELEV8 modular outdoor kitchen configuration before
              checkout. Adjust sizes, finishes, and quantities to match your
              dream backyard setup.
            </p>
          </div>
          {hasItems && (
            <div className="rounded-full bg-white/5 px-4 py-2 text-xs md:text-sm text-white/70 ring-1 ring-white/10">
              <span className="font-medium text-white">
                {items.reduce((sum, i) => sum + i.qty, 0)} item
                {items.reduce((sum, i) => sum + i.qty, 0) > 1 ? "s" : ""}
              </span>{" "}
              in cart
            </div>
          )}
        </div>

        {/* Layout: items + summary */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* LEFT: items */}
          <div>
            {!hasItems && <EmptyCartState />}

            <AnimatePresence>
              {hydrated.map((entry) => (
                <CartLineItem
                  key={entry.line.sku}
                  entry={entry}
                  onIncrease={() =>
                    updateQuantity(entry.line.sku, entry.line.qty + 1)
                  }
                  onDecrease={() =>
                    updateQuantity(entry.line.sku, entry.line.qty - 1)
                  }
                  onRemove={() => removeItem(entry.line.sku)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT: summary */}
          <div className="lg:sticky lg:top-24">
            <OrderSummaryCard
              subtotal={subtotal}
              shipping={shippingEstimate}
              tax={taxEstimate}
              total={total}
              disabled={!hasItems}
              onCheckout={handleCheckout}
              onSplitCheckout={handleSplitCheckout}
              onCustomDepositCheckout={handleCustomDepositCheckout}
            />
          </div>
        </div>

        {/* Reassurance band */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] p-6 ring-1 ring-white/10">
          <div className="grid gap-6 md:grid-cols-3">
            <ReassuranceItem
              icon={<Truck className="h-5 w-5" />}
              title="White-Glove Delivery"
              body="Partner logistics for curbside or full-service backyard delivery across North America."
            />
            <ReassuranceItem
              icon={<ShieldCheck className="h-5 w-5" />}
              title="1-Year Warranty"
              body="ELEV8 is engineered to last, backed by a limited 1-year warranty on core components."
            />
            <ReassuranceItem
              icon={<CreditCard className="h-5 w-5" />}
              title="Flexible Payments"
              body="Pay in full or split into manageable Deposit Payment at checkout, subject to approval."
            />
          </div>
        </div>
      </div>

      {/* Luxurious multi-item / split / custom checkout modal */}
      <AnimatePresence>
        {showMultiModal && (
          <MultiItemCheckoutModal
            total={total}
            mode={checkoutMode}
            customAmount={customDepositAmount}
            onConfirm={handleConfirmMultiCheckout}
            onCancel={handleCancelMultiCheckout}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ====== Subcomponents ====== */

function CartLineItem({ entry, onIncrease, onDecrease, onRemove }) {
  const { line, title, variantTitle, price, compareAt, image } = entry;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="mb-4 rounded-3xl bg-[#0f0f0f]/80 p-4 md:p-5 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Thumbnail */}
        <div className="sm:w-40">
          <div className="overflow-hidden rounded-2xl bg-[#151515] ring-1 ring-white/10">
            <img
              src={image}
              alt={title}
              className="aspect-[4/3] w-full object-cover transition duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Details + controls */}
        <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
          <div className="flex-1 space-y-2">
            <h2 className="text-base md:text-lg font-medium text-white">
              {title}
            </h2>
            {variantTitle && (
              <p className="text-xs md:text-sm text-white/60">
                {variantTitle}
              </p>
            )}
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-white/60">
              {line.size && (
                <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  Size: <span className="text-white">{line.size}</span>
                </span>
              )}
              {line.color && (
                <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  Finish: <span className="text-white">{line.color}</span>
                </span>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-end justify-between gap-3">
            {/* Qty controls */}
            <div className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/12">
              <button
                className="p-2 hover:bg-white/5"
                aria-label="Decrease quantity"
                onClick={onDecrease}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 text-sm tabular-nums">{line.qty}</span>
              <button
                className="p-2 hover:bg-white/5"
                aria-label="Increase quantity"
                onClick={onIncrease}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Pricing */}
            <div className="text-right">
              <p className="text-base md:text-lg font-semibold text-white">
                {formatMoney(price * line.qty)}
              </p>
              <div className="mt-1 text-xs text-white/60">
                <span>Unit: {formatMoney(price)}</span>
                {compareAt && (
                  <span className="ml-2 line-through text-white/40">
                    {formatMoney(compareAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-1 text-xs text-red-300/80 hover:text-red-200"
            >
              <Trash2 className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
function OrderSummaryCard({
  subtotal,
  shipping,
  tax,
  total,
  disabled,
  onCheckout,
  onSplitCheckout,
  onCustomDepositCheckout,
}) {
  const [paymentOption, setPaymentOption] = useState("full"); // "full" | "split" | "custom"
  const [open, setOpen] = useState(false);
  const [customDeposit, setCustomDeposit] = useState("");
  const [customError, setCustomError] = useState("");
  const [showShippingModal, setShowShippingModal] = useState(false);

  const paymentOptions = [
    { value: "full", label: "Pay in full today" },
    { value: "split", label: "Deposit Payment (20% Deposit)" },
    // { value: "custom", label: "Custom Deposit Amount" },
  ];

  const current =
    paymentOptions.find((opt) => opt.value === paymentOption) ||
    paymentOptions[0];

  const isSplit = paymentOption === "split";
  const isCustom = paymentOption === "custom";

  const depositDue = isSplit ? total * 0.2 : total;

  const primaryLabel =
    paymentOption === "split"
      ? `Pay 20% Deposit (${formatMoney(depositDue)})`
      : isCustom
        ? "Proceed with Custom Deposit"
        : "Proceed to Checkout";

  // Checkout logic (full / split / custom)
  const performCheckout = () => {
    if (disabled) return;

    if (paymentOption === "split") {
      (onSplitCheckout || onCheckout)();
      return;
    }

    if (paymentOption === "custom") {
      const raw = (customDeposit || "").toString().replace(/,/g, "");
      const amount = parseFloat(raw);

      if (Number.isNaN(amount) || amount <= 0) {
        setCustomError("Please enter a valid deposit amount.");
        return;
      }
      if (amount > total) {
        setCustomError("Deposit cannot be greater than the cart total.");
        return;
      }

      setCustomError("");
      if (onCustomDepositCheckout) {
        onCustomDepositCheckout(amount);
      } else {
        onCheckout();
      }
      return;
    }

    // full goes through standard checkout
    onCheckout();
  };

  // Main button → show Shipping Quote Modal first
  const handlePrimaryClick = () => {
    if (disabled) return;
    setShowShippingModal(true);
  };

  const handleSelect = (value) => {
    setPaymentOption(value);
    setOpen(false);
    if (value !== "custom") {
      setCustomError("");
    }
  };

  return (
    <div className="rounded-[28px] bg-[#0f0f0f]/80 p-5 md:p-6 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
      <h2 className="font-heading text-xl text-[#C1A88B]">Order Summary</h2>

      <div className="mt-5 space-y-3 text-sm text-white/80">
        <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
        <SummaryRow
          label="Estimated Shipping"
          value={
            shipping === 0 ? "TBD via custom quote" : formatMoney(shipping)
          }
        />
        <SummaryRow
          label="Estimated Tax"
          value={tax === 0 ? "Calculated at checkout" : formatMoney(tax)}
        />
        <div className="border-t border-white/10 pt-3 space-y-2">
          {isSplit ? (
            <>
              <SummaryRow
                label="Cart total (excl. shipping)"
                value={formatMoney(total)}
              />
              <SummaryRow
                label="Due today (20% deposit)"
                value={formatMoney(depositDue)}
                bold
                large
              />
            </>
          ) : (
            <SummaryRow
              label="Total (excl. shipping)"
              value={formatMoney(total)}
              bold
              large
            />
          )}
        </div>
      </div>

      {/* Primary checkout button (opens shipping quote modal) */}
      <button
        onClick={handlePrimaryClick}
        disabled={disabled}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#C1A88B] px-6 py-3.5 text-sm md:text-base font-medium text-black shadow transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CreditCard className="h-4 w-4" />
        {disabled ? "Cart is Empty" : primaryLabel}
      </button>

      {/* Payment options dropdown */}
      <div className="mt-4">
        <label className="mb-1 block text-xs text-white/60">
          Payment option
        </label>
        <div className="relative">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((v) => !v)}
            className={[
              "flex w-full items-center justify-between rounded-full border border-white/15",
              "bg-black/70 px-4 py-2.5 text-xs md:text-sm text-white/80",
              "hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60",
              disabled ? "cursor-not-allowed opacity-50" : "",
            ].join(" ")}
          >
            <span className="truncate">{current.label}</span>
            <span className="ml-3 text-[10px] text-white/60">▼</span>
          </button>

          <AnimatePresence>
            {open && !disabled && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-white/15 bg-black/95 shadow-xl"
              >
                {paymentOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={[
                      "w-full px-4 py-2.5 text-left text-xs md:text-sm",
                      "text-white/85 hover:bg-white/10",
                      opt.value === paymentOption ? "bg-white/5" : "",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom deposit UI (if you re-enable "custom") */}
        {isCustom && !disabled && (
          <div className="mt-3 space-y-1">
            <label className="block text-xs text-white/60">
              Enter your deposit amount (in USD)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={customDeposit}
              onChange={(e) => {
                setCustomDeposit(e.target.value);
                setCustomError("");
              }}
              placeholder="e.g. 1000"
              className="w-full rounded-2xl border border-white/15 bg-black/70 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
            />
            {customError && (
              <p className="text-[11px] text-red-300 mt-1">{customError}</p>
            )}
            <p className="text-[11px] text-white/50">
              You'll pay this custom deposit now via our multi-item Square
              checkout, and our team will coordinate the remaining balance and
              delivery details with you.
            </p>
          </div>
        )}
      </div>

      {/* 🔹 NEW: bypass ShippingQuoteModal */}
      {!disabled && (
        <button
          type="button"
          onClick={performCheckout}  // 👈 goes straight to checkout, no shipping modal
          className="mt-3 text-[11px] text-white/60 hover:text-white/80 underline-offset-2 hover:underline"
        >
          I only wish to pay a deposit before I get my shipping price right now
        </button>
      )}

      <p className="mt-3 text-xs text-white/60">
        All options are processed via our secure Square checkout. For split
        payments, you’ll pay the 20% deposit today and a Habitat28 specialist
        will assist with the remaining balance and delivery details.
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-xs text-white/75 ring-1 ring-white/10">
        <CheckCircle2 className="h-4 w-4 text-[#C1A88B]" />
        <span>Secure checkout • Encrypted payments • No hidden fees</span>
      </div>

      {/* Shipping Quote Modal (only opened by main button) */}
      <AnimatePresence>
        {showShippingModal && (
          <ShippingQuoteModal
            total={total}
            dueToday={depositDue}
            isSplit={isSplit}
            onClose={() => setShowShippingModal(false)}
            onContinue={() => {
              setShowShippingModal(false);
              performCheckout();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}



/* === Square custom deposit section (min $1,000) — currently unused in UI but kept for future === */

function DepositCheckoutSection({ disabled, total }) {
  const [card, setCard] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [deposit, setDeposit] = useState("1000"); // default $1,000
  const [error, setError] = useState("");

  // ensure we only initialize Square once
  const initialized = React.useRef(false);

  // Initialize Square Web Payments SDK
  useEffect(() => {
    if (disabled) return;
    if (initialized.current) return;

    async function initSquare() {
      try {
        if (!window.Square) {
          console.error("Square Web Payments SDK not loaded.");
          setStatus("Payment SDK not loaded. Please refresh the page.");
          return;
        }

        const payments = window.Square.payments(
          SQUARE_APP_ID,
          SQUARE_LOCATION_ID
        );

        const cardInstance = await payments.card();
        await cardInstance.attach("#square-card-container");

        setCard(cardInstance);
        initialized.current = true;
      } catch (err) {
        console.error("Error initializing Square", err);
        setStatus("Failed to initialize Square payments.");
      }
    }

    initSquare();
  }, [disabled]);

  const handleDepositPay = async () => {
    if (disabled || !card) return;

    const raw = (deposit || "").toString().replace(/,/g, "");
    const amount = parseFloat(raw);

    if (Number.isNaN(amount) || amount <= 0) {
      setError("Please enter a valid deposit amount.");
      return;
    }
    if (amount < 1000) {
      setError("Minimum deposit is $1,000.");
      return;
    }
    if (amount > total) {
      setError("Deposit cannot be greater than the cart total.");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nonce,
          currency: "USD",
          depositAmount: depositAmountMinor,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error("Deposit error response:", data);

        const firstDetail = data?.details?.errors?.[0]?.detail;
        const firstCode = data?.details?.errors?.[0]?.code;
        const message =
          firstDetail ||
          firstCode ||
          data.error ||
          "Unknown error from payment gateway.";

        setStatus("Deposit payment failed: " + message);
        return;
      } else {
        setStatus(
          `Deposit successful! A $${amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} deposit has been charged. We will contact you to finalize the remaining balance and delivery.`
        );
      }
    } catch (err) {
      console.error("Unexpected error", err);
      setStatus("Unexpected error during deposit payment.");
    } finally {
      setLoading(false);
    }
  };

  const remaining =
    Number.isFinite(total) && !Number.isNaN(Number(deposit))
      ? Math.max(total - parseFloat(deposit || "0"), 0)
      : null;

  return (
    <div className="mt-6 rounded-2xl bg-black/60 p-4 ring-1 ring-white/10">
      <h3 className="text-sm font-medium text-white">
        Or secure your ELEV8 kitchen with a custom deposit
      </h3>
      <p className="mt-1 text-xs text-white/60">
        Your current cart total is {formatMoney(total)}. Choose your deposit
        amount (minimum $1,000), pay it now via Square, and our team will help
        you arrange the remaining balance and delivery schedule.
      </p>

      <div className="mt-3 space-y-1">
        <label className="block text-xs text-white/60">
          Deposit amount (USD, min $1,000)
        </label>
        <input
          type="number"
          min="1000"
          step="0.01"
          value={deposit}
          onChange={(e) => {
            setDeposit(e.target.value);
            setError("");
          }}
          className="w-full rounded-2xl border border-white/15 bg-black/70 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
          placeholder="e.g. 2500"
        />
        {remaining !== null && (
          <p className="text-[11px] text-white/50">
            Approximate remaining balance after deposit:{" "}
            <span className="font-medium">
              {formatMoney(remaining > 0 ? remaining : 0)}
            </span>
          </p>
        )}
        {error && (
          <p className="mt-1 text-[11px] text-red-300">{error}</p>
        )}
      </div>

      <div className="mt-3">
        <div
          id="square-card-container"
          className="rounded-2xl border border-white/15 bg-black/70 px-3 py-3"
        />
      </div>

      <button
        type="button"
        onClick={handleDepositPay}
        disabled={disabled || loading || !card}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C1A88B] px-5 py-2.5 text-sm font-medium text-black shadow hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CreditCard className="h-4 w-4" />
        {loading ? "Processing deposit..." : "Pay Deposit via Square"}
      </button>

      {status && (
        <p className="mt-2 text-[11px] text-white/70 leading-snug">
          {status}
        </p>
      )}
      <p className="mt-1 text-[11px] text-white/50">
        Card details are processed securely by Square. No additional setup fees
        or subscriptions — only standard card processing fees apply.
      </p>
    </div>
  );
}

function SummaryRow({ label, value, bold = false, large = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={`text-xs md:text-sm text-white/60 ${bold ? "font-medium text-white/80" : ""
          }`}
      >
        {label}
      </span>
      <span
        className={`tabular-nums ${large ? "text-lg font-semibold text-white" : "text-sm text-white/90"
          }`}
      >
        {value}
      </span>
    </div>
  );
}

function ReassuranceItem({ icon, title, body }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-black/40 p-4 ring-1 ring-white/8">
      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#C1A88B]/10 text-[#C1A88B]">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 text-xs text-white/70">{body}</p>
      </div>
    </div>
  );
}

function EmptyCartState() {
  return (
    <div className="mb-6 flex flex-col items-center justify-center rounded-3xl bg-[#0f0f0f]/80 px-6 py-14 text-center ring-1 ring-white/10">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C1A88B]/10 text-[#C1A88B]">
        <Truck className="h-5 w-5" />
      </div>
      <h2 className="text-lg font-medium text-white">
        Your ELEV8 cart is currently empty
      </h2>
      <p className="mt-2 max-w-md text-sm text-white/70">
        Start by configuring your ideal ELEV8 modular outdoor kitchen. Choose
        your size, finish, and layout — then add it to your cart to see it here.
      </p>
      <Link
        to="/Elev8Kitchens"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-medium text-black shadow hover:brightness-95"
      >
        <ArrowLeft className="h-4 w-4" />
        Browse ELEV8 Kitchens
      </Link>
    </div>
  );
}

/* ====== Luxurious Multi-Item / Split / Custom Modal ====== */

function MultiItemCheckoutModal({
  total,
  mode = "standard",
  customAmount,
  onConfirm,
  onCancel,
}) {
  const isSplit = mode === "split";
  const isCustom = mode === "custom";

  const amountToPay = isSplit
    ? total * 0.2
    : isCustom
      ? customAmount || 0
      : total;

  const amountFormatted = formatMoney(amountToPay);

  const label = isSplit
    ? "Deposit Payment (20% Deposit)"
    : isCustom
      ? "Custom Deposit (Multi-Item Checkout)"
      : "Multi-Item ELEV8 Checkout";

  const heading = isSplit
    ? "Pay 20% today to reserve your ELEV8 kitchen"
    : isCustom
      ? "Pay your custom deposit today"
      : "Confirm your cart total";

  const caption = isSplit
    ? "Today’s payment (20% deposit)"
    : isCustom
      ? "Today’s payment (custom deposit)"
      : "Cart total";

  const bodyCopy = isSplit
    ? "This 20% deposit secures your ELEV8 configuration. Our team will follow up to confirm the remaining balance, timing, and delivery details."
    : isCustom
      ? "This custom deposit secures your ELEV8 configuration. Our team will coordinate the remaining balance, schedule, and delivery details after payment."
      : "This reflects your current configuration. A Habitat28 specialist can assist with delivery, access, and installation after payment.";

  const introCopy = isSplit
    ? "You're checking out multiple ELEV8 items. On the next page, you'll be redirected to our secure Square payment portal. For split payments, you’ll pay a 20% deposit today and arrange the remaining balance with our team before delivery."
    : isCustom
      ? "You're checking out multiple ELEV8 items. On the next page, you'll be redirected to our secure Square payment portal to pay your chosen deposit amount. We’ll handle the remaining balance and delivery planning with you afterwards."
      : "You're checking out multiple ELEV8 items. On the next page, you'll be redirected to our secure Square payment portal. Please review the amount below before completing your payment.";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#0b0b0b] via-black to-[#151515] p-6 md:p-8 ring-1 ring-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
      >
        {/* Glow accent */}
        <div className="pointer-events-none absolute -inset-px rounded-3xl border border-white/5">
          <div className="absolute -top-10 right-10 h-32 w-32 rounded-full bg-[#C1A88B]/15 blur-3xl" />
        </div>

        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#C1A88B]/10 px-3 py-1 text-xs font-medium text-[#C1A88B] ring-1 ring-[#C1A88B]/30">
            <CreditCard className="h-3 w-3" />
            {label}
          </div>

          <h2 className="font-heading text-2xl md:text-3xl text-white">
            {heading}
          </h2>

          <p className="text-sm md:text-base text-white/70">{introCopy}</p>

          <div className="rounded-2xl bg-black/60 p-4 ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              {caption}
            </p>
            <p className="mt-2 text-3xl md:text-4xl font-semibold text-[#C1A88B]">
              {amountFormatted}
            </p>
            <p className="mt-2 text-xs md:text-sm text-white/60">{bodyCopy}</p>
          </div>

          <ul className="space-y-2 text-xs md:text-sm text-white/70">
            <li>• Click &quot;Continue to Secure Square Checkout&quot; below.</li>
            {isSplit ? (
              <li>
                • Complete the 20% deposit payment on the next page to reserve
                your ELEV8 kitchen.
              </li>
            ) : isCustom ? (
              <li>
                • Complete your custom deposit payment on the next page to
                secure your ELEV8 kitchen while we finalize the remaining
                balance and logistics with you.
              </li>
            ) : (
              <li>
                • Complete the full payment on the next page to finalize your
                ELEV8 order.
              </li>
            )}
            <li>
              • Our team can assist with site access, delivery timing, and
              installation questions after payment.
            </li>
          </ul>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:justify-end">
            <button
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10"
            >
              Review Cart Again
            </button>
            <button
              onClick={onConfirm}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C1A88B] px-6 py-2.5 text-sm font-medium text-black shadow hover:brightness-95"
            >
              <CreditCard className="h-4 w-4" />
              Continue to Secure Square Checkout
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ====== Shipping Quote Modal (uses 20% deposit when selected) ====== */

function ShippingQuoteModal({ total, dueToday, isSplit, onClose, onContinue }) {
  const mainAmount = isSplit ? dueToday : total;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#0b0b0b] via-black to-[#151515] p-6 md:p-8 ring-1 ring-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
      >
        {/* Glow accent */}
        <div className="pointer-events-none absolute -inset-px rounded-3xl border border-white/5">
          <div className="absolute -top-10 left-10 h-32 w-32 rounded-full bg-[#C1A88B]/15 blur-3xl" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#C1A88B]/10 px-3 py-1 text-xs font-medium text-[#C1A88B] ring-1 ring-[#C1A88B]/30">
            <Truck className="h-3 w-3" />
            Shipping Quote Required
          </div>

          <h2 className="font-heading text-2xl md:text-3xl text-white">
            Get Your ELEV8 Shipping Fee Quotation
          </h2>

          <p className="text-sm md:text-base text-white/70">
            Our modular kitchens ship via premium freight, and shipping is
            calculated manually based on your location and access.{" "}
            {isSplit ? (
              <>
                Your{" "}
                <span className="font-semibold text-[#C1A88B]">
                  20% deposit due today (excluding shipping)
                </span>{" "}
                is{" "}
                <span className="font-semibold text-[#C1A88B]">
                  {formatMoney(mainAmount)}
                </span>
                .
              </>
            ) : (
              <>
                Your current cart total (excluding shipping) is{" "}
                <span className="font-semibold text-[#C1A88B]">
                  {formatMoney(mainAmount)}
                </span>
                .
              </>
            )}
          </p>

          {isSplit && (
            <p className="text-xs text-white/60">
              Full cart total (excluding shipping):{" "}
              <span className="font-medium text-white">
                {formatMoney(total)}
              </span>
            </p>
          )}

          <div className="rounded-2xl bg-black/60 p-4 ring-1 ring-white/10 space-y-2 text-sm text-white/75">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              To receive a precise quote, please contact:
            </p>
            <p>
              <span className="font-medium text-white">Phone / WhatsApp:</span>{" "}
              <a
                href="tel:+1-905-693-0028"
                className="text-[#C1A88B] hover:underline"
              >
                +1 (905) 693-0028
              </a>
            </p>
            <p>
              <span className="font-medium text-white">Email:</span>{" "}
              <a
                href="mailto:sales.elev8@habitat28.com"
                className="text-[#C1A88B] hover:underline"
              >
                sales.elev8@habitat28.com
              </a>
            </p>
            <p className="text-xs text-white/60 mt-2">
              Share your{" "}
              <span className="font-medium text-white">
                full delivery address, access notes
              </span>{" "}
              and any timeline preferences. Our team will respond with a
              detailed shipping fee quotation.
            </p>
          </div>

          <ul className="space-y-2 text-xs md:text-sm text-white/70">
            <li>• Contact us first to receive your shipping quotation.</li>
            <li>
              • After you're happy with the quote, return here and continue to
              our secure Square checkout.
            </li>
          </ul>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:justify-end">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10"
            >
              Close
            </button>
            <button
              onClick={onContinue}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C1A88B] px-6 py-2.5 text-sm font-medium text-black shadow hover:brightness-95"
            >
              <CreditCard className="h-4 w-4" />
              I Understand — Continue to Checkout
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
