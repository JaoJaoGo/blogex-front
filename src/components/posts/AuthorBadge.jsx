const AUTHOR_CONFIG = {
    joao: {
        label: 'João',
        description: 'Blog do João',
    },
    ellen: {
        label: 'Ellen',
        description: 'Blog da Ellen',
    },
}

export default function AuthorBadge({ author }) {
    const config = AUTHOR_CONFIG[author] ?? {
        label: author,
        description: 'Autor',
    }

    return (
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {config.label?.charAt(0)}
            </span>

            <div>
                <p className="text-sm font-semibold text-white">
                    {config.label}
                </p>

                <p className="text-xs text-gray-400">
                    {config.description}
                </p>
            </div>
        </div>
    )
}