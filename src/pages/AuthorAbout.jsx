import { ArrowLeft } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuthorProfile } from '../hooks/useAuthorProfile'

import ExperienceList from '../components/profile/ExperienceList'
import SkillList from '../components/profile/SkillList'
import MatrixBackground from '../components/authors/MatrixBackground'
import DesignBackground from '../components/authors/DesignBackground'

export default function AuthorAbout() {
    const { author } = useParams()

    const navigate = useNavigate()

    const { profile, loading, error } = useAuthorProfile(author)

    const isJoao = author === 'joao'

    if (loading) {
        return (
            <section className="max-w-5xl mx-auto py-12 text-gray-400">
                Carregando perfil...
            </section>
        )
    }

    if (error || !profile) {
        return (
            <section className="max-w-5xl mx-auto py-12 text-red-400">
                {error || 'Autor não encontrado.'}
            </section>
        )
    }

    return (
        <section
            className={`
                relative
                min-h-[calc(100vh-120px)]
                overflow-hidden
                rounded-[2rem]
                p-8
                md:p-10
                shadow-2xl
                border
                border-white/10
                ${isJoao
                    ? 'bg-gradient-to-br from-green-500/30 via-green-900/45 to-black/50'
                    : 'bg-gradient-to-br from-pink-500/30 via-cyan-700/40 to-black/50'
                }
            `}
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                {isJoao ? (
                    <MatrixBackground />
                ) : (
                    <DesignBackground />
                )}
            </div>

            <div className="relative z-10">
                <button
                    type="button"
                    onClick={() => navigate(`/${author}`)}
                    className="
                        mb-8
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-300
                        hover:text-white
                        transition
                    "
                >
                    <ArrowLeft size={17} />
                    Voltar
                </button>

                <div
                    className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.06]
                        backdrop-blur-xl
                        p-8
                        shadow-[0_8px_40px_rgba(0,0,0,0.35)]
                    "
                >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        <div
                            className="
                                h-32
                                w-32
                                overflow-hidden
                                rounded-3xl
                                bg-white/10
                                border
                                border-white/10
                                shadow-2xl
                                shrink-0
                            "
                        >
                            {profile.profile_photo_url ? (
                                <img
                                    src={profile.profile_photo_url}
                                    alt={profile.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-full
                                        w-full
                                        items-center
                                        justify-center
                                        text-5xl
                                        font-black
                                        text-primary
                                    "
                                >
                                    {profile.name?.charAt(0)}
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl font-black">
                                {profile.name}
                            </h1>

                            <p className="mt-2 text-gray-300">
                                {profile.email}
                            </p>

                            <div className="mt-5 flex gap-3">
                                {profile.github && (
                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            w-11
                                            h-11
                                            rounded-2xl
                                            bg-white/10
                                            border
                                            border-white/10
                                            flex
                                            items-center
                                            justify-center
                                            text-white
                                            transition
                                            hover:bg-white/20
                                            hover:-translate-y-1
                                        "
                                    >
                                        <FaGithub size={18} />
                                    </a>
                                )}

                                {profile.linkedin && (
                                    <a
                                        href={profile.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            w-11
                                            h-11
                                            rounded-2xl
                                            bg-white/10
                                            border
                                            border-white/10
                                            flex
                                            items-center
                                            justify-center
                                            text-white
                                            transition
                                            hover:bg-white/20
                                            hover:-translate-y-1
                                        "
                                    >
                                        <FaLinkedin size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {profile.description && (
                        <div
                            className="
                                post-editor-content
                                mt-10
                                border-t
                                border-white/10
                                pt-8
                            "
                            dangerouslySetInnerHTML={{
                                __html: profile.description,
                            }}
                        />
                    )}
                </div>

                <div
                    className="
                        mt-8
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.08]
                        backdrop-blur-xl
                        p-8
                        shadow-[0_8px_40px_rgba(0,0,0,0.35)]
                    "
                >
                    <h2 className="text-2xl font-bold mb-6">
                        Habilidades
                    </h2>

                    <SkillList skills={profile.skills ?? []} />
                </div>

                <div
                    className="
                        mt-8
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.06]
                        backdrop-blur-xl
                        p-8
                        shadow-[0_8px_40px_rgba(0,0,0,0.35)]
                    "
                >
                    <h2 className="text-2xl font-bold mb-6">
                        Experiências
                    </h2>

                    <ExperienceList
                        experiences={profile.experiences ?? []}
                    />
                </div>
            </div>
        </section>
    )
}