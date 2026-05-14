import { useCallback, useEffect, useState } from 'react'
import { listPosts } from '../services/postService'

export function usePosts(initialFilters = {}) {
    const [posts, setPosts] = useState([])
    const [meta, setMeta] = useState(null)

    const [filters, setFilters] = useState({
        page: 1,
        perPage: 6,
        search: '',
        ...initialFilters,
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadPosts = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const params = normalizeFilters(filters)

            const response = await listPosts(params)

            setPosts(response.data ?? [])
            setMeta(response.meta ?? null)
        } catch (err) {
            setPosts([])
            setMeta(null)

            setError(
                err.response?.data?.message ||
                'Erro ao carregar os posts.'
            )
        } finally {
            setLoading(false)
        }
    }, [filters])

    useEffect(() => {
        loadPosts()
    }, [loadPosts])

    function setSearch(search) {
        setFilters(prev => ({
            ...prev,
            search: String(search ?? '').trim(),
            page: 1,
        }))
    }

    function setPage(page) {
        setFilters(prev => ({
            ...prev,
            page: Number(page),
        }))
    }

    return {
        posts,
        meta,
        filters,
        loading,
        error,
        setSearch,
        setPage,
        reload: loadPosts,
    }
}

function normalizeFilters(filters) {
    const params = {
        ...filters,
        search: String(filters.search ?? '').trim(),
    }

    if (!params.search) {
        delete params.search
    }

    if (!params.author) {
        delete params.author
    }

    return params
}