import TagBadge from '../tags/TagBadge'

export default function PostTagFilters({
    tags = [],
    selectedTags = [],
    loading = false,
    onToggleTag,
    onClearTags,
}) {
    if (loading) {
        return (
            <p className="mt-6 text-center text-sm text-gray-400">
                Carregando tags...
            </p>
        )
    }

    if (!tags.length) {
        return null
    }

    return (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
            {tags.map(tag => {
                const active = selectedTags.includes(tag.name)

                return (
                    <button
                        key={tag.id}
                        type="button"
                        onClick={() => onToggleTag(tag.name)}
                        className={`
                            rounded-full
                            transition
                            ${active ? 'scale-105' : 'opacity-70 hover:opacity-100'}
                        `}
                    >
                        <TagBadge tag={tag} active={active} />
                    </button>
                )
            })}

            {selectedTags.length > 0 && (
                <button
                    type="button"
                    onClick={onClearTags}
                    className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        bg-white/10
                        text-gray-300
                        hover:bg-white/20
                        transition
                    "
                >
                    Limpar filtros
                </button>
            )}
        </div>
    )
}