import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { truncate } from "@/lib/utils";

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
  return (
    <Card className="h-full my-4">
      <CardHeader className="flex flex-col  justify-start">
        <div className="flex justify-between">
          <span className="text-md text-slate-700">{truncate(subject, 50)}</span>
          <div>
            {unread ? <Badge className="text-slate-600 mr-4 font-semibold bg-red-100 border-slate-600" variant="outline">Unread</Badge> : null}
            {includesAttachment ? <Badge className="text-slate-600 mr-4 font-semibold" variant="outline">Attachment</Badge> : null}
            <span className="text-xs text-slate-400">{date}</span>
          </div>
        </div>
        <span className="text-xs">From: {sender}</span>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent className="flex flex-col">
        <span className="text-sm">{truncate(blurb, 200)}</span>
      </CardContent>
      <CardFooter className="flex items-center justify-start border-t px-6 py-3">
        <Button variant="default" className="text-sm" size='sm'>Reply</Button>
        <Button variant="outline" className="text-sm ml-4" size='sm'>Forward</Button>

      </CardFooter>
    </Card>
  )
}