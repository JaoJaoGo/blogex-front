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
    const { progress, code, submitKonamiKey } = useKonami()

    return (
        <div
            className="
                flex
                flex-col
                items-center
                gap-5
                select-none
            "
            style={{
                fontFamily: '"Press Start 2P", monospace',
            }}
        >
            <div
                className="
                    flex
                    items-center
                    justify-center
                    gap-4
                "
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

            <div
                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-8
                    md:hidden
                "
                aria-label="Controle mobile do Konami Code"
            >
                <div
                    className="
                        grid
                        grid-cols-3
                        grid-rows-3
                        gap-1.5
                    "
                >
                    <div />

                    <ControlButton
                        label="Cima"
                        onClick={() => submitKonamiKey('ArrowUp')}
                    >
                        ▲
                    </ControlButton>

                    <div />

                    <ControlButton
                        label="Esquerda"
                        onClick={() => submitKonamiKey('ArrowLeft')}
                    >
                        ◀
                    </ControlButton>

                    <div
                        className="
                            h-10
                            w-10
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.04]
                            shadow-inner
                        "
                    />

                    <ControlButton
                        label="Direita"
                        onClick={() => submitKonamiKey('ArrowRight')}
                    >
                        ▶
                    </ControlButton>

                    <div />

                    <ControlButton
                        label="Baixo"
                        onClick={() => submitKonamiKey('ArrowDown')}
                    >
                        ▼
                    </ControlButton>

                    <div />
                </div>

                <div className="flex items-end gap-4">
                    <ActionButton
                        label="B"
                        onClick={() => submitKonamiKey('b')}
                    />

                    <ActionButton
                        label="A"
                        onClick={() => submitKonamiKey('a')}
                    />
                </div>
            </div>
        </div>
    )
}

function ControlButton({ children, label, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.07]
                text-[13px]
                text-white/60
                shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                transition
                active:scale-90
                active:bg-primary/25
                active:text-primary
            "
        >
            {children}
        </button>
    )
}

function ActionButton({ label, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-primary/30
                bg-primary/15
                text-[12px]
                text-primary
                shadow-[0_0_20px_rgba(34,197,94,0.18)]
                transition
                active:scale-90
                active:bg-primary
                active:text-black
            "
        >
            {label}
        </button>
    )
}