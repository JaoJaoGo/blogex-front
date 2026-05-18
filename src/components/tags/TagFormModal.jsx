import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function TagFormModal({
    isOpen,
    tag,
    submitting,
    onClose,
    onSubmit,
}) {
    const [name, setName] = useState('')

    const isEditing = Boolean(tag)

    useEffect(() => {
        if (isOpen) {
            setName(tag?.name ?? '')
        }
    }, [isOpen, tag])

    async function handleSubmit(event) {
        event.preventDefault()

        await onSubmit({
            name: name.trim(),
        })

        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1120] p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">
                                {isEditing ? 'Editar tag' : 'Adicionar tag'}
                            </h2>

                            <button
                                type="button"
                                onClick={onClose}
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <label className="block text-sm text-gray-400 mb-2">
                            Nome da tag
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            placeholder="Ex: Laravel"
                            className="w-full h-11 rounded-xl bg-white/10 border border-white/10 px-4 text-sm outline-none focus:border-primary transition"
                            required
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 rounded-full bg-white/10 text-sm hover:bg-white/20 transition"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={submitting || !name.trim()}
                                className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition"
                            >
                                {submitting
                                    ? 'Salvando...'
                                    : isEditing
                                        ? 'Salvar alterações'
                                        : 'Criar tag'
                                }
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}