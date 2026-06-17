import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const initialForm = {
    name: '',
    level: 1,
}

const levels = [
    { value: 1, label: 'Nível 1 · Iniciante' },
    { value: 2, label: 'Nível 2 · Básico' },
    { value: 3, label: 'Nível 3 · Intermediário' },
    { value: 4, label: 'Nível 4 · Avançado' },
    { value: 5, label: 'Nível 5 · Especialista' },
]

export default function SkillFormModal({
    isOpen,
    skill,
    submitting,
    onClose,
    onSubmit,
}) {
    const [form, setForm] = useState(initialForm)

    const isEditing = Boolean(skill)

    useEffect(() => {
        if (!isOpen) return

        setForm({
            name: skill?.name ?? '',
            level: skill?.level ?? 1,
        })
    }, [isOpen, skill])

    function setField(field, value) {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        await onSubmit({
            name: form.name.trim(),
            level: Number(form.level),
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
                                {isEditing ? 'Editar habilidade' : 'Adicionar habilidade'}
                            </h2>

                            <button
                                type="button"
                                onClick={onClose}
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Nome da habilidade
                            </label>

                            <input
                                type="text"
                                value={form.name}
                                onChange={event => setField('name', event.target.value)}
                                placeholder="Ex: Laravel"
                                required
                                className="w-full h-11 rounded-xl bg-white/10 border border-white/10 px-4 text-sm outline-none focus:border-primary transition"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm text-gray-400 mb-2">
                                Nível
                            </label>

                            <select
                                value={form.level}
                                onChange={event => setField('level', Number(event.target.value))}
                                className="w-full h-11 rounded-xl bg-white/10 border border-white/10 px-4 text-sm outline-none focus:border-primary transition"
                            >
                                {levels.map(level => (
                                    <option
                                        key={level.value}
                                        value={level.value}
                                        className="bg-[#0b1120]"
                                    >
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                                disabled={submitting || !form.name.trim()}
                                className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold disabled:opacity-50"
                            >
                                {submitting
                                    ? 'Salvando...'
                                    : isEditing
                                        ? 'Salvar alterações'
                                        : 'Criar habilidade'
                                }
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}