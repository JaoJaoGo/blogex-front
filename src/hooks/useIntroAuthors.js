import { useEffect, useState } from 'react'
import { showAuthor } from '../services/authorService'

const fallbackAuthors = {
    joao: {
        name: 'João Victor',
        profile_photo_url: null,
    },
    ellen: {
        name: 'Ellen Katharine',
        profile_photo_url: null,
    },
}

export function useIntroAuthors() {
    const [authors, setAuthors] = useState(fallbackAuthors)

    useEffect(() => {
        async function loadAuthors() {
            const [joaoResult, ellenResult] = await Promise.allSettled([
                showAuthor('joao'),
                showAuthor('ellen'),
            ])

            setAuthors({
                joao: normalizeAuthorResult(
                    joaoResult,
                    fallbackAuthors.joao
                ),
                ellen: normalizeAuthorResult(
                    ellenResult,
                    fallbackAuthors.ellen
                ),
            })
        }

        loadAuthors()
    }, [])

    return authors
}

function normalizeAuthorResult(result, fallback) {
    if (result.status !== 'fulfilled') {
        return fallback
    }

    return {
        name: result.value?.name ?? fallback.name,
        profile_photo_url:
            result.value?.profile_photo_url ?? fallback.profile_photo_url,
    }
}