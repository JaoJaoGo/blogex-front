export default function Pagination({
    meta,
    onPageChange,
}) {
    if (!meta || meta.lastPage <= 1) {
        return null
    }

    const pages = Array.from(
        { length: meta.lastPage },
        (_, index) => index + 1
    )

    return (
        <div className="flex items-center gap-2">
            {pages.map(page => {
                const isActive = page === meta.currentPage

                return (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`
                            w-8
                            h-8
                            rounded-full
                            text-xs
                            font-semibold
                            transition
                            ${isActive
                                ? 'bg-accent text-white'
                                : 'bg-white/10 text-gray-400 hover:bg-white/20'
                            }
                        `}
                    >
                        {page}
                    </button>
                )
            })}
        </div>
    )
}