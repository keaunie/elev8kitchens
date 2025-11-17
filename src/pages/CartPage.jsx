// CartPage.jsx — Elev8 Kitchens / ELEV8 theme

import React, { useMemo, useState } from "react";
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

  // Modal state for multi-item checkout
  const [showMultiModal, setShowMultiModal] = useState(false);

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

  const shippingEstimate = 0; // show as "TBD at checkout"
  const taxEstimate = 0; // "Calculated at checkout"
  const total = subtotal + shippingEstimate + taxEstimate;

  const MULTI_ITEM_CHECKOUT_URL =
    "https://square.link/u/EKt1svLu"; // ← put your Square Payment Link here

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

    // Fallback: multi-item cart → open luxurious confirmation modal
    setShowMultiModal(true);
  };

  const handleConfirmMultiCheckout = () => {
    if (!MULTI_ITEM_CHECKOUT_URL) {
      alert(
        "Checkout link is not configured yet. Please contact support or try again later."
      );
      return;
    }
    setShowMultiModal(false);
    window.location.href = MULTI_ITEM_CHECKOUT_URL;
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
              title="2-Year Warranty"
              body="ELEV8 is engineered to last, backed by a limited 2-year warranty on core components."
            />
            <ReassuranceItem
              icon={<CreditCard className="h-5 w-5" />}
              title="Flexible Payments"
              body="Pay in full or split into manageable installments at checkout, subject to approval."
            />
          </div>
        </div>
      </div>

      {/* Luxurious multi-item checkout modal */}
      <AnimatePresence>
        {showMultiModal && (
          <MultiItemCheckoutModal
            total={total}
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
}) {
  return (
    <div className="rounded-[28px] bg-[#0f0f0f]/80 p-5 md:p-6 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
      <h2 className="font-heading text-xl text-[#C1A88B]">Order Summary</h2>

      <div className="mt-5 space-y-3 text-sm text-white/80">
        <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
        <SummaryRow
          label="Estimated Shipping"
          value={shipping === 0 ? "TBD at checkout" : formatMoney(shipping)}
        />
        <SummaryRow
          label="Estimated Tax"
          value={tax === 0 ? "Calculated at checkout" : formatMoney(tax)}
        />
        <div className="border-t border-white/10 pt-3">
          <SummaryRow label="Total" value={formatMoney(total)} bold large />
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={disabled}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#C1A88B] px-6 py-3.5 text-sm md:text-base font-medium text-black shadow transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CreditCard className="h-4 w-4" />
        {disabled ? "Cart is Empty" : "Proceed to Checkout"}
      </button>

      <p className="mt-3 text-xs text-white/60">
        By proceeding, you’ll confirm your ELEV8 configuration and delivery
        details. A Habitat28 specialist can follow up for site-specific
        questions if needed.
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-xs text-white/75 ring-1 ring-white/10">
        <CheckCircle2 className="h-4 w-4 text-[#C1A88B]" />
        <span>Secure checkout • Encrypted payments • No hidden fees</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, bold = false, large = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={`text-xs md:text-sm text-white/60 ${
          bold ? "font-medium text-white/80" : ""
        }`}
      >
        {label}
      </span>
      <span
        className={`tabular-nums ${
          large
            ? "text-lg font-semibold text-white"
            : "text-sm text-white/90"
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

/* ====== Luxurious Multi-Item Modal ====== */

function MultiItemCheckoutModal({ total, onConfirm, onCancel }) {
  const totalFormatted = formatMoney(total);

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
            Multi-Item ELEV8 Checkout
          </div>

          <h2 className="font-heading text-2xl md:text-3xl text-white">
            Confirm your cart total
          </h2>

          <p className="text-sm md:text-base text-white/70">
            You&apos;re checking out multiple ELEV8 items. On the next page,
            you&apos;ll be redirected to our secure Square payment portal. To
            keep things simple and transparent, please enter this exact amount:
          </p>

          <div className="rounded-2xl bg-black/60 p-4 ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Cart total to enter
            </p>
            <p className="mt-2 text-3xl md:text-4xl font-semibold text-[#C1A88B]">
              {totalFormatted}
            </p>
            <p className="mt-2 text-xs md:text-sm text-white/60">
              This includes your current configuration. Final shipping and any
              applicable taxes may be adjusted during the final invoice review.
            </p>
          </div>

          <ul className="space-y-2 text-xs md:text-sm text-white/70">
            <li>• Click &quot;Continue to Secure Square Checkout&quot; below.</li>
            <li>• When prompted, enter the total shown above as your payment.</li>
            <li>
              • A Habitat28 specialist can follow up regarding site access,
              delivery, and installation details if needed.
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
