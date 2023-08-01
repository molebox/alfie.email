import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Editor } from "@tiptap/react"
import { EmailFolder } from "./email-folder"
import { ComposeEmail } from "./compose-email"
import { EmailEditor } from "./email-editor"
import { EmailForm } from "./email-form"

interface EmailFolderWithTabsProps {
  editor: Editor;
  folder: string;
}

export function EmailFolderWithTabs({ editor, folder }: EmailFolderWithTabsProps) {
  return <div className="col-span-3 lg:col-span-4 lg:border-l">
    <div className="h-full px-4 py-6">
      {folder === 'compose' ? (
        <ComposeEmail editor={editor} />
      ) : (
        <Tabs defaultValue="unread" className="h-full space-y-6">
          <div className="space-between flex items-center gap-x-2">
            <TabsList>
              <TabsTrigger value="unread" className="relative">
                Unread
              </TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="unread"
            className="border-none p-0 outline-none"
          >
            <EmailFolder folder={folder} editor={editor} state='unread' />
          </TabsContent>
          <TabsContent
            value="read"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <EmailFolder folder={folder} editor={editor} state='read' />
          </TabsContent>
        </Tabs>
      )}
    </div>
  </div>
}