
import { useFolderContext } from "@/lib/context"
import { EmailCard } from "./email-card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { EmailEditor } from "./email-editor"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EmailForm } from "./email-form"

interface EmailFolderProps {
  className?: string
  editor: any
}

export function EmailFolder({ editor }: EmailFolderProps) {
  const { selectedFolder, setSelectedFolder } = useFolderContext();

  // async function getEmails() {
  //   'use server'
  //   const res = await fetch('/api/retrieve', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       id: '38406f24-7aa4-4da8-bda1-67c81772e03e'
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     }
  //     )
  // }

  // getEmails();

  const handleClick = () => {
    setSelectedFolder({ name: selectedFolder?.name, space: selectedFolder?.name.toLocaleLowerCase(), unreadEmails: selectedFolder?.unreadEmails });
  }


  return (
    <div className="min-h-screen bg-background flex flex-col px-2 py-6" onClick={handleClick}>
      <div className="justify-start p-2">
        <div className="flex max-w-54 items-center mx-2">
          <h2 className="text-lg font-light tracking-tight text-slate-500">{selectedFolder.name}</h2>
          {selectedFolder.unreadEmails !== 0 ? <Badge className=" text-slate-600 ml-6 font-semibold" variant="outline">{selectedFolder.unreadEmails} unread</Badge> : null}
        </div>
        {selectedFolder.space === 'compose' ? (
          <div className="mx-2">
            <Separator className="my-4" />
            <EmailForm />
          </div>
        ) : null}
      </div>
      {selectedFolder.space === 'compose' ? <EmailEditor editor={editor} /> : null}
      <EmailCard
        sender="John Doe"
        subject="Super cool email"
        date="Today, 12:30pm"
        blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisl. Sed euismod, nisl quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisl. Sed euismod, nisl quis."
        includesAttachment
        unread
      />
      <EmailCard
        sender="Barry Doe"
        subject="Another cool email"
        date="Today, 13:45pm"
        blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisl. Sed euismod, nisl quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisl. Sed euismod, nisl quis."
      />
      <EmailCard
        sender="Jane Doe"
        subject="Yet another cool email from one of your fav friends!"
        date="Today, 14:30pm"
        blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisl. Sed euismod, nisl quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisl. Sed euismod, nisl quis."
        unread
      />
      <EmailCard
        sender="Bruce Wayne"
        subject="I have a secret to tell you..."
        date="Today, 15:30pm"
        blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisl. Sed euismod, nisl quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisl. Sed euismod, nisl quis."
        unread
      />
    </div>
  )
}