// Simplified Cart Page (Stripe-ready placeholder, no Paynetworx/Square)

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowLeft, Truck, ShieldCheck, CreditCard, X } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import catalog from "../data/products.json";

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
    product.variants.find((v) => v.options?.Size === size && v.options?.Color === color) ||
    product.variants[0]
  );
}

export default function CartPage({ onCheckout }) {
  const { items, updateQuantity, removeItem } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkingOutDeposit, setCheckingOutDeposit] = useState(false);
  const [error, setError] = useState("");
  const [depositError, setDepositError] = useState("");
  const [confirmModal, setConfirmModal] = useState(null); // "full" | "deposit" | null

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
        variantTitle: `${line.size} – ${line.color}`,
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

  const shippingEstimate = 0;
  const taxEstimate = 0;
  const total = subtotal + shippingEstimate + taxEstimate;

  const proceedFullCheckout = async () => {
    if (!hasItems || checkingOut) return;
    setError("");
    setCheckingOut(true);
    try {
      const lineItems = hydrated.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.line.qty,
        size: item.line.size,
        color: item.line.color,
        type: item.product?.type || "Full",
        isDeposit: false,
      }));

      const resp = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setError(err.message || "Stripe checkout failed. Please try again.");
    } finally {
      setCheckingOut(false);
    }
  };

  const proceedDepositCheckout = async () => {
    if (!hasItems || checkingOutDeposit) return;
    setDepositError("");
    setCheckingOutDeposit(true);
    try {
      const firstItem = hydrated[0];
      const sizeLabel = firstItem?.line?.size || "XL";
      const typeLabel = firstItem?.product?.type || "Deposit";

      const MIN_DEPOSIT = 100; // enforce meaningful minimum deposit
      const raw = total * 0.2;
      const rounded = Math.round(raw * 100) / 100;
      const capped = Math.min(rounded, total);
      const depositAmount = Math.max(capped, Math.min(MIN_DEPOSIT, total));

      const lineItems = [
        {
          title: "ELEV8 Kitchen 20% Deposit",
          price: depositAmount,
          quantity: 1,
          size: sizeLabel,
          color: firstItem?.line?.color || "",
          type: typeLabel,
          isDeposit: true,
        },
      ];

      const resp = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.url) {
        throw new Error(data.error || "Unable to start deposit checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setDepositError(err.message || "Stripe deposit checkout failed. Please try again.");
    } finally {
      setCheckingOutDeposit(false);
    }
  };

  const handleCheckout = () => setConfirmModal("full");
  const handleDepositCheckout = () => setConfirmModal("deposit");
  const closeConfirm = () => setConfirmModal(null);

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
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl text-[#C1A88B]">Your ELEV8 Cart</h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base text-white/70">
              Review your ELEV8 modular outdoor kitchen configuration before checkout. Adjust sizes, finishes,
              and quantities to match your dream backyard setup.
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
                  onIncrease={() => updateQuantity(entry.line.sku, entry.line.qty + 1)}
                  onDecrease={() => updateQuantity(entry.line.sku, entry.line.qty - 1)}
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
              onDepositCheckout={handleDepositCheckout}
              checkingOut={checkingOut}
              checkingOutDeposit={checkingOutDeposit}
              error={error}
              depositError={depositError}
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
              title="Stripe-secure Checkout"
              body="Card payments will be processed securely via Stripe."
            />
          </div>
        </div>
      </div>

      <ShippingConfirmModal
        open={!!confirmModal}
        mode={confirmModal}
        onClose={closeConfirm}
        onContinue={() => {
          if (confirmModal === "deposit") {
            closeConfirm();
            proceedDepositCheckout();
          } else {
            closeConfirm();
            proceedFullCheckout();
          }
        }}
        total={total}
        depositAmount={Math.max(Math.round(total * 0.2 * 100) / 100, 1)}
      />
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
            <img src={image} alt={title} className="aspect-[4/3] w-full object-cover transition duration-300 hover:scale-[1.03]" />
          </div>
        </div>

        {/* Details + controls */}
        <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
          <div className="flex-1 space-y-2">
            <h2 className="text-base md:text-lg font-medium text-white">{title}</h2>
            {variantTitle && <p className="text-xs md:text-sm text-white/60">{variantTitle}</p>}
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
              <button className="p-2 hover:bg-white/5" aria-label="Decrease quantity" onClick={onDecrease}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 text-sm tabular-nums">{line.qty}</span>
              <button className="p-2 hover:bg-white/5" aria-label="Increase quantity" onClick={onIncrease}>
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Pricing */}
            <div className="text-right">
              <p className="text-base md:text-lg font-semibold text-white">{formatMoney(price * line.qty)}</p>
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

function ShippingConfirmModal({ open, mode, onClose, onContinue, total, depositAmount }) {
  if (!open) return null;
  const isDeposit = mode === "deposit";
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#0f0f0f] via-[#0b0b0b] to-[#0f0f0f] p-6 ring-1 ring-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#C1A88B]/80">Shipping & Invoicing</p>
              <h3 className="mt-1 text-xl font-semibold text-white">
                Contact us for shipping before you pay
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/15"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            Shipping is quoted separately. Please contact us to confirm delivery access and costs. After payment,
            we will email you an invoice reflecting your payment ({isDeposit ? "20% deposit" : "full amount"}) and any remaining balance.
          </p>

          <div className="mt-4 space-y-2 rounded-2xl bg-white/5 p-4 text-sm text-white/80 ring-1 ring-white/10">
            <div className="flex items-center justify-between">
              <span>Payment type</span>
              <span className="font-semibold text-[#C1A88B]">
                {isDeposit ? "20% Deposit" : "Pay in Full"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Amount</span>
              <span className="font-semibold text-white">
                {isDeposit ? formatMoney(depositAmount) : formatMoney(total)}
              </span>
            </div>
            <div className="text-xs text-white/60">
              Need a shipping quote or have delivery questions? Call us at +1 (905) 693-0028 or email hello@elev8kitchens.com.
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              Contact us first
            </button>
            <button
              onClick={onContinue}
              className="inline-flex items-center justify-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-semibold text-black shadow hover:brightness-95"
            >
              Continue to Stripe
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function OrderSummaryCard({
  subtotal,
  shipping,
  tax,
  total,
  disabled,
  onCheckout,
  onDepositCheckout,
  checkingOut,
  checkingOutDeposit,
  error,
  depositError,
}) {
  return (
    <div className="rounded-3xl bg-[#0f0f0f]/80 p-6 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
      <h3 className="text-lg font-semibold text-white">Order Summary</h3>
      <div className="mt-4 space-y-3">
        <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
        <SummaryRow label="Shipping" value="To be quoted" />
        <SummaryRow label="Taxes" value="Calculated at checkout" />
        <div className="border-t border-white/10 pt-3">
          <SummaryRow label="Total" value={formatMoney(total)} bold large />
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={disabled || checkingOut}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-semibold text-black shadow hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {checkingOut ? "Redirecting to Stripe…" : "Proceed to Checkout (Stripe)"}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <button
        onClick={onDepositCheckout}
        disabled={disabled || checkingOutDeposit}
        className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#C1A88B]/50 px-6 py-3 text-sm font-semibold text-[#C1A88B] shadow hover:bg-[#C1A88B]/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {checkingOutDeposit ? "Redirecting for Deposit…" : `Pay 20% Deposit (${formatMoney(total * 0.2)})`}
      </button>
      {depositError && <p className="mt-2 text-xs text-red-400">{depositError}</p>}

      <p className="mt-2 text-xs text-white/60">
        Secure payments will be handled via Stripe. A specialist will confirm delivery, scheduling, and any remaining details.
      </p>
    </div>
  );
}

function SummaryRow({ label, value, bold = false, large = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={`text-xs md:text-sm text-white/60 ${bold ? "font-medium text-white/80" : ""}`}>{label}</span>
      <span className={`tabular-nums ${large ? "text-lg font-semibold text-white" : "text-sm text-white/90"}`}>{value}</span>
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
      <h2 className="text-lg font-medium text-white">Your ELEV8 cart is currently empty</h2>
      <p className="mt-2 max-w-md text-sm text-white/70">
        Start by configuring your ideal ELEV8 modular outdoor kitchen. Choose your size, finish, and layout — then add it to your cart to see it here.
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
