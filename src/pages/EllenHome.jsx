import { usePosts } from '../hooks/usePosts'
import { usePublicTags } from '../hooks/usePublicTags'
import { useAuthorProfile } from '../hooks/useAuthorProfile'
import PostListSection from '../components/posts/PostListSection'
import AuthorHeroSection from '../components/authors/AuthorHeroSection'

export default function EllenHome() {
    const authorProfile = useAuthorProfile('ellen')

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
        <>
            <AuthorHeroSection
                author="ellen"
                profile={authorProfile.profile}
                loading={authorProfile.loading}
            />

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
        </>
    )
}