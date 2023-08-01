import { Editor } from "@tiptap/react";
import { EmailEditor } from "./email-editor";
import { EmailForm } from "./email-form";
import { Separator } from "./ui/separator";

interface ComposeEmailProps {
  editor: Editor;
}

export function ComposeEmail({ editor }: ComposeEmailProps) {

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <h2 className="text-lg font-light tracking-tight text-slate-500">Compose</h2>
      <Separator className="my-4" />
      <EmailForm />
      <EmailEditor editor={editor} />
    </div>
  )
}