import SearchBar from './SearchBar'
import PostGrid from './PostGrid'
import Pagination from './Pagination'
import EmptyPosts from './EmptyPosts'
import PostTagFilters from './PostTagFilters'

export default function PostListSection({
    title,
    posts,
    meta,
    loading,
    error,
    search,
    tags,
    selectedTags,
    loadingTags,
    onSearch,
    onToggleTag,
    onClearTags,
    onPageChange,
}) {
    return (
        <section className="max-w-6xl mx-auto py-16">
            <h1 className="text-center text-3xl md:text-4xl mb-12">
                {title}
            </h1>

            <SearchBar
                value={search}
                onSearch={onSearch}
            />

            <PostTagFilters
                tags={tags}
                selectedTags={selectedTags}
                loading={loadingTags}
                onToggleTag={onToggleTag}
                onClearTags={onClearTags}
            />

            <div className="mt-16 mb-5 text-sm text-gray-400">
                {selectedTags.length > 0
                    ? `Filtrando por: ${selectedTags.join(', ')}`
                    : ''
                }
            </div>

            {loading && (
                <p className="text-gray-400">
                    Carregando posts...
                </p>
            )}

            {!loading && error && (
                <p className="text-red-400">
                    {error}
                </p>
            )}

            {!loading && !error && posts.length === 0 && (
                <EmptyPosts />
            )}

            {!loading && !error && posts.length > 0 && (
                <>
                    <PostGrid posts={posts} />

                    <div className="mt-8 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => onPageChange((meta?.currentPage ?? 1) + 1)}
                            disabled={!meta?.hasMorePages}
                            className="
                                px-8
                                py-3
                                rounded-full
                                border
                                border-accent
                                text-accent
                                text-sm
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                                hover:bg-accent
                                hover:text-white
                                transition
                            "
                        >
                            Ver mais
                        </button>

                        <Pagination
                            meta={meta}
                            onPageChange={onPageChange}
                        />
                    </div>
                </>
            )}
        </section>
    )
}