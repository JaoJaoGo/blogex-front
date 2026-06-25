import { useCallback, useEffect, useState } from 'react'
import {
    listTags,
    createTag,
    updateTag,
    deleteTag,
} from '../services/tagService'

export function useTags() {
    const [tags, setTags] = useState([])
    const [meta, setMeta] = useState(null)

    const [filters, setFilters] = useState({
        page: 1,
        perPage: 10,
        sort: 'id',
        direction: 'asc',
    })

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const loadTags = useCallback(async () => {
        try {
            setLoading(true)

            const response = await listTags(filters)

            setTags(response.data ?? [])
            setMeta(response.meta ?? null)

        } catch (err) {
            setError(
                err.response?.data?.message
                || 'Erro ao carregar tags'
            )
        } finally {
            setLoading(false)
        }
    }, [filters])

    useEffect(() => {
        loadTags()
    }, [loadTags])

    function setPage(page) {
        setFilters(prev => ({
            ...prev,
            page,
        }))
    }

    async function storeTag(payload){
        try{
            setSubmitting(true)

            await createTag(payload)

            await loadTags()

        }finally{
            setSubmitting(false)
        }
    }

    async function editTag(id,payload){
        try{
            setSubmitting(true)

            await updateTag(id,payload)

            await loadTags()

        }finally{
            setSubmitting(false)
        }
    }

    async function removeTag(id){
        try{
            setSubmitting(true)

            await deleteTag(id)

            await loadTags()

        }finally{
            setSubmitting(false)
        }
    }

    return {
        tags,
        meta,
        loading,
        submitting,
        error,
        storeTag,
        editTag,
        removeTag,
        setPage,
    }
}