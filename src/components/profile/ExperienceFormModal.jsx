import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import PostEditor from '../posts/PostEditor'

const initialForm = {
    name: '',
    workplace: '',
    start_date: '',
    is_current: false,
    end_date: '',
    description: '',
}

export default function ExperienceFormModal({
    isOpen,
    experience,
    submitting,
    onClose,
    onSubmit,
}) {
    const [form, setForm] = useState(initialForm)

    const isEditing = Boolean(experience)

    useEffect(() => {
        if (!isOpen) return

        setForm({
            name: experience?.name || '',
            workplace: experience?.workplace || '',
            start_date: experience?.start_date || '',
            is_current: Boolean(experience?.is_current),
            end_date: experience?.end_date || '',
            description: experience?.description || '',
        })
    }, [isOpen, experience])

    function setField(field, value) {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        await onSubmit({
            ...form,
            end_date: form.is_current ? null : form.end_date,
        })

        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 overflow-hidden"
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
                        className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0b1120] shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold">
                                {isEditing ? 'Editar experiência' : 'Adicionar experiência'}
                            </h2>

                            <button
                                type="button"
                                onClick={onClose}
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <Input
                                label="Cargo"
                                value={form.name}
                                onChange={value => setField('name', value)}
                                required
                            />

                            <Input
                                label="Empresa"
                                value={form.workplace}
                                onChange={value => setField('workplace', value)}
                                required
                            />

                            <Input
                                label="Data de início"
                                type="date"
                                value={form.start_date}
                                onChange={value => setField('start_date', value)}
                                required
                            />

                            {!form.is_current && (
                                <Input
                                    label="Data de término"
                                    type="date"
                                    value={form.end_date}
                                    onChange={value => setField('end_date', value)}
                                    required
                                />
                            )}

                            <label className="mt-4 flex items-center gap-3 text-sm text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={form.is_current}
                                    onChange={event => setField('is_current', event.target.checked)}
                                />

                                Trabalho atual
                            </label>

                            <div className="mt-4">
                                <label className="block text-sm text-gray-400 mb-2">
                                    Descrição
                                </label>

                                <PostEditor
                                    label="Descrição"
                                    value={form.description}
                                    onChange={value => setField('description', value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 rounded-full bg-white/10 text-sm hover:bg-white/20 transition"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold disabled:opacity-50"
                            >
                                {submitting
                                    ? 'Salvando...'
                                    : isEditing
                                        ? 'Salvar alterações'
                                        : 'Criar experiência'
                                }
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            )
            }
        </AnimatePresence >
    )
}

function Input({ label, value, onChange, type = 'text', required = false }) {
    return (
        <div>
            <label className="block text-sm text-gray-400 mb-2">
                {label}
            </label>

            <input
                type={type}
                value={value ?? ''}
                required={required}
                onChange={event => onChange(event.target.value)}
                className="w-full h-11 rounded-xl bg-white/10 border border-white/10 px-4 text-sm outline-none focus:border-primary transition"
            />
        </div>
    )
}