
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  };

  const buttonStyle =
    "flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2 py-6"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonStyle} border-slate-300 text-slate-700 hover:bg-slate-100`}
      >
        Previous
      </button>

      {getPages().map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`${buttonStyle} ${
            currentPage === page
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 text-slate-700 hover:bg-slate-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonStyle} border-slate-300 text-slate-700 hover:bg-slate-100`}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
