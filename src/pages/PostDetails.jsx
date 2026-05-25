import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, Pencil } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { showPost } from '../services/postService'
import { useAuth } from '../hooks/useAuth'
import { getAuthorKey } from '../utils/getAuthorKey'
import TagBadge from '../components/tags/TagBadge'
import AuthorBadge from '../components/posts/AuthorBadge'

export default function PostDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { user, isAuthenticated } = useAuth()

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function handleGoBack() {
        const selectedAuthor =
            localStorage.getItem('blogex_selected_author') || 'joao'

        navigate(`/${selectedAuthor}`)
    }

    useEffect(() => {
        async function loadPost() {
            try {
                setLoading(true)
                setError(null)

                const data = await showPost(id)

                setPost(data)
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    'Erro ao carregar post.'
                )
            } finally {
                setLoading(false)
            }
        }

        loadPost()
    }, [id])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-16 text-gray-400">
                Carregando post...
            </div>
        )
    }

    if (error || !post) {
        return (
            <div className="max-w-4xl mx-auto py-16">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                    {error || 'Post não encontrado.'}
                </div>
            </div>
        )
    }

    const canEdit =
        isAuthenticated &&
        getAuthorKey(user) === post.author

    const imageUrl = post.image
        ? `${import.meta.env.VITE_APP_URL}/storage/${post.image}`
        : null

    const formattedDate = post.createdAt
        ? new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(new Date(post.createdAt))
        : 'Sem data'

    return (
        <article className="max-w-4xl mx-auto py-12">
            <button
                type="button"
                onClick={handleGoBack}
                className="
                    mb-8
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-400
                    hover:text-white
                    transition
                    group
                "
            >
                <ArrowLeft
                    size={18}
                    className="
                        transition-transform
                        group-hover:-translate-x-1
                    "
                />

                Voltar
            </button>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={post.title}
                    className="mb-8 h-[380px] w-full rounded-3xl object-cover shadow-2xl"
                />
            )}

            <div className="mb-5 flex flex-wrap gap-2">
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

            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-4xl font-black leading-tight md:text-5xl">
                        {post.title}
                    </h1>

                    {post.subtitle && (
                        <p className="mt-4 text-lg text-gray-400">
                            {post.subtitle}
                        </p>
                    )}
                </div>

                {canEdit && (
                    <button
                        type="button"
                        onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-xl hover:brightness-110 transition"
                    >
                        <Pencil size={16} />
                        Editar post
                    </button>
                )}
            </div>

            <div className="mb-10 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <AuthorBadge author={post.author} />

                <span className="flex items-center gap-2">
                    <Calendar size={15} />
                    {formattedDate}
                </span>
            </div>

            <div
                className="post-editor-content max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    )
}