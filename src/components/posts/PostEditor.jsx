import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Pilcrow
} from 'lucide-react'

export default function PostEditor({
    value,
    onChange,
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
            }),
            Underline,
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

    if (!editor) {
        return null
    }

    return (
        <div className="
            rounded-2xl
            overflow-hidden
            border
            border-white/10
            bg-white/[0.04]
        ">
            <div className="
                flex
                flex-wrap
                gap-2
                p-3
                border-b
                border-white/10
            ">
                <ToolbarButton
                    active={editor.isActive('bold')}
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                >
                    <Bold size={16} />
                </ToolbarButton>

                <ToolbarButton
                    active={editor.isActive('italic')}
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                >
                    <Italic size={16} />
                </ToolbarButton>

                <ToolbarButton
                    active={editor.isActive('underline')}
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <UnderlineIcon size={16} />
                </ToolbarButton>

                <ToolbarButton
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

                <ToolbarButton
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
            </div>

            <EditorContent editor={editor} />
        </div>
    )
}

function ToolbarButton({
    children,
    active,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
                transition
                ${active
                    ? 'bg-primary text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }
            `}
        >
            {children}
        </button>
    )
}