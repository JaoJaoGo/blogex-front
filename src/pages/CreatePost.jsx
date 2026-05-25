import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePublicTags } from '../hooks/usePublicTags'
import { usePostForm } from '../hooks/usePostForm'
import { getAuthorKey } from '../utils/getAuthorKey'
import PostForm from '../components/posts/PostForm'

export default function CreatePost() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { tags, loadingTags } = usePublicTags()

    const form = usePostForm({
        author: getAuthorKey(user),
    })

    async function handleSubmit() {
        const post = await form.submitCreate()
        navigate(`/${post.author}/post/${post.id}`)
    }

    return (
        <PostForm
            mode="create"
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