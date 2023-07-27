import clsx from 'clsx';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  TextAlignJustifyIcon,
  ImageIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CodeIcon,
  TextIcon,
  HeadingIcon,
  ListBulletIcon,
  SectionIcon,
  QuoteIcon,
  TrackPreviousIcon,
  TrackNextIcon,
  UploadIcon,
  ReloadIcon
} from '@radix-ui/react-icons';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Separator } from './ui/separator';
import { Button } from './ui/button';


function ToolbarDivider() {
  return (
    <span className="w-[1px] bg-slate-400 block h-full"></span>
  )
}

export function ToolbarButton({ icon, command, onClick, disabled, editor }: any) {
  // function to check if the command is an object with a key of textAlign, then return the value of that key
  const isTextAlign = (command: any) => {
    if (command && typeof command === 'object' && 'textAlign' in command) {
      return command.textAlign;
    }
    return false
  }

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button
            className={clsx(
              'p-2 hover:bg-slate-300 h-full hover:rounded-md transition-colors duration-100 ease-in',
              editor.isActive(command) ? 'is-active' : '',
              editor.isActive(command) ? 'bg-slate-300 rounded-md' : ''
            )}
            onClick={onClick}
            disabled={disabled}
          >
            {icon}
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className='flex justify-start items-center bg-slate-100 text-slate-700 py-2 px-4 z-50 border rounded-md border-slate-300 text-xs' sideOffset={15} align="center" alignOffset={15}>
            {isTextAlign(command) === 'left' ? <span className='text-slate-700'>Left</span> : isTextAlign(command) === 'center' ? <span className='text-slate-700'>Center</span> : isTextAlign(command) === 'right' ? <span className='text-slate-700'>Right</span> : <span className='text-slate-700'>{command.charAt(0).toUpperCase() + command.slice(1)}</span>}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export function ClearEditor({ icon, command, disabled, editor }: any) {

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button
            className={clsx(
              'px-1 hover:bg-slate-700 h-full hover:rounded-md transition-colors duration-100 ease-in')}
            onClick={editor.commands.clearContent()}
            disabled={disabled}
          >
            {icon}
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className='  flex justify-start items-center bg-slate-800 text-slate-700 py-1 px-2 z-50 border rounded-md border-slate-700 text-xs' sideOffset={15} align="center" alignOffset={15}>
            <span className='text-slate-700'>{command.charAt(0).toUpperCase() + command.slice(1)}</span>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export function Toolbar({ editor }: any) {
  
  if (!editor) {
    return null
  }

  function handleHTML() {
    const html = editor.getHTML();
    const htmlString = `data:text/html;chatset=utf-8,${encodeURIComponent(html)}`;
    console.log({ htmlString });
    // const link = document.createElement("a");
    // link.href = htmlString;
    // link.download = `${filename}.html`;

    // link.click();
  }

  async function sendEmail() {
    const html = editor.getHTML();
    console.log({ html })
    await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: ['test@localhost.alfie.email'],
        from: 'hello@alfie.email',
        subject: 'Testing sendgrid 10',
        firstName: 'Richard',
        content: html
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      }
      )
  }

  return (
    <div className={clsx('toolbar', "min-w-52 h-14 px-2 py-2 bg-slate-200 overflow-hidden flex items-center rounded-tr-md rounded-tl-md  border-b-slate-300 justify-between sticky top-0")}>
      <div className='flex space-x-2 items-center '>
        <ToolbarButton
          icon={<FontBoldIcon className="h-4 w-4 text-slate-700" />}
          command={'bold'}
          editor={editor}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        />
        <ToolbarButton
          icon={<FontItalicIcon className="h-4 w-4 text-slate-700" />}
          command={'italic'}
          editor={editor}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        />
        <ToolbarButton
          icon={<StrikethroughIcon className="h-4 w-4 text-slate-700" />}
          command={'strike'}
          editor={editor}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
        />
        <ToolbarButton
          icon={<ListBulletIcon className="h-4 w-4 text-slate-700" />}
          command={'bulletList'}
          editor={editor}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon={<QuoteIcon className="h-4 w-4 text-slate-700" />}
          command={'blockquote'}
          editor={editor}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarDivider />
        <ToolbarButton
          icon={<TextAlignLeftIcon className="h-4 w-4 text-slate-700" />}
          command={{ textAlign: 'left' }}
          editor={editor}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
        <ToolbarButton
          icon={<TextAlignCenterIcon className="h-4 w-4 text-slate-700" />}
          command={{ textAlign: 'center' }}
          editor={editor}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
        <ToolbarButton
          icon={<TextAlignRightIcon className="h-4 w-4 text-slate-700" />}
          command={{ textAlign: 'right' }}
          editor={editor}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />
        <ToolbarDivider />
        <ToolbarButton
          icon={<CodeIcon className="h-4 w-4 text-slate-700" />}
          command={'code'}
          editor={editor}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
        />
        <ToolbarButton
          icon={<SectionIcon className="h-4 w-4 text-slate-700" />}
          command={'codeBlock'}
          editor={editor}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <ToolbarDivider />
        <ToolbarButton
          icon={<TrackPreviousIcon className="h-4 w-4 text-slate-700 hover:cursor-pointer" />}
          editor={editor}
          onClick={() => editor.chain().focus().undo().run()}
          command={'undo'}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        />
        <ToolbarButton
          icon={<TrackNextIcon className="h-4 w-4 text-slate-700 hover:cursor-pointer" />}
          onClick={() => editor.chain().focus().redo().run()}
          command={'redo'}
          editor={editor}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        />
        <ToolbarDivider />
        <Button variant='default' onClick={sendEmail} size='sm'>Send</Button>
      </div>
      <p className='flex text-xs text-slate-600 mx-4'>{editor.storage.characterCount.words()} words written</p>
    </div>
  )
}