
import { useFolderContext } from "@/lib/context"
import { EmailCard } from "./email-card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

interface EmailFolderProps {
  className?: string
}

export function EmailFolder({ className }: EmailFolderProps) {
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
    <div className="min-h-screen bg-background flex flex-col" onClick={handleClick}>
      <div className="justify-start p-2">
        <div className="flex max-w-54 items-center">
          <h2 className="text-lg font-light tracking-tight text-slate-500">{selectedFolder.name}</h2>
          {selectedFolder.unreadEmails !== 0 ? <Badge className=" text-slate-600 ml-6 font-semibold" variant="outline">{selectedFolder.unreadEmails} unread</Badge> : null}
        </div>
      </div>
      <Separator className="my-4" />
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
    </div>
  )
}