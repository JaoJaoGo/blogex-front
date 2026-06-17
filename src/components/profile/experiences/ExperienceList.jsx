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
        <div className="relative space-y-6">
            <div className="absolute left-4 top-3 bottom-3 w-px bg-white/10" />

            {sortedExperiences.map((experience, index) => (
                <div
                    key={experience.id}
                    className="relative pl-12"
                >
                    <div
                        className={`
                            absolute
                            left-[9px]
                            top-2
                            h-4
                            w-4
                            rounded-full
                            border
                            border-primary
                            bg-[#0b1120]
                            shadow-[0_0_18px_var(--primary)]
                            ${index === 0 ? 'scale-110' : ''}
                        `}
                    />

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-bold">
                                    {experience.name}
                                </h3>

                                <p className="text-sm text-gray-400">
                                    {experience.workplace}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
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
                                <div className="flex gap-2">
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
                                className="post-editor-content mt-4"
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

function formatDate(date) {
    if (!date) {
        return ''
    }

    return new Date(date).toLocaleDateString('pt-BR')
}

function formatExperienceDuration(startDate, endDate) {
    if (!startDate) {
        return ''
    }

    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

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