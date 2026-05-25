import { getTagIcon } from '../../config/tagIcons'

export default function TagBadge({ tag, active = false }) {
    const Icon = getTagIcon(tag.icon)
    const color = tag.color || '#22c55e'

    return (
        <span
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-semibold
            "
            style={{
                color,
                borderColor: color,
                backgroundColor: active
                    ? `${color}33`
                    : `${color}18`,
                boxShadow: active
                    ? `0 0 0 1px ${color}55`
                    : 'none',
            }}
        >
            {Icon && <Icon size={14} />}
            {tag.name}
        </span>
    )
}