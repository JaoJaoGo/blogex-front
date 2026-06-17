import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'

const STORAGE_KEY = 'blogex_development_notice_hidden'

export default function DevelopmentNotice() {
    const [hidden, setHidden] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) === 'true'
    })

    function handleClose() {
        localStorage.setItem(STORAGE_KEY, 'true')
        setHidden(true)
    }

    if (hidden) {
        return null
    }

    return (
        <div
            className="
                border-b
                border-yellow-400/15
                bg-yellow-400/10
                backdrop-blur-md
                px-6
                py-3
            "
        >
            <div
                className="
                    max-w-7xl
                    mx-auto
                    flex
                    items-center
                    justify-between
                    gap-4
                "
            >
                <div className="flex items-center gap-3 text-sm text-yellow-100">
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-yellow-400/15
                            text-yellow-300
                        "
                    >
                        <AlertTriangle size={17} />
                    </div>

                    <p className="leading-relaxed">
                        <strong className="text-yellow-200">
                            Aviso:
                        </strong>{' '}
                        o Blogex ainda está em desenvolvimento. Algumas páginas,
                        informações e funcionalidades podem estar incompletas,
                        instáveis ou mudar com o tempo.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleClose}
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                        text-yellow-100
                        transition
                        hover:bg-white/20
                        hover:text-white
                    "
                    aria-label="Fechar aviso"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    )
}