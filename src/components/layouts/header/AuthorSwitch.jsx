import { useNavigate } from 'react-router-dom'
import { useAuthor } from '../../../context/AuthorContext'
import { useIntroAuthors } from '../../../hooks/useIntroAuthors'

export default function AuthorSwitch({ authorKey, label }) {
    const { author, changeAuthor, isTransitioning } = useAuthor()
    const authors = useIntroAuthors()
    const navigate = useNavigate()

    const isActive = author === authorKey
    const isDisabled = isTransitioning

    const currentAuthor = authors[authorKey]
    const displayName = currentAuthor?.name ?? label
    const avatar = currentAuthor?.profile_photo_url
    const initial = displayName?.charAt(0)

    const avatarElement = (
        <span
            className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                transition
                ${isActive
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-white/15 bg-white/10 text-white/70'
                }
            `}
        >
            {avatar ? (
                <img
                    src={avatar}
                    alt={displayName}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span className="text-sm font-black">
                    {initial}
                </span>
            )}
        </span>
    )

    function handleClick() {
        if (isActive || isDisabled) return

        localStorage.setItem('blogex_selected_author', authorKey)

        changeAuthor(authorKey)

        setTimeout(() => {
            navigate(`/${authorKey}`)
        }, 850)
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isDisabled}
            className={`
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                px-4
                py-2
                text-sm
                font-semibold
                shadow-lg
                backdrop-blur-md
                transition
                ${isActive
                    ? 'border-primary/40 bg-primary/15 text-primary'
                    : 'border-white/10 bg-white/[0.07] text-gray-300 hover:bg-white/[0.12] hover:text-white'
                }
                ${isDisabled
                    ? 'cursor-not-allowed opacity-60'
                    : 'cursor-pointer'
                }
            `}
        >
            {authorKey === 'joao' && avatarElement}

            <span>
                {label}
            </span>

            {authorKey === 'ellen' && avatarElement}
        </button>
    )
}