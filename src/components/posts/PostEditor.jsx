import { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'

import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    ImagePlus,
    Italic,
    List,
    ListOrdered,
    Pilcrow,
    SmilePlus,
    Underline as UnderlineIcon,
} from 'lucide-react'

import { uploadPostContentImage } from '../../services/postContentImageService'

const EMOJIS = [
    '😀', '😁', '😂', '🤣', '😊', '😍', '🥹', '😎',
    '🤔', '😅', '😐', '🙃', '😴', '😭', '😡', '🤯',
    '🔥', '✨', '💚', '💙', '💜', '🚀', '💡', '👀',
    '✅', '⚠️', '❌', '⭐', '🎉', '🧠', '💻', '🛠️',
]

function getImageAlignmentStyle(textAlign) {
    const baseStyle = 'display:block;max-width:100%;height:auto;'

    if (textAlign === 'center') {
        return `${baseStyle}margin-left:auto;margin-right:auto;`
    }

    if (textAlign === 'right') {
        return `${baseStyle}margin-left:auto;margin-right:0;`
    }

    if (textAlign === 'justify') {
        return `${baseStyle}width:100%;margin-left:0;margin-right:0;`
    }

    return `${baseStyle}margin-left:0;margin-right:auto;`
}

const PostImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),

            textAlign: {
                default: 'center',

                parseHTML: element => {
                    return element.getAttribute('data-align') || 'center'
                },

                renderHTML: attributes => {
                    return {
                        'data-align': attributes.textAlign,
                        style: getImageAlignmentStyle(attributes.textAlign),
                    }
                },
            },
        }
    },
})

const EditorShortcuts = Extension.create({
    name: 'editorShortcuts',

    addKeyboardShortcuts() {
        return {
            'Mod-Alt-1': () =>
                this.editor.chain().focus().toggleHeading({ level: 1 }).run(),

            'Mod-Alt-2': () =>
                this.editor.chain().focus().toggleHeading({ level: 2 }).run(),

            'Mod-Alt-0': () =>
                this.editor.chain().focus().setParagraph().run(),

            'Mod-Shift-8': () =>
                this.editor.chain().focus().toggleBulletList().run(),

            'Mod-Shift-7': () =>
                this.editor.chain().focus().toggleOrderedList().run(),

            'Mod-Alt-L': () =>
                this.editor.chain().focus().setTextAlign('left').run(),

            'Mod-Alt-E': () =>
                this.editor.chain().focus().setTextAlign('center').run(),

            'Mod-Alt-R': () =>
                this.editor.chain().focus().setTextAlign('right').run(),

            'Mod-Alt-J': () =>
                this.editor.chain().focus().setTextAlign('justify').run(),
        }
    },
})

export default function PostEditor({
    value,
    onChange,
}) {
    const [, forceToolbarUpdate] = useState(0)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imageError, setImageError] = useState(null)

    const imageInputRef = useRef(null)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
            }),

            Underline,

            PostImage.configure({
                inline: false,
                allowBase64: false,
            }),

            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
                defaultAlignment: 'left',
            }),

            EditorShortcuts,
        ],

        content: value || '',

        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },

        editorProps: {
            attributes: {
                class: 'post-editor-content min-h-[300px] outline-none px-5 py-4',
            },
        },
    })

    useEffect(() => {
        if (!editor) return

        function updateToolbar() {
            forceToolbarUpdate(value => value + 1)
        }

        editor.on('transaction', updateToolbar)
        editor.on('selectionUpdate', updateToolbar)

        return () => {
            editor.off('transaction', updateToolbar)
            editor.off('selectionUpdate', updateToolbar)
        }
    }, [editor])

    useEffect(() => {
        if (!editor) return

        const currentContent = editor.getHTML()
        const nextContent = value || ''

        if (currentContent !== nextContent) {
            editor.commands.setContent(nextContent, false)
        }
    }, [editor, value])

    function insertEmoji(emoji) {
        editor
            .chain()
            .focus()
            .insertContent(emoji)
            .run()

        setShowEmojiPicker(false)
    }

    function getCurrentAlignment() {
        if (editor.isActive('image')) {
            return editor.getAttributes('image').textAlign || 'center'
        }

        return (
            editor.getAttributes('paragraph').textAlign ||
            editor.getAttributes('heading').textAlign ||
            'left'
        )
    }

    function setAlignment(alignment) {
        if (editor.isActive('image')) {
            editor
                .chain()
                .focus()
                .updateAttributes('image', {
                    textAlign: alignment,
                })
                .run()

            return
        }

        editor
            .chain()
            .focus()
            .setTextAlign(alignment)
            .run()
    }

    async function handleImageSelected(event) {
        const file = event.target.files?.[0]

        event.target.value = ''

        if (!file) {
            return
        }

        setImageError(null)

        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
        ]

        if (!allowedTypes.includes(file.type)) {
            setImageError('Use uma imagem PNG, JPG ou WEBP.')
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setImageError('A imagem deve ter no máximo 2MB.')
            return
        }

        try {
            setUploadingImage(true)

            const uploadedImage = await uploadPostContentImage(file)

            editor
                .chain()
                .focus()
                .setImage({
                    src: uploadedImage.url,
                    alt: file.name,
                    textAlign: 'center',
                })
                .run()
        } catch {
            setImageError('Erro ao enviar imagem do conteúdo.')
        } finally {
            setUploadingImage(false)
        }
    }

    if (!editor) {
        return null
    }

    const currentAlignment = getCurrentAlignment()

    return (
        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
            "
        >
            <div
                className="
                    sticky
                    top-3
                    z-30
                    flex
                    flex-wrap
                    gap-2
                    rounded-t-2xl
                    border-b
                    border-white/10
                    bg-[#050b14]/95
                    p-3
                    backdrop-blur-xl
                    md:top-4
                "
            >
                <ToolbarButton
                    title="Negrito (Ctrl+B)"
                    active={editor.isActive('bold')}
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                >
                    <Bold size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Itálico (Ctrl+I)"
                    active={editor.isActive('italic')}
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                >
                    <Italic size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Sublinhado (Ctrl+U)"
                    active={editor.isActive('underline')}
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <UnderlineIcon size={16} />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    title="Título 1 (Ctrl+Alt+1)"
                    active={editor.isActive('heading', { level: 1 })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run()
                    }
                >
                    <Heading1 size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Título 2 (Ctrl+Alt+2)"
                    active={editor.isActive('heading', { level: 2 })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                >
                    <Heading2 size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Parágrafo (Ctrl+Alt+0)"
                    active={editor.isActive('paragraph')}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setParagraph()
                            .run()
                    }
                >
                    <Pilcrow size={16} />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    title="Lista com marcadores (Ctrl+Shift+8)"
                    active={editor.isActive('bulletList')}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                >
                    <List size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Lista numerada (Ctrl+Shift+7)"
                    active={editor.isActive('orderedList')}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                >
                    <ListOrdered size={16} />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    title="Alinhar à esquerda (Ctrl+Alt+L)"
                    active={currentAlignment === 'left'}
                    onClick={() => setAlignment('left')}
                >
                    <AlignLeft size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Centralizar (Ctrl+Alt+E)"
                    active={currentAlignment === 'center'}
                    onClick={() => setAlignment('center')}
                >
                    <AlignCenter size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Alinhar à direita (Ctrl+Alt+R)"
                    active={currentAlignment === 'right'}
                    onClick={() => setAlignment('right')}
                >
                    <AlignRight size={16} />
                </ToolbarButton>

                <ToolbarButton
                    title="Justificar (Ctrl+Alt+J)"
                    active={currentAlignment === 'justify'}
                    onClick={() => setAlignment('justify')}
                >
                    <AlignJustify size={16} />
                </ToolbarButton>

                <ToolbarDivider />

                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageSelected}
                    className="hidden"
                />

                <ToolbarButton
                    title="Inserir imagem"
                    active={uploadingImage}
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImage}
                >
                    <ImagePlus size={16} />
                </ToolbarButton>

                <div className="relative">
                    <ToolbarButton
                        title="Inserir emoji"
                        active={showEmojiPicker}
                        onClick={() => setShowEmojiPicker(value => !value)}
                    >
                        <SmilePlus size={16} />
                    </ToolbarButton>

                    {showEmojiPicker && (
                        <div
                            className="
                                absolute
                                left-0
                                top-11
                                z-40
                                grid
                                w-[260px]
                                max-w-[calc(100vw-2rem)]
                                grid-cols-8
                                gap-1.5
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#050b14]
                                p-3
                                shadow-2xl
                            "
                        >
                            {EMOJIS.map(emoji => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onMouseDown={event => event.preventDefault()}
                                    onClick={() => insertEmoji(emoji)}
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-lg
                                        transition
                                        hover:bg-white/10
                                        active:scale-90
                                    "
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {imageError && (
                <div className="border-b border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-300">
                    {imageError}
                </div>
            )}

            {uploadingImage && (
                <div className="border-b border-primary/20 bg-primary/10 px-5 py-3 text-sm text-primary">
                    Enviando imagem...
                </div>
            )}

            <EditorContent editor={editor} />
        </div>
    )
}

function ToolbarButton({
    children,
    active,
    title,
    onClick,
    disabled = false,
}) {
    return (
        <button
            type="button"
            title={title}
            disabled={disabled}
            onMouseDown={event => event.preventDefault()}
            onClick={onClick}
            aria-pressed={active}
            className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                transition
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${active
                    ? 'bg-primary text-white shadow-[0_0_16px_rgba(34,197,94,0.25)]'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }
            `}
        >
            {children}
        </button>
    )
}

function ToolbarDivider() {
    return (
        <div
            className="
                mx-1
                hidden
                h-9
                w-px
                bg-white/10
                sm:block
            "
        />
    )
}