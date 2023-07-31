'use client'
import { PlusCircleIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { Sidebar } from "@/components/sidebar"
import { EmailFolder } from "@/components/email-folder"
import { useFolderContext } from "@/lib/context"
import { useUser } from "@clerk/nextjs";

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

// export const metadata: Metadata = {
//   title: "My email dashboard",
//   description: "Example music app using the components.",
// }

export default function Family() {
  const { selectedFolder, setSelectedFolder } = useFolderContext();
  const { isLoaded, isSignedIn, user } = useUser();

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

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <div className="block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                {selectedFolder.space !== 'compose' ? (
                  <div className="h-full px-4 py-6">
                    {selectedFolder.space !== 'compose' ? (
                      <Tabs defaultValue="unread" className="h-full space-y-6">
                        <div className="space-between flex items-center px-2">
                          <TabsList>
                            <TabsTrigger value="unread" className="relative">
                              Unread
                            </TabsTrigger>
                            <TabsTrigger value="read">Read</TabsTrigger>
                          </TabsList>
                          {/* <div className="ml-auto mr-4">
                                      <Button variant='secondary' onClick={sendEmail}>
                                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                                        Compose
                                      </Button>
                                    </div> */}
                          {/* <div className="ml-auto mr-4">
                            <Button variant='secondary' onClick={sendEmail}>
                              <PlusCircleIcon className="mr-2 h-4 w-4" />
                              Compose
                            </Button>
                          </div> */}
                        </div>
                        <TabsContent
                          value="unread"
                          className="border-none p-0 outline-none"
                        >
                          {selectedFolder && <EmailFolder folder="family" editor={editor} />}
                        </TabsContent>
                        <TabsContent
                          value="read"
                          className="h-full flex-col border-none p-0 data-[state=active]:flex"
                        >
                          <ScrollArea className="h-72 w-48 rounded-md border">
                            {selectedFolder && <EmailFolder folder="family" editor={editor} />}
                          </ScrollArea>
                        </TabsContent>
                      </Tabs>
                    ) : null}

                  </div>
                ) : <EmailFolder folder="family" editor={editor} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* 
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="unread" className="relative">
                          Unread
                        </TabsTrigger>
                        <TabsTrigger value="read">Read</TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button variant='secondary'>
                          <PlusCircleIcon className="mr-2 h-4 w-4" />
                          Compose
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="unread"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Listen Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            something
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Made for You
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your personal playlists. Updated daily.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            something
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="read"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <EmailTable />
                      <Separator className="my-4" />

                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
*/