import { usePosts } from '../hooks/usePosts'
import PostListSection from '../components/posts/PostListSection'

export default function JoaoHome() {
    const {
        posts,
        meta,
        filters,
        loading,
        error,
        setSearch,
        setPage,
    } = usePosts({
        author: 'joao',
        perPage: 6,
    })

    return (
        <PostListSection
            title="Conheça meu trabalho."
            posts={posts}
            meta={meta}
            loading={loading}
            error={error}
            search={filters.search}
            onSearch={setSearch}
            onPageChange={setPage}
        />
    )
}