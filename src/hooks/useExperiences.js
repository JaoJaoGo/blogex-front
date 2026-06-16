import { useCallback, useEffect, useState } from 'react'
import {
    listExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
} from '../services/experienceService'

export function useExperiences() {
    const [experiences, setExperiences] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const loadExperiences = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await listExperiences()

            setExperiences(response.data ?? [])
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Erro ao carregar experiências.'
            )
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadExperiences()
    }, [loadExperiences])

    async function storeExperience(payload) {
        try {
            setSubmitting(true)
            await createExperience(payload)
            await loadExperiences()
        } finally {
            setSubmitting(false)
        }
    }

    async function editExperience(id, payload) {
        try {
            setSubmitting(true)
            await updateExperience(id, payload)
            await loadExperiences()
        } finally {
            setSubmitting(false)
        }
    }

    async function removeExperience(id) {
        try {
            setSubmitting(true)
            await deleteExperience(id)
            await loadExperiences()
        } finally {
            setSubmitting(false)
        }
    }

    return {
        experiences,
        loading,
        submitting,
        error,
        storeExperience,
        editExperience,
        removeExperience,
    }
}