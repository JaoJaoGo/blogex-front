import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

export default function DeleteExperienceModal({
    isOpen,
    experience,
    submitting,
    onClose,
    onConfirm,
}) {
    async function handleConfirm() {
        await onConfirm(experience.id)
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && experience && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1120] p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-500/15 text-red-300 flex items-center justify-center">
                                    <AlertTriangle size={19} />
                                </div>

                                <h2 className="text-xl font-bold">
                                    Apagar experiência
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="text-gray-400">
                            Tem certeza que deseja apagar a experiência{' '}
                            <strong className="text-white">
                                {experience.name}
                            </strong>
                            ?
                        </p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 rounded-full bg-white/10 text-sm hover:bg-white/20 transition"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={submitting}
                                className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold disabled:opacity-50"
                            >
                                {submitting ? 'Apagando...' : 'Apagar'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}