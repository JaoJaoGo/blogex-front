import { useNavigate } from 'react-router-dom'
import { Calendar, User } from 'lucide-react'
import TagBadge from '../tags/TagBadge'

export default function PostCard({ post }) {
    const navigate = useNavigate()

    const imageUrl = post.image
        ? `${import.meta.env.VITE_APP_URL}/storage/${post.image}`
        : `${import.meta.env.VITE_APP_URL}/storage/posts/no_image.jpg`

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
                    {post.tags?.map(tag => {
                        const normalizedTag = typeof tag === 'string'
                            ? { name: tag }
                            : tag

                        return (
                            <TagBadge
                                key={normalizedTag.id ?? normalizedTag.name}
                                tag={normalizedTag}
                            />
                        )
                    })}
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
                    onClick={() => navigate(
                        `/${post.author}/post/${post.id}`
                    )}
                >
                    Ler artigo
                </button>
            </div>
        </article>
    )
}