export default function TagsPagination({
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
        <div className="flex items-center justify-between mt-6">

            <span className="text-sm text-gray-400">
                Página {meta.currentPage}
                {' '}de{' '}
                {meta.lastPage}
            </span>

            <div className="flex gap-2">
                {pages.map(page => {

                    const active =
                        page === meta.currentPage

                    return (
                        <button
                            key={page}
                            onClick={() =>
                                onPageChange(page)
                            }
                            className={`
                                w-9
                                h-9
                                rounded-full
                                text-sm
                                transition

                                ${
                                    active
                                    ? 'bg-primary text-white'
                                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                }
                            `}
                        >
                            {page}
                        </button>
                    )

                })}
            </div>

        </div>
    )
}