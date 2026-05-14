import { createContext, useContext, useEffect, useState } from 'react'

const AuthorContext = createContext()

const AUTHOR_STORAGE_KEY = 'blogex_selected_author'

export function AuthorProvider({ children }) {
    const [author, setAuthor] = useState(() => {
        return localStorage.getItem(AUTHOR_STORAGE_KEY) || 'joao'
    })

    const [nextAuthor, setNextAuthor] = useState(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        document.documentElement.setAttribute('data-author', author)
    }, [author])

    function changeAuthor(newAuthor) {
        if (newAuthor === author) return

        setNextAuthor(newAuthor)
        setIsTransitioning(true)

        document.documentElement.setAttribute('data-author', newAuthor)

        const timeout = setTimeout(() => {
            setAuthor(newAuthor)
            localStorage.setItem(AUTHOR_STORAGE_KEY, newAuthor)

            setNextAuthor(null)
            setIsTransitioning(false)
        }, 800)

        return () => clearTimeout(timeout)
    }

    return (
        <AuthorContext.Provider value={{ author, changeAuthor, isTransitioning }}>
            {children}
        </AuthorContext.Provider>
    )
}

export const useAuthor = () => {
    const context = useContext(AuthorContext)

    if (!context) {
        throw new Error('useAuthor must be used within an AuthorProvider')
    }

    return context
}