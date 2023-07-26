'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import Link from '@tiptap/extension-link'
import { lowlight } from 'lowlight/lib/core'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { useEffect } from 'react'
import { Toolbar } from './toolbar'
import { Card, CardContent } from './ui/card'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

export function EmailEditor() {
  const editor = useEditor({
    extensions: [
      // StarterKit,
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
      // Document, Paragraph, Text, Code, BulletList, ListItem, Blockquote
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  })
  // add ref and auto focus to the editor
  useEffect(() => {
    if (editor) {
      editor.chain().focus().run();
    }
  }, [editor])
  return (
    <Card className='mx-2 my-4'>
      <CardContent className='p-0 w-full relative'>
        <Toolbar editor={editor} />
        <EditorContent className=' p-0 lg:min-h-[800px] md:min-h-[700px] sm:h-screen lg:h-4/6 outline-none resize-none text-ellipsis bg-slate-50 overflow-hidden rounded-md text-slate-900 prose' editor={editor} />
      </CardContent>
    </Card>
  )
}