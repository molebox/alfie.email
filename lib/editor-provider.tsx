'use client'

import { useEffect } from 'react'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'
import { lowlight } from 'lowlight/lib/core'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

interface EditorProviderProps {
  children: (editor: Editor | null) => JSX.Element;
}

export function EditorProvider({ children }: EditorProviderProps) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Typography,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-zinc-300 px-1 rounded-sm'
        },
      }),
      Link.configure({
        protocols: ['ftp', 'mailto'],
      }),
      CharacterCount
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor) {
      editor.chain().focus().run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }


  return children(editor);
}
