import { UserRound } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import MatrixBackground from '../shared/effects/MatrixBackground'
import DesignBackground from '../shared/effects/DesignBackground'

export default function AuthorHeroSection({
    author,
    profile,
    loading,
}) {
    const navigate = useNavigate()

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto mt-10 rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-gray-400">
                Carregando autor...
            </section>
        )
    }

    if (!profile) {
        return null
    }

    const isJoao = author === 'joao'

    return (
        <section
            className={`
                relative
                max-w-6xl
                mx-auto
                mt-10
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                p-8
                md:p-10
                shadow-2xl
                ${isJoao
                    ? 'bg-gradient-to-br from-green-500/30 via-green-900/40 to-black/30'
                    : 'bg-gradient-to-br from-pink-500/30 via-blue-700/35 to-black/30'
                }
            `}
        >
            {isJoao ? <MatrixBackground /> : <DesignBackground />}

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-xl">
                        {profile.profile_photo_url ? (
                            <img
                                src={profile.profile_photo_url}
                                alt={profile.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-4xl font-black text-primary">
                                {profile.name?.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                            Autor selecionado
                        </p>

                        <h1 className="text-3xl font-black md:text-4xl">
                            {profile.name}
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300 line-clamp-3">
                            {stripHtml(profile.description) || 'Bem-vindo ao meu espaço no Blogex.'}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            {profile.github && (
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                                >
                                    <FaGithub size={16} />
                                    GitHub
                                </a>
                            )}

                            {profile.linkedin && (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                                >
                                    <FaLinkedin size={16} />
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => navigate(`/${author}/sobre`)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-950 shadow-xl hover:scale-[1.03] active:scale-[0.98] transition"
                >
                    <UserRound size={17} />
                    Sobre mim
                </button>
            </div>
        </section>
    )
}

function stripHtml(value = '') {
    if (!value) return ''

    return value.replace(/<[^>]*>/g, '')
}