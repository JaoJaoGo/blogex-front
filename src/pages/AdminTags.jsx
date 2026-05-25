import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTags } from '../hooks/useTags'
import { useTagIcons } from '../hooks/useTagIcons'
import TagsTable from '../components/tags/TagsTable'
import TagFormModal from '../components/tags/TagFormModal'
import DeleteTagModal from '../components/tags/DeleteTagModal'
import TagsPagination from '../components/tags/TagsPagination'

export default function AdminTags() {
    const {
        tags,
        meta,
        loading,
        submitting,
        error,
        storeTag,
        editTag,
        removeTag,
        setPage,
    } = useTags()

    const {
        icons,
        loadingIcons,
        iconsError,
    } = useTagIcons()

    const [formModalOpen, setFormModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedTag, setSelectedTag] = useState(null)

    function handleCreate() {
        setSelectedTag(null)
        setFormModalOpen(true)
    }

    function handleEdit(tag) {
        setSelectedTag(tag)
        setFormModalOpen(true)
    }

    function handleDelete(tag) {
        setSelectedTag(tag)
        setDeleteModalOpen(true)
    }

    async function handleSubmit(payload) {
        if (selectedTag) {
            await editTag(selectedTag.id, payload)
            return
        }

        await storeTag(payload)
    }

    return (
        <section className="max-w-5xl mx-auto py-12">
            <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Tags
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Gerencie as tags usadas nos posts do Blogex.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-xl hover:brightness-110 transition"
                >
                    <Plus size={17} />
                    Adicionar tag
                </button>
            </div>

            {(error || iconsError) && (
                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                    {error || iconsError}
                </div>
            )}

            <TagsTable
                tags={tags}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <TagsPagination
                meta={meta}
                onPageChange={setPage}
            />

            <TagFormModal
                isOpen={formModalOpen}
                tag={selectedTag}
                icons={icons}
                loadingIcons={loadingIcons}
                submitting={submitting}
                onClose={() => setFormModalOpen(false)}
                onSubmit={handleSubmit}
            />

            <DeleteTagModal
                isOpen={deleteModalOpen}
                tag={selectedTag}
                submitting={submitting}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={removeTag}
            />
        </section>
    )
}