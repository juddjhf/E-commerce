
import { useState } from "react";
import { X, Tag, Truck } from "lucide-react";

function AnnouncementBar({
  message = "FREE SHIPPING ON ORDERS OVER ₹999",
  showIcon = true,
  dismissible = true,
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative flex min-h-10 items-center justify-center gap-2 bg-slate-950 px-10 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
      {showIcon && (
        <Truck
          size={16}
          className="shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      )}

      <p>{message}</p>

      {dismissible && (
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default AnnouncementBar;
