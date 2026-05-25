import TagBadge from '../tags/TagBadge'

export default function PostTagsSelector({
    tags = [],
    selectedTags = [],
    loading = false,
    onToggleTag,
}) {
    if (loading) {
        return (
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
                <p className="text-sm text-gray-400">
                    Carregando tags...
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl">
            <div className="mb-4">
                <h2 className="text-lg font-bold">
                    Tags do post
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Selecione pelo menos uma tag para categorizar o conteúdo.
                </p>
            </div>

            {!tags.length ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-gray-400">
                    Nenhuma tag cadastrada ainda.
                </div>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {tags.map(tag => {
                        const selected = selectedTags.includes(tag.name)

                        return (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => onToggleTag(tag.name)}
                                className={`
                                    rounded-full
                                    transition
                                    ${selected
                                        ? 'scale-105 opacity-100'
                                        : 'opacity-60 hover:opacity-100'
                                    }
                                `}
                            >
                                <TagBadge
                                    tag={tag}
                                    active={selected}
                                />
                            </button>
                        )
                    })}
                </div>
            )}

            {selectedTags.length > 0 && (
                <p className="mt-4 text-xs text-gray-500">
                    {selectedTags.length} tag(s) selecionada(s).
                </p>
            )}
        </div>
    )
}