import { useCallback, useEffect, useState } from 'react'
import { listTagIcons } from '../services/tagService'

export function useTagIcons() {
    const [icons, setIcons] = useState([])
    const [loadingIcons, setLoadingIcons] = useState(true)
    const [iconsError, setIconsError] = useState(null)

    const loadIcons = useCallback(async () => {
        try {
            setLoadingIcons(true)
            setIconsError(null)

            const response = await listTagIcons()

            setIcons(response.data ?? [])
        } catch (err) {
            setIconsError(
                err.response?.data?.message || 'Erro ao carregar ícones.'
            )
        } finally {
            setLoadingIcons(false)
        }
    }, [])

    useEffect(() => {
        loadIcons()
    }, [loadIcons])

    return {
        icons,
        loadingIcons,
        iconsError,
        reloadIcons: loadIcons,
    }
}