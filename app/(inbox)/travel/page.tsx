'use client'
import { Editor } from '@tiptap/react'
import { Sidebar } from "@/components/sidebar"
import { SignIn, useUser } from "@clerk/nextjs";
import { EditorProvider } from "@/lib/editor-provider"
import { EmailFolderWithTabs } from "@/components/email-folder-with-tabs"

// export const metadata: Metadata = {
//   title: "My email dashboard",
//   description: "Example music app using the components.",
// }

export default function Travel() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <SignIn path="/sign-in" routing="path" />;
  }

  return (
    <EditorProvider>
      {(editor: Editor | null) => {
        if (!editor) {
          // handle the null case, e.g., show loading spinner
          return <div>Loading...</div>;
        }
        return (
          <>
            <div className="block">
              <div className="border-t">
                <div className="bg-background">
                  <div className="grid lg:grid-cols-5">
                    <Sidebar className="hidden lg:block" />
                    {EmailFolderWithTabs({ editor, folder: 'travel' })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </EditorProvider>
  )
}

