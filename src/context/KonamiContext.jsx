import { createContext, useContext } from 'react'
import { useKonamiLogin } from '../hooks/useKonamiLogin'

const KonamiContext = createContext()

export function KonamiProvider({ children, disabled = false }) {
    const konami = useKonamiLogin({ disabled })

    return (
        <KonamiContext.Provider value={konami}>
            {children}
        </KonamiContext.Provider>
    )
}

export function useKonami() {
    const context = useContext(KonamiContext)

    if (!context) {
        throw new Error('useKonami deve ser usado dentro de KonamiProvider')
    }

    return context
}