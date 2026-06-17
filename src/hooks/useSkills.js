import { useCallback, useEffect, useState } from 'react'
import {
    listSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} from '../services/skillService'

export function useSkills() {
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const loadSkills = useCallback(async () => {
        try {
            setLoading(true)
            setError(false)

            const response = await listSkills()

            setSkills(response.data ?? [])
        } catch (err) {
            setError(
                err.response?.data?.message || 'Erro ao carregar habilidades.'
            )
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadSkills()
    }, [loadSkills])

    async function storeSkill(payload) {
        try {
            setSubmitting(true)
            await createSkill(payload)
            await loadSkills()
        } finally {
            setSubmitting(false)
        }
    }

    async function editSkill(id, payload) {
        try {
            setSubmitting(true)
            await updateSkill(id, payload)
            await loadSkills()
        } finally {
            setSubmitting(false)
        }
    }

    async function removeSkill(id) {
        try {
            setSubmitting(true)
            await deleteSkill(id)
            await loadSkills()
        } finally {
            setSubmitting(false)
        }
    }

    return {
        skills,
        loading,
        submitting,
        error,
        storeSkill,
        editSkill,
        removeSkill,
    }
}