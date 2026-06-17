import { Pencil, Trash2 } from 'lucide-react'
import { getSkillIcon } from '../../../utils/skillIcons'
import SkillParticles from './SkillParticles'

const LEVELS = {
    1: {
        label: 'Iniciante',
        particleColor: 'rgba(125, 211, 252, 1)',
        className: {
            card: 'border-sky-400/25 bg-sky-500/10 hover:bg-sky-500/15',
            text: 'text-sky-300',
            badge: 'text-sky-300 bg-sky-500/10 border-sky-400/30',
            glow: 'shadow-[0_0_18px_rgba(125,211,252,0.18)]',
        },
    },
    2: {
        label: 'Básico',
        particleColor: 'rgba(103, 232, 249, 1)',
        className: {
            card: 'border-cyan-400/25 bg-cyan-500/10 hover:bg-cyan-500/15',
            text: 'text-cyan-300',
            badge: 'text-cyan-300 bg-cyan-500/10 border-cyan-400/30',
            glow: 'shadow-[0_0_18px_rgba(103,232,249,0.18)]',
        },
    },
    3: {
        label: 'Intermediário',
        particleColor: 'rgba(110, 231, 183, 1)',
        className: {
            card: 'border-emerald-400/25 bg-emerald-500/10 hover:bg-emerald-500/15',
            text: 'text-emerald-300',
            badge: 'text-emerald-300 bg-emerald-500/10 border-emerald-400/30',
            glow: 'shadow-[0_0_18px_rgba(110,231,183,0.18)]',
        },
    },
    4: {
        label: 'Avançado',
        particleColor: 'rgba(252, 211, 77, 1)',
        className: {
            card: 'border-amber-400/25 bg-amber-500/10 hover:bg-amber-500/15',
            text: 'text-amber-300',
            badge: 'text-amber-300 bg-amber-500/10 border-amber-400/30',
            glow: 'shadow-[0_0_18px_rgba(252,211,77,0.18)]',
        },
    },
    5: {
        label: 'Especialista',
        particleColor: 'rgba(240, 171, 252, 1)',
        className: {
            card: 'border-fuchsia-400/25 bg-fuchsia-500/10 hover:bg-fuchsia-500/15',
            text: 'text-fuchsia-300',
            badge: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-400/30',
            glow: 'shadow-[0_0_18px_rgba(240,171,252,0.18)]',
        },
    },
}

export default function SkillList({
    skills = [],
    editable = false,
    onEdit,
    onDelete,
}) {
    const sortedSkills = [...skills].sort((a, b) => {
        if (b.level !== a.level) {
            return b.level - a.level
        }

        return a.name.localeCompare(b.name)
    })

    if (!sortedSkills.length) {
        return (
            <p className="text-sm text-gray-400">
                Nenhuma habilidade cadastrada.
            </p>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedSkills.map(skill => {
                const level = LEVELS[skill.level] ?? LEVELS[1]
                const Icon = getSkillIcon(skill.name)

                return (
                    <div
                        key={skill.id}
                        className={`
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            p-5
                            transition
                            ${level.className.card}
                            ${level.className.glow}
                        `}
                    >
                        <SkillParticles
                            level={skill.level}
                            color={level.particleColor}
                        />
                        <div className="relative z-10 flex items-start justify-between gap-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex gap-4">
                                    <div
                                        className={`
                                        mt-1
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        bg-black/15
                                        ${level.className.badge}
                                    `}
                                    >
                                        <Icon size={22} />
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className={`font-bold ${level.className.text}`}>
                                                {skill.name}
                                            </h3>

                                            <span
                                                className={`
                                                    text-[9px]
                                                    tracking-wide
                                                    ${level.className.text}
                                                `}
                                                style={{
                                                    fontFamily: '"Press Start 2P", monospace',
                                                }}
                                            >
                                                LVL. {skill.level}
                                            </span>
                                        </div>

                                        <span
                                            className={`
                                                mt-3
                                                inline-flex
                                                items-center
                                                rounded-full
                                                border
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold
                                                ${level.className.badge}
                                            `}
                                        >
                                            {level.label}
                                        </span>
                                    </div>
                                </div>

                                {editable && (
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onEdit?.(skill)}
                                            className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
                                        >
                                            <Pencil size={15} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDelete?.(skill)}
                                            className="w-9 h-9 rounded-full bg-red-500/15 text-red-300 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}