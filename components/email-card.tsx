import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { truncate } from "@/lib/utils";
import { LabelSwatch } from "./label-swatch";
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { transform } from '@/lib/utils'

interface EmailCardProps {
  className?: string
  sender: string
  subject: string
  date: string
  blurb: string
  includesAttachment?: boolean
  unread?: boolean
}

export function EmailCard({ className, sender, subject, date, blurb, includesAttachment, unread }: EmailCardProps) {
  const [labels, setLabels] = useState<string[]>([])

  const sanitizeHtml = (html: string) => {
    return html.replace(/<!doctype html>|<html>|<\/html>|<head>.*<\/head>|<body>|<\/body>/g, '');
  }

  return (
    <Card className="h-full shadow-none">
      <CardHeader className="flex flex-col justify-start">
        <div className="flex justify-between items-center">
          <span className="text-md text-slate-700">{truncate(subject, 50)}</span>
          <>
            {unread ? <Badge className="text-slate-600 mr-4 font-semibold bg-red-100 border-slate-600" variant="outline">Unread</Badge> : null}
            {includesAttachment ? <Badge className="text-slate-600 mr-4 font-semibold" variant="outline">Attachment</Badge> : null}
            {labels.length > 0 ? labels.map(label => <Badge className="text-slate-600 mr-4 font-semibold" variant="outline">{label}</Badge>) : null}
            <span className="text-xs text-slate-400">{date}</span>
          </>
        </div>
        <span className="text-xs text-slate-400">From: {sender}</span>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent className="flex flex-col">
        <span className="max-h-3xl">{ReactHtmlParser(sanitizeHtml(blurb), { transform })}</span>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t px-6 py-3">
        <div className="items-center flex">
          <Button variant="outline" className="text-sm" size='sm'>Reply</Button>
          <Button variant="outline" className="text-sm ml-4" size='sm'>Forward</Button>
          <Button variant="default" className="text-sm ml-4" size='sm'>Open</Button>
          <LabelSwatch />
        </div>
        <Button variant="destructive" className="text-sm ml-4 bg-red-300 hover:bg-red-400 text-slate-800" size='sm'>Delete</Button>
      </CardFooter>
    </Card>
  )
}