import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthor } from '../../context/AuthorContext'
import IntroTyping from './IntroTyping'
import AuthorCard from './AuthorCard'

const INTRO_COMPLETED_KEY = 'blogex_intro_completed'

export default function IntroScreen() {
    const [typingCompleted, setTypingCompleted] = useState(false)

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
                min-h-screen
                flex
                flex-col
                items-center
                justify-center
                overflow-hidden
                text-white
                relative
            "
            style={{ background: 'var(--bg)' }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

            <motion.h1
                animate={{
                    y: typingCompleted ? -120 : 0,
                    scale: typingCompleted ? 0.72 : 1,
                }}
                transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                }}
                className="
                    relative
                    z-10
                    text-5xl
                    md:text-6xl
                    font-black
                    uppercase
                    tracking-wide
                    text-center
                    text-white/75
                    leading-tight
                "
            >
                <IntroTyping
                    firstText="Bem-vindo ao Blogex"
                    secondText="Qual blog você deseja ver?"
                    onComplete={() => setTypingCompleted(true)}
                />
            </motion.h1>

            <AnimatePresence>
                {typingCompleted && (
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: 0.15,
                        }}
                        className="
                            relative
                            z-10
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-14
                            mt-8
                        "
                    >
                        <AuthorCard
                            name="João Victor"
                            variant="joao"
                            avatar="/images/authors/joao.jpg"
                            description="Conteúdos sobre desenvolvimento, tecnologia, projetos, ideias e algumas maluquices controladas."
                            tags={['Laravel', 'React', 'Dev']}
                            onClick={() => handleSelectAuthor('joao')}
                        />

                        <AuthorCard
                            name="Ellen Katharine"
                            variant="ellen"
                            avatar="/images/authors/ellen.jpg"
                            description="Textos, ideias, reflexões e conteúdos com a identidade própria da Ellen no Blogex."
                            tags={['Blog', 'Textos', 'Ideias']}
                            onClick={() => handleSelectAuthor('ellen')}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}