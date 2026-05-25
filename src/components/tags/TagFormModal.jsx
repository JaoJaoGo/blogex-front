import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { getTagIcon } from '../../config/tagIcons'
import { HexColorPicker } from 'react-colorful'

const DEFAULT_COLOR = '#22c55e'

export default function TagFormModal({
    isOpen,
    tag,
    icons = [],
    loadingIcons = false,
    submitting,
    onClose,
    onSubmit,
}) {
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('')
    const [color, setColor] = useState(DEFAULT_COLOR)
    const [showColorPicker, setShowColorPicker] = useState(false)

    const colorPickerRef = useRef(null)

    const isEditing = Boolean(tag)

    function getRgbFromHex(hex) {
        const normalized = hex.replace('#', '')

        if (normalized.length !== 6) {
            return [
                { label: 'R', value: '-' },
                { label: 'G', value: '-' },
                { label: 'B', value: '-' },
            ]
        }

        return [
            {
                label: 'R',
                value: parseInt(normalized.slice(0, 2), 16),
            },
            {
                label: 'G',
                value: parseInt(normalized.slice(2, 4), 16),
            },
            {
                label: 'B',
                value: parseInt(normalized.slice(4, 6), 16),
            },
        ]
    }

    useEffect(() => {
        if (isOpen) {
            setName(tag?.name ?? '')
            setIcon(tag?.icon ?? icons[0]?.key ?? '')
            setColor(tag?.color ?? DEFAULT_COLOR)
        }
    }, [isOpen, tag, icons])

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                colorPickerRef.current &&
                !colorPickerRef.current.contains(event.target)
            ) {
                setShowColorPicker(false)
            }
        }

        if (showColorPicker) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showColorPicker])

    async function handleSubmit(event) {
        event.preventDefault()

        await onSubmit({
            name: name.trim(),
            icon,
            color,
        })

        onClose()
    }

    const selectedIcon = icons.find(item => item.key === icon)
    const SelectedIcon = selectedIcon ? getTagIcon(selectedIcon.key) : null

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
                        className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b1120] p-6 shadow-2xl"
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

                        <div className="space-y-5">
                            <div>
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
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Cor da tag
                                </label>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowColorPicker(prev => !prev)}
                                        className="
                                            w-12 h-11 rounded-xl border border-white/10
                                            overflow-hidden hover:border-primary transition
                                        "
                                    >
                                        <div
                                            className="w-full h-full"
                                            style={{ background: color }}
                                        />
                                    </button>

                                    <input
                                        type="text"
                                        value={color}
                                        onChange={event => setColor(event.target.value)}
                                        className="
                                            flex-1 h-11 rounded-xl bg-white/10 border border-white/10
                                            px-4 text-sm outline-none focus:border-primary transition
                                        "
                                    />
                                </div>

                                <AnimatePresence>
                                    {showColorPicker && (
                                        <motion.div
                                            ref={colorPickerRef}
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.18 }}
                                            className="
                                                mt-4
                                                w-full
                                                rounded-3xl
                                                border
                                                border-white/10
                                                bg-[#0f172a]
                                                p-4
                                                shadow-2xl
                                            "
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white">
                                                        Escolha uma cor
                                                    </h3>

                                                    <p className="text-xs text-gray-400">
                                                        Aplicada na tag, texto e ícone.
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setShowColorPicker(false)}
                                                    className="
                                                        w-8 h-8 rounded-full bg-white/10
                                                        flex items-center justify-center
                                                        hover:bg-white/20 transition
                                                    "
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>

                                            <div className="rounded-2xl overflow-hidden">
                                                <HexColorPicker
                                                    color={color}
                                                    onChange={setColor}
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 mt-4">
                                                {getRgbFromHex(color).map(item => (
                                                    <div key={item.label}>
                                                        <label className="block text-[10px] text-gray-500 mb-1">
                                                            {item.label}
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={item.value}
                                                            readOnly
                                                            className="
                                                                w-full
                                                                h-9
                                                                rounded-xl
                                                                bg-white/10
                                                                border
                                                                border-white/10
                                                                px-3
                                                                text-sm
                                                                text-gray-300
                                                                outline-none
                                                            "
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-2 mt-4">
                                                {[
                                                    '#ef4444',
                                                    '#f97316',
                                                    '#eab308',
                                                    '#22c55e',
                                                    '#06b6d4',
                                                    '#8b5cf6',
                                                    '#ec4899',
                                                ].map(preset => (
                                                    <button
                                                        key={preset}
                                                        type="button"
                                                        onClick={() => setColor(preset)}
                                                        className="
                                                            w-8 h-8 rounded-full border border-white/10
                                                            hover:scale-110 transition
                                                        "
                                                        style={{ background: preset }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-3">
                                    Ícone da tag
                                </label>

                                {loadingIcons ? (
                                    <p className="text-sm text-gray-400">
                                        Carregando ícones...
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {icons.map(item => {
                                            const Icon = getTagIcon(item.key)
                                            const active = icon === item.key

                                            return (
                                                <button
                                                    key={item.key}
                                                    type="button"
                                                    onClick={() => setIcon(item.key)}
                                                    className={`
                                                        flex
                                                        items-center
                                                        gap-2
                                                        rounded-xl
                                                        border
                                                        px-3
                                                        py-3
                                                        text-sm
                                                        transition
                                                        ${active
                                                            ? 'border-primary bg-primary/15 text-primary'
                                                            : 'border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/[0.08]'
                                                        }
                                                    `}
                                                >
                                                    {Icon && <Icon size={16} />}
                                                    {item.label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Pré-visualização
                                </label>

                                <span
                                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
                                    style={{
                                        color,
                                        borderColor: color,
                                        backgroundColor: `${color}22`,
                                    }}
                                >
                                    {SelectedIcon && <SelectedIcon size={14} />}
                                    {name.trim() || 'Nome da tag'}
                                </span>
                            </div>
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
                                disabled={submitting || !name.trim() || !icon || !color}
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