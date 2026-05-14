import { Calendar, User } from 'lucide-react'

export default function PostCard({ post }) {
    const imageUrl = post.image
        ? `${import.meta.env.VITE_API_URL}/storage/${post.image}`
        : '/images/placeholders/post-placeholder.png'

    const formattedDate = post.updatedAt
        ? new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(new Date(post.updatedAt))
        : 'Sem data'

    return (
        <article
            className="
                rounded-2xl
                overflow-hidden
                bg-white/[0.08]
                border
                border-white/10
                shadow-xl
                transition
                hover:-translate-y-1
            "
        >
            <img
                src={imageUrl}
                alt={post.title}
                className="
                    w-full
                    h-44
                    object-cover
                    bg-white
                "
            />

            <div className="p-4">
                <div className="flex gap-2 flex-wrap mb-3">
                    {post.tags?.map(tag => (
                        <span
                            key={tag}
                            className="
                                px-2
                                py-1
                                rounded-md
                                text-[10px]
                                font-semibold
                                bg-primary/25
                                text-primary
                            "
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h2 className="font-bold text-lg mb-2">
                    {post.title}
                </h2>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    Clique para ler o artigo completo no Blogex.
                </p>

                <div className="flex gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                        <User size={12} />
                        {post.author}
                    </span>

                    <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formattedDate}
                    </span>
                </div>

                <button
                    type="button"
                    className="
                        w-full
                        rounded-full
                        py-2
                        bg-white
                        text-gray-900
                        text-sm
                        font-semibold
                        hover:opacity-90
                        transition
                    "
                >
                    Ler artigo
                </button>
            </div>
        </article>
    )
}