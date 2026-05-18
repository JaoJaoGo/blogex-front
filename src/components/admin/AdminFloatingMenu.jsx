import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { adminMenuItems } from './adminMenuItems'

export default function AdminFloatingMenu({ onLogout }) {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    async function handleItemClick(item) {
        if (item.action === 'logout') {
            await onLogout()
            return
        }

        if (item.to) {
            navigate(item.to)
            setIsOpen(false)
        }
    }

    return (
        <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="flex flex-col items-end gap-3"    
                    >
                        {adminMenuItems.map((item, index) => {
                            const Icon = item.icon

                            return (
                                <motion.button
                                    key={item.key}
                                    type="button"
                                    onClick={() => handleItemClick(item)}
                                    initial={{
                                        opacity: 0,
                                        y: 24,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 24,
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        delay: index * 0.05,
                                    }}
                                    className={`
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        rounded-full
                                        px-4
                                        py-3
                                        shadow-xl
                                        backdrop-blur-md
                                        border
                                        transition
                                        ${item.variant === 'danger'
                                            ? 'bg-red-500/15 border-red-400/30 text-red-300 hover:bg-red-500/25'
                                            : 'bg-white/10 border-white/10 text-white hover:bg-white/15'
                                        }
                                    `}
                                >
                                    <span className="text-sm font-medium">
                                        {item.label}
                                    </span>

                                    <span
                                        className={`
                                            w-9
                                            h-9
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            ${item.variant === 'danger'
                                                ? 'bg-red-500 text-white'
                                                : 'bg-primary text-white'
                                            }
                                        `}
                                    >
                                        <Icon size={17} />
                                    </span>
                                </motion.button>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                whileTap={{ scale: 0.95 }}
                className="
                    w-14
                    h-14
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-primary
                    text-white
                    shadow-2xl
                    border
                    border-white/10
                    hover:brightness-110
                    transition
                "
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X size={22} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="admin"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Shield size={22} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}