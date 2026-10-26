
import { Star } from "lucide-react";

function Rating({
  value = 0,
  count,
  showValue = true,
  size = "md",
  className = "",
}) {
  const rating = Math.min(5, Math.max(0, Number(value) || 0));

  const starSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const starSize = starSizes[size] || starSizes.md;

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}
    >
      {/* Star icons */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillAmount = Math.min(
            1,
            Math.max(0, rating - (star - 1))
          );

          return (
            <span
              key={star}
              className="relative inline-flex"
              aria-hidden="true"
            >
              <Star
                size={starSize}
                className="text-slate-300"
              />

              {fillAmount > 0 && (
                <span
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${fillAmount * 100}%` }}
                >
                  <Star
                    size={starSize}
                    className="fill-amber-400 text-amber-400"
                    style={{
                      maxWidth: `${starSize}px`,
                      minWidth: `${starSize}px`,
                    }}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Numeric rating */}
      {showValue && (
        <span className="text-sm font-semibold text-slate-800">
          {rating.toFixed(1)}
        </span>
      )}

      {/* Review count */}
      {count !== undefined && count !== null && (
        <span className="text-sm text-slate-500">
          ({Number(count).toLocaleString("en-IN")} reviews)
        </span>
      )}
    </div>
  );
}

export default Rating;
