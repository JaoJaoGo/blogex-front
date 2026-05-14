import { useNavigate } from 'react-router-dom'
import { useAuthor } from '../../context/AuthorContext'

export default function AuthorSwitch({ authorKey, label }) {
    const { author, changeAuthor, isTransitioning } = useAuthor()
    const navigate = useNavigate()

    const isActive = author === authorKey
    const isDisabled = isTransitioning

    function handleClick() {
        if (isActive || isDisabled) return

        changeAuthor(authorKey)

        setTimeout(() => {
            navigate(`/${authorKey}`)
        }, 850)
    }

    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className={`
                font-semibold transition-colors duration-300
                ${isActive ? 'text-primary' : 'text-gray-400'}
                ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
            `}
        >
            {label}
        </button>
    )
}