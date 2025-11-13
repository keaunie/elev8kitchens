// CartButton.jsx
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <Link
      to="/cart"
      className="
        relative flex h-9 w-9 
        items-center justify-center
        text-[#C1A88B] 
        hover:text-white
        transition
      "
    >
      {/* Gold icon */}
      <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />

      {/* Count Badge */}
      {count > 0 && (
        <span
          className="
            absolute -top-1 -right-1
            flex items-center justify-center
            h-[18px] min-w-[18px]
            rounded-full bg-[#C1A88B]
            text-[10px] font-semibold text-black
          "
        >
          {count}
        </span>
      )}
    </Link>
  );
}
