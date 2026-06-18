import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthor } from '../../context/AuthorContext'
import { useIntroAuthors } from '../../hooks/useIntroAuthors'
import IntroTyping from './IntroTyping'
import AuthorCard from './AuthorCard'

const INTRO_COMPLETED_KEY = 'blogex_intro_completed'

export default function IntroScreen() {
    const [typingCompleted, setTypingCompleted] = useState(false)

    const authors = useIntroAuthors()

    const navigate = useNavigate()
    const { changeAuthor } = useAuthor()

    function handleSelectAuthor(author) {
        localStorage.setItem(INTRO_COMPLETED_KEY, 'true')
        localStorage.setItem('blogex_selected_author', author)

        changeAuthor(author)

        setTimeout(() => {
            navigate(`/${author}`)
        }, 850)
    }

    return (
        <section
            className="
                relative
                h-svh
                overflow-hidden
                text-white
                md:min-h-screen
            "
            style={{ background: 'var(--bg)' }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

            <motion.div
                initial={false}
                animate={{
                    scale: typingCompleted ? 0.72 : 1,
                }}
                transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                }}
                className={`
                    absolute
                    inset-x-0
                    z-10
                    flex
                    justify-center
                    px-4
                    -translate-y-1/2
                    will-change-transform
                    transition-[top]
                    duration-700
                    ease-in-out
                    ${typingCompleted
                        ? 'top-[13%] sm:top-[16%] md:top-[28%]'
                        : 'top-1/2'
                    }
                `}
            >
                <h1
                    className="
                        max-w-[92vw]
                        text-center
                        text-[clamp(1.7rem,8vw,3.75rem)]
                        font-black
                        uppercase
                        tracking-wide
                        text-white/75
                        leading-tight
                        whitespace-normal
                        md:whitespace-nowrap
                        md:text-5xl
                        lg:text-6xl
                    "
                >
                    <IntroTyping
                        firstText="Bem-vindo ao Blogex"
                        secondText="Qual blog você deseja ver?"
                        onComplete={() => setTypingCompleted(true)}
                    />
                </h1>
            </motion.div>

            <AnimatePresence>
                {typingCompleted && (
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: 0.2,
                        }}
                        className="
                            absolute
                            inset-x-0
                            top-[28%]
                            bottom-0
                            z-10
                            flex
                            justify-center
                            overflow-y-auto
                            overflow-x-hidden
                            px-4
                            pt-2
                            pb-8
                            md:top-[42%]
                            md:bottom-auto
                            md:overflow-visible
                            md:px-0
                            md:pt-0
                            md:pb-0
                        "
                    >
                        <div
                            className="
                                grid
                                w-full
                                max-w-[320px]
                                grid-cols-1
                                gap-4
                                sm:max-w-[660px]
                                sm:grid-cols-2
                                md:max-w-none
                                md:w-auto
                                md:gap-0
                            "
                        >
                            <AuthorCard
                                name={authors.joao.name}
                                variant="joao"
                                avatar={authors.joao.profile_photo_url}
                                description="Conteúdos sobre desenvolvimento, tecnologia, projetos, ideias e algumas maluquices controladas."
                                tags={['Laravel', 'React', 'Dev']}
                                onClick={() => handleSelectAuthor('joao')}
                            />

                            <AuthorCard
                                name={authors.ellen.name}
                                variant="ellen"
                                avatar={authors.ellen.profile_photo_url}
                                description="Textos, ideias, reflexões e conteúdos com a identidade própria da Ellen no Blogex."
                                tags={['Blog', 'Textos', 'Ideias']}
                                onClick={() => handleSelectAuthor('ellen')}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}