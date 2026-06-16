import { useEffect, useState } from 'react'
import { showAuthor } from '../services/authorService'

export function useAuthorProfile(author) {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true)
                setError(null)

                const data = await showAuthor(author)

                setProfile(data)
            } catch {
                setProfile(null)
                setError('Erro ao carregar informações do autor.')
            } finally {
                setLoading(false)
            }
        }

        if (author) {
            loadProfile()
        }
    }, [author])

    return {
        profile,
        loading,
        error,
    }
}