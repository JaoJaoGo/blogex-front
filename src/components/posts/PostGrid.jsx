import PostCard from './PostCard'

export default function PostGrid({ posts }) {
    return (
        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-8
            "
        >
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    )
}