import { Heart } from 'lucide-react'
import KonamiHint from './KonamiHint'

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
                        items-center
                        justify-center
                        gap-2
                        flex-wrap
                    "
                >
                    <span>
                        © {currentYear} Blogex. Todos os direitos reservados.
                    </span>

                    <span className="hidden md:inline">
                        •
                    </span>

                    <span
                        className="
                            flex
                            items-center
                            gap-1
                        "
                    >
                        Desenvolvido com

                        <Heart
                            size={14}
                            className="text-red-500 fill-red-500"
                        />

                        por João e Ellen
                    </span>
                </div>
            </div>
        </footer>
    )
}