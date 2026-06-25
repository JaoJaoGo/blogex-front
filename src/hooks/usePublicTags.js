import { useCallback, useEffect, useState } from 'react'
import { listTags } from '../services/tagService'

export function usePublicTags() {
    const [tags, setTags] = useState([])
    const [loadingTags, setLoadingTags] = useState(true)
    const [tagsError, setTagsError] = useState(null)

    const loadTags = useCallback(async () => {
        try {
            setLoadingTags(true)
            setTagsError(null)

            const response = await listTags({
                perPage: 100,
                sort: 'id',
                direction: 'asc',
            })

            setTags(response.data ?? [])
        } catch (err) {
            setTagsError(
                err.response?.data?.message || 'Erro ao carregar tags.'
            )
        } finally {
            setLoadingTags(false)
        }
    }, [])

    useEffect(() => {
        loadTags()
    }, [loadTags])

    return {
        tags,
        loadingTags,
        tagsError,
    }
}
