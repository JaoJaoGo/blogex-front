import { usePosts } from '../hooks/usePosts'
import { usePublicTags } from '../hooks/usePublicTags'
import PostListSection from '../components/posts/PostListSection'

export default function EllenHome() {
    const {
        posts,
        meta,
        filters,
        loading,
        error,
        setSearch,
        setPage,
        toggleTag,
        clearTags,
    } = usePosts({
        author: 'ellen',
        perPage: 6,
    })

    const {
        tags,
        loadingTags,
    } = usePublicTags()

    return (
        <PostListSection
            title="Conheça meu trabalho."
            posts={posts}
            meta={meta}
            loading={loading}
            error={error}
            search={filters.search}
            tags={tags}
            selectedTags={filters.tags}
            loadingTags={loadingTags}
            onSearch={setSearch}
            onToggleTag={toggleTag}
            onClearTags={clearTags}
            onPageChange={setPage}
        />
    )
}