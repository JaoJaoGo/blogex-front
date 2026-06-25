import { useState } from 'react'
import { createPost, updatePost } from '../services/postService'

const INITIAL_FORM = {
    title: '',
    subtitle: '',
    content: '',
    image: null,
    author: '',
    user: [],
    tags: [],
    remove_image: false,
}

export function usePostForm(initialData = null) {
    const [form, setForm] = useState(() => ({
        ...INITIAL_FORM,
        ...normalizeInitialData(initialData),
    }))

    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    function setField(field, value) {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    function toggleTag(tagName) {
        setForm(prev => {
            const exists = prev.tags.includes(tagName)

            return {
                ...prev,
                tags: exists
                    ? prev.tags.filter(tag => tag !== tagName)
                    : [...prev.tags, tagName],
            }
        })
    }

    function setInitialData(post) {
        setForm({
            ...INITIAL_FORM,
            ...normalizeInitialData(post),
        })
    }

    async function submitCreate() {
        try {
            setSubmitting(true)
            setError(null)

            const response = await createPost(normalizePayload(form))

            return response.data
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Erro ao criar post.'
            )

            throw err
        } finally {
            setSubmitting(false)
        }
    }

    async function submitUpdate(id) {
        try {
            setSubmitting(true)
            setError(null)

            const response = await updatePost(id, normalizePayload(form))

            return response.data
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Erro ao atualizar post.'
            )

            throw err
        } finally {
            setSubmitting(false)
        }
    }

    return {
        form,
        submitting,
        error,
        setField,
        toggleTag,
        setInitialData,
        submitCreate,
        submitUpdate,
    }
}

function normalizeInitialData(post) {
    if (!post) {
        return {}
    }

    return {
        title: post.title ?? '',
        subtitle: post.subtitle ?? '',
        content: post.content ?? '',
        image: null,
        currentImage: post.image ?? null,
        author: post.author ?? '',
        user: post.user ?? '',
        tags: normalizeTags(post.tags),
        remove_image: false,
    }
}

function normalizeTags(tags = []) {
    return tags.map(tag => {
        if (typeof tag === 'string') {
            return tag
        }

        return tag.name
    })
}

function normalizePayload(form) {
    return {
        title: form.title,
        subtitle: form.subtitle,
        content: form.content,
        image: form.image,
        author: form.author,
        user: form.user,
        tags: form.tags,
        remove_image: form.remove_image,
    }
}