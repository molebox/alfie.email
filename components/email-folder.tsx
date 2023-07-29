'use client'

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
import { getEmails } from "@/lib/server-actions"
import { useEffect, useState } from "react"
import { formatDate } from "@/lib/utils"


interface EmailFolderProps {
  className?: string
  editor: any
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


export function EmailFolder({ editor }: EmailFolderProps) {
  const { selectedFolder, setSelectedFolder } = useFolderContext();

  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const result = await getEmails();
      setEmails(result);
    };

    fetchEmails();
  }, []);

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