import { motion, AnimatePresence } from 'framer-motion'
import { useAuthor } from '../../../context/AuthorContext'

export default function SlashTransition() {
    const { isTransitioning } = useAuthor()

    return (
        <AnimatePresence mode="wait">
            {isTransitioning && (
                <motion.div
                    key="slash-layer"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="
                        fixed
                        inset-0
                        z-50
                        pointer-events-none
                        overflow-hidden
                    "
                >
                    <motion.div
                        key="slash"
                        initial={{
                            x: '-160vmax',
                            y: '-50%',
                            rotate: -35,
                        }}
                        animate={{
                            x: '160vmax',
                            y: '-50%',
                            rotate: -35,
                        }}
                        transition={{
                            duration: 0.85,
                            ease: 'easeInOut',
                        }}
                        style={{
                            top: '50%',
                            left: '50%',
                            width: '190vmax',
                            height: 'clamp(160px, 22vmax, 430px)',
                            background: `
                                linear-gradient(
                                    135deg,
                                    var(--primary),
                                    rgba(255, 255, 255, 0.2),
                                    var(--accent)
                                )
                            `,
                            willChange: 'transform',
                        }}
                        className="
                            absolute
                            origin-center
                        "
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}