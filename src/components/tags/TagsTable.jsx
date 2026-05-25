import { Pencil, Trash2 } from 'lucide-react'
import TagBadge from './TagBadge'

export default function TagsTable({
    tags,
    loading,
    onEdit,
    onDelete,
}) {
    if (loading) {
        return (
            <div className="text-gray-400">
                Carregando tags...
            </div>
        )
    }

    if (!tags.length) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-10 text-center text-gray-400">
                <h2 className="text-xl font-bold text-white mb-2">
                    Nenhuma tag encontrada.
                </h2>

                <p>
                    Crie a primeira tag para começar a organizar os posts.
                </p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-2xl">
            <table className="w-full border-collapse">
                <thead className="bg-white/[0.07]">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            ID
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Tag
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Cor
                        </th>

                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                            Ações
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tags.map(tag => (
                        <tr
                            key={tag.id}
                            className="border-t border-white/10 hover:bg-white/[0.04] transition"
                        >
                            <td className="px-6 py-4 text-sm text-gray-400">
                                #{tag.id}
                            </td>

                            <td className="px-6 py-4">
                                <TagBadge tag={tag} />
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span
                                        className="w-5 h-5 rounded-full border border-white/20"
                                        style={{
                                            backgroundColor: tag.color || '#22c55e',
                                        }}
                                    />

                                    {tag.color || '-'}
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(tag)}
                                        className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
                                    >
                                        <Pencil size={15} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDelete(tag)}
                                        className="w-9 h-9 rounded-full bg-red-500/15 text-red-300 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}