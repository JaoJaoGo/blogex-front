import { Heart } from 'lucide-react'
import KonamiHint from '../easter-eggs/konami/KonamiHint'

export default function Footer({ showKonami = true }) {
    const currentYear = new Date().getFullYear()

    return (
        <footer
            className="
                mt-20
                border-t
                border-white/10
                bg-black/20
                backdrop-blur-md
            "
        >
            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-10
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <div>
                    <h2 className="text-2xl font-black tracking-wide">
                        BLOGEX
                    </h2>

                    <p className="mt-2 text-sm text-gray-400 max-w-md leading-relaxed">
                        Um espaço criado para compartilhar ideias,
                        experiências, tecnologia, design, projetos
                        e pensamentos de forma pessoal e autêntica.
                    </p>
                </div>

                {showKonami && (
                    <div className="flex justify-center md:justify-end">
                        <KonamiHint />
                    </div>
                )}
            </div>

            <div
                className="
                    border-t
                    border-white/5
                    px-6
                    py-5
                    text-center
                    text-sm
                    text-gray-500
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <p>
                        © {currentYear} Blogex. Todos os direitos reservados. • Desenvolvido com{' '}
                        <Heart
                            size={14}
                            className="inline text-primary"
                            fill="currentColor"
                        />{' '}
                        por João e Ellen
                    </p>

                    <span
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.24em]
                            text-gray-500
                        "
                    >
                        V. 1.1
                    </span>
                </div>
            </div>
        </footer>
    )
}