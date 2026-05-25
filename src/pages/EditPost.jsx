import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePublicTags } from '../hooks/usePublicTags'
import { usePostForm } from '../hooks/usePostForm'
import { showPost } from '../services/postService'
import { getAuthorKey } from '../utils/getAuthorKey'
import PostForm from '../components/posts/PostForm'

export default function EditPost() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { user } = useAuth()
    const { tags, loadingTags } = usePublicTags()

    const form = usePostForm()

    const [loadingPost, setLoadingPost] = useState(true)
    const [pageError, setPageError] = useState(null)

    useEffect(() => {
        async function loadPost() {
            try {
                setLoadingPost(true)

                const post = await showPost(id)

                if (getAuthorKey(user) !== post.author) {
                    setPageError('Você não tem permissão para editar este post.')
                    return
                }

                form.setInitialData(post)
            } catch (err) {
                setPageError(
                    err.response?.data?.message ||
                    'Erro ao carregar post.'
                )
            } finally {
                setLoadingPost(false)
            }
        }

        if (user) {
            loadPost()
        }
    }, [id, user])

    async function handleSubmit() {
        const post = await form.submitUpdate(id)
        navigate(`/${post.author}/post/${post.id}`)
    }

    if (loadingPost) {
        return (
            <div className="max-w-5xl mx-auto py-12 text-gray-400">
                Carregando post...
            </div>
        )
    }

    if (pageError) {
        return (
            <div className="max-w-5xl mx-auto py-12">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                    {pageError}
                </div>
            </div>
        )
    }

    return (
        <PostForm
            mode="edit"
            form={form.form}
            tags={tags}
            loadingTags={loadingTags}
            submitting={form.submitting}
            error={form.error}
            onFieldChange={form.setField}
            onToggleTag={form.toggleTag}
            onSubmit={handleSubmit}
        />
    )
}