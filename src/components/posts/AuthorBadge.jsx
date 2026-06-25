import { useIntroAuthors } from '../../hooks/useIntroAuthors'

const AUTHOR_CONFIG = {
    joao: {
        label: 'João',
        description: 'Blog do João',
    },
    ellen: {
        label: 'Ellen',
        description: 'Blog da Ellen',
    },
}

export default function AuthorBadge({
    author,
    description,
    name,
    avatar,
}) {
    const authors = useIntroAuthors()

    const config = AUTHOR_CONFIG[author] ?? {
        label: author,
        description: description || '',
    }

    const authorProfile = authors?.[author]

    const displayName =
        name ||
        authorProfile?.name ||
        config.label

    const displayDescription =
        description ||
        config.description

    const profilePhotoUrl =
        avatar ||
        authorProfile?.profile_photo_url

    return (
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
            <span
                className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-primary
                    text-sm
                    font-bold
                    text-white
                    border
                    border-white/10
                "
            >
                {profilePhotoUrl ? (
                    <img
                        src={profilePhotoUrl}
                        alt={displayName}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    displayName?.charAt(0)
                )}
            </span>

            <div>
                <p className="text-sm font-semibold text-white">
                    {displayName}
                </p>

                <p className="text-xs text-gray-400">
                    {displayDescription}
                </p>
            </div>
        </div>
    )
}