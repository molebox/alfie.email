import { EditorContent } from '@tiptap/react'
import { Toolbar } from './toolbar'
import { Card, CardContent } from './ui/card'

export function EmailEditor({ editor }: any) {
  return (
    <Card className='mx-4 my-4'>
      <CardContent className='p-0 w-full relative'>
        <Toolbar editor={editor} />
        <EditorContent className=' p-0 lg:min-h-[800px] md:min-h-[700px] sm:h-screen lg:h-4/6 outline-none resize-none text-ellipsis bg-slate-50 overflow-hidden rounded-md text-slate-900 prose' editor={editor} />
      </CardContent>
    </Card>
  )
}