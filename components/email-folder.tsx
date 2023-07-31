'use client'

import { useFolderContext, defaultFolders } from "@/lib/context"
import { EmailCard } from "./email-card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { EmailEditor } from "./email-editor"
import { EmailForm } from "./email-form"
import { getEmails } from "@/lib/server-actions"
import { useEffect, useState } from "react"
import { capitalizeFirstLetter, formatDate } from "@/lib/utils"


interface EmailFolderProps {
  className?: string
  editor: any
  folder: string
}

interface Email {
  id: number;
  from: string;
  to: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: 'SENT' | 'RECEIVED';
  userId: number;
}


export function EmailFolder({ editor, folder }: EmailFolderProps) {
  const { selectedFolder, setSelectedFolder } = useFolderContext();
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const result = await getEmails(selectedFolder?.space!);
      const emailsInFolder = result.filter(email => email.folder.toLowerCase() === folder.toLowerCase());
      setEmails(emailsInFolder);
    };

    fetchEmails();
  }, [folder]);

  const handleClick = () => {
    setSelectedFolder({ name: selectedFolder?.name, space: selectedFolder?.name.toLocaleLowerCase(), unreadEmails: selectedFolder?.unreadEmails });
  }


  return (
    <div className="min-h-screen bg-background flex flex-col gap-x-2 gap-y-6" onClick={handleClick}>
      <div className="justify-start gap-2">
        <div className="flex max-w-54 items-center gap-1">
          <h2 className="text-lg font-light tracking-tight text-slate-500">{capitalizeFirstLetter(folder)}</h2>
          {
            emails.filter(email => email.read === false).length !== 0 ?
              <Badge className=" text-slate-600 ml-6 font-semibold" variant="outline">
                {emails.filter(email => email.read === false).length} unread
              </Badge>
              : null
          }
        </div>
        {selectedFolder.space === 'compose' ? (
          <div className="mx-2">
            <Separator className="gap-y-4" />
            <EmailForm />
          </div>
        ) : null}
      </div>
      {selectedFolder.space === 'compose' ? <EmailEditor editor={editor} /> : null}
      {emails.length >= 1 ? emails.map((email: Email) => (
        <EmailCard
          key={email.id}
          sender={email.from}
          subject={email.subject}
          date={formatDate(email.createdAt.toString())}
          blurb={email.body}
        />
      )) : null}
    </div>
  )
}