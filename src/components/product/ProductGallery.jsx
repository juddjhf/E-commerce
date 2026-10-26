
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductGallery({
  images = [],
  productName = "Product",
}) {
  const validImages = images.filter(
    (image) => typeof image === "string" && image.trim()
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        No product image available
      </div>
    );
  }

  const activeImage =
    validImages[activeIndex] || validImages[0];

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? validImages.length - 1 : current - 1
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === validImages.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
        <img
          key={activeImage}
          src={activeImage}
          alt={`${productName} - Image ${activeIndex + 1}`}
          className="h-full w-full object-cover transition duration-300"
        />

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous product image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next product image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white"
            >
              <ChevronRight size={22} />
            </button>

            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {validImages.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail images */}
      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {validImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`aspect-square overflow-hidden rounded-xl border-2 transition ${
                activeIndex === index
                  ? "border-slate-950 ring-2 ring-slate-200"
                  : "border-transparent hover:border-slate-300"
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
