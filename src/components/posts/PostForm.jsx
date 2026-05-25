import { Save } from 'lucide-react'
import ImageUpload from './ImageUpload'
import PostEditor from './PostEditor'
import PostTagsSelector from './PostTagsSelector'
import AuthorBadge from './AuthorBadge'

export default function PostForm({
    mode = 'create',
    form,
    tags = [],
    loadingTags = false,
    submitting = false,
    error = null,
    onFieldChange,
    onToggleTag,
    onSubmit,
}) {
    const isEditing = mode === 'edit'

    async function handleSubmit(event) {
        event.preventDefault()
        await onSubmit()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-5xl py-12"
        >
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {isEditing ? 'Editar post' : 'Criar novo post'}
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Escreva, organize e publique conteúdos no Blogex.
                    </p>
                </div>

                {form.author && (
                    <AuthorBadge author={form.author} />
                )}
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                    {error}
                </div>
            )}

            <div className="grid gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl">
                    <div className="grid gap-5">
                        <div>
                            <label className="mb-2 block text-sm text-gray-400">
                                Título
                            </label>

                            <input
                                type="text"
                                value={form.title}
                                onChange={event => onFieldChange('title', event.target.value)}
                                placeholder="Ex: Construindo um blog com Laravel e React"
                                className="h-12 w-full rounded-2xl border border-white/10 bg-white/10 px-4 text-sm outline-none transition focus:border-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-400">
                                Subtítulo
                            </label>

                            <input
                                type="text"
                                value={form.subtitle}
                                onChange={event => onFieldChange('subtitle', event.target.value)}
                                placeholder="Uma breve descrição do post"
                                className="h-12 w-full rounded-2xl border border-white/10 bg-white/10 px-4 text-sm outline-none transition focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <ImageUpload
                    image={form.image}
                    currentImage={form.currentImage}
                    removeImage={form.remove_image}
                    onChange={file => {
                        onFieldChange('image', file)
                        onFieldChange('remove_image', false)
                    }}
                    onRemove={() => {
                        onFieldChange('image', null)
                        onFieldChange('remove_image', true)
                    }}
                />

                <PostTagsSelector
                    tags={tags}
                    selectedTags={form.tags}
                    loading={loadingTags}
                    onToggleTag={onToggleTag}
                />

                <PostEditor
                    value={form.content}
                    onChange={value => onFieldChange('content', value)}
                />

                <div className="flex justify-end gap-3">
                    <button
                        type="submit"
                        disabled={submitting || !form.title.trim() || !form.content.trim() || form.tags.length === 0}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-primary
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-xl
                            transition
                            hover:brightness-110
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <Save size={17} />

                        {submitting
                            ? 'Salvando...'
                            : isEditing
                                ? 'Salvar alterações'
                                : 'Publicar post'
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}