import { ImagePlus, Trash2 } from 'lucide-react'
import { useMemo } from 'react'

export default function ImageUpload({
    image,
    currentImage,
    removeImage = false,
    onChange,
    onRemove,
}) {
    const previewUrl = useMemo(() => {
        if (image instanceof File) {
            return URL.createObjectURL(image)
        }

        if (currentImage && !removeImage) {
            return `${import.meta.env.VITE_API_URL}/storage/${currentImage}`
        }

        return null
    }, [image, currentImage, removeImage])

    return (
        <div>
            <label className="block text-sm text-gray-400 mb-2">
                Imagem do post
            </label>

            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.04] p-4">
                {previewUrl ? (
                    <div className="relative overflow-hidden rounded-2xl">
                        <img
                            src={previewUrl}
                            alt="Pré-visualização da imagem do post"
                            className="h-64 w-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={onRemove}
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-xl hover:brightness-110 transition"
                        >
                            <Trash2 size={17} />
                        </button>
                    </div>
                ) : (
                    <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl bg-white/[0.03] text-center hover:bg-white/[0.06] transition">
                        <ImagePlus className="mb-3 text-primary" size={34} />

                        <span className="text-sm font-semibold text-white">
                            Selecionar imagem
                        </span>

                        <span className="mt-1 text-xs text-gray-400">
                            PNG, JPG ou WEBP até 2MB
                        </span>

                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={event => {
                                const file = event.target.files?.[0]

                                if (file) {
                                    onChange(file)
                                }
                            }}
                            className="hidden"
                        />
                    </label>
                )}
            </div>
        </div>
    )
}