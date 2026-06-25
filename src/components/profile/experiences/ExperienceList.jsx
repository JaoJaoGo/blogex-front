export default function ExperienceList({
    experiences = [],
    editable = false,
    onEdit,
    onDelete,
}) {
    const sortedExperiences = [...experiences].sort(sortExperiences)

    if (!sortedExperiences.length) {
        return (
            <p className="text-gray-400">
                Nenhuma experiência cadastrada.
            </p>
        )
    }

    return (
        <div className="relative space-y-5 md:space-y-6">
            <div
                className="
                    absolute
                    left-2
                    top-3
                    bottom-3
                    w-px
                    bg-white/10
                    md:left-4
                "
            />

            {sortedExperiences.map((experience, index) => (
                <div
                    key={experience.id}
                    className="relative pl-7 md:pl-12"
                >
                    <div
                        className={`
                            absolute
                            left-[3px]
                            top-2
                            h-4
                            w-4
                            rounded-full
                            border
                            border-primary
                            bg-[#0b1120]
                            shadow-[0_0_18px_var(--primary)]
                            md:left-[9px]
                            ${index === 0 ? 'scale-110' : ''}
                        `}
                    />

                    <div
                        className="
                            min-w-0
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.04]
                            p-4
                            sm:p-5
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                                sm:flex-row
                                sm:items-start
                                sm:justify-between
                            "
                        >
                            <div className="min-w-0">
                                <h3 className="font-bold leading-snug break-words">
                                    {experience.name}
                                </h3>

                                <p className="text-sm text-gray-400 break-words">
                                    {experience.workplace}
                                </p>

                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    {formatDate(experience.start_date)} — {
                                        experience.is_current
                                            ? 'Atual'
                                            : formatDate(experience.end_date)
                                    } · {formatExperienceDuration(
                                        experience.start_date,
                                        experience.is_current
                                            ? null
                                            : experience.end_date
                                    )}
                                </p>
                            </div>

                            {editable && (
                                <div className="flex shrink-0 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit?.(experience)}
                                        className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
                                    >
                                        ✎
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDelete?.(experience)}
                                        className="w-9 h-9 rounded-full bg-red-500/15 text-red-300 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>

                        {experience.description && (
                            <div
                                className="
                                    post-editor-content
                                    mt-4
                                    max-w-none
                                    break-words
                                    text-sm
                                    leading-7
                                    md:text-base
                                    md:leading-8
                                "
                                dangerouslySetInnerHTML={{ __html: experience.description }}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

function sortExperiences(a, b) {
    if (a.is_current && !b.is_current) {
        return -1
    }

    if (!a.is_current && b.is_current) {
        return 1
    }

    const aDate = new Date(a.end_date || a.start_date)
    const bDate = new Date(b.end_date || b.start_date)

    return bDate - aDate
}

function parseDateOnly(date) {
    if (!date) {
        return null
    }

    const [year, month, day] = date.split('T')[0].split('-').map(Number)

    if (!year || !month || !day) {
        return null
    }

    return new Date(year, month - 1, day)
}

function formatDate(date) {
    const parsedDate = parseDateOnly(date)

    if (!parsedDate) {
        return ''
    }

    return parsedDate.toLocaleDateString('pt-BR')
}

function formatExperienceDuration(startDate, endDate) {
    const start = parseDateOnly(startDate)
    const end = endDate ? parseDateOnly(endDate) : new Date()

    if (!start || !end) {
        return ''
    }

    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (end.getDate() < start.getDate()) {
        months--
    }

    if (months < 0) {
        years--
        months += 12
    }

    const parts = []

    if (years > 0) {
        parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`)
    }

    if (months > 0) {
        parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`)
    }

    return parts.length ? parts.join(' e ') : 'menos de 1 mês'
}