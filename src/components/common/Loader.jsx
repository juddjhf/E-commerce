
function Loader({ size = "md", text = "Loading...", fullScreen = false }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : "py-6"
      }`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`animate-spin rounded-full border-slate-200 border-t-slate-900 ${
          sizes[size] || sizes.md
        }`}
      />

      {text && (
        <p className="text-sm font-medium text-slate-500">
          {text}
        </p>
      )}

      <span className="sr-only">{text || "Loading"}</span>
    </div>
  );
}

export default Loader;
