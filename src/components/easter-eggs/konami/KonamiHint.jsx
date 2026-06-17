import { useKonami } from '../../../context/KonamiContext'

const SYMBOLS = {
    ArrowUp: '▲',
    ArrowDown: '▼',
    ArrowLeft: '◀',
    ArrowRight: '▶',
    b: 'B',
    a: 'A',
}

export default function KonamiHint() {
    const { progress, code } = useKonami()

    return (
        <div
            className="
                flex
                items-center
                gap-4
                select-none
            "
            style={{
                fontFamily: '"Press Start 2P", monospace',
            }}
        >
            {code.map((key, index) => {
                const active = index < progress

                return (
                    <span
                        key={`${key}-${index}`}
                        className={`
                            text-[18px]
                            md:text-[20px]
                            leading-none
                            transition-all
                            duration-200
                            inline-block
                            ${active
                                ? `
                                    text-primary
                                    opacity-100
                                    drop-shadow-[0_0_10px_rgba(34,197,94,0.95)]
                                  `
                                : `
                                    text-white/30
                                    opacity-70
                                  `
                            }
                            ${SYMBOLS[key] === '▲' || SYMBOLS[key] === '▼'
                                ? 'scale-[1.45]'
                                : ''
                            }
                        `}
                    >
                        {SYMBOLS[key]}
                    </span>
                )
            })}
        </div>
    )
}