'use client'
import { PlusCircleIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Sidebar } from "@/components/sidebar"
import { EmailFolder } from "@/components/email-folder"
import { useFolderContext } from "@/lib/context"
import { useEffect } from "react"

// export const metadata: Metadata = {
//   title: "My email dashboard",
//   description: "Example music app using the components.",
// }

export default function Dashboard() {
  const { selectedFolder, setSelectedFolder } = useFolderContext();

  async function sendEmail() {
    await fetch('/api/retrieve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: ['hello@richardhaines.dev'],
        from: 'hello@alfie.email',
        subject: 'Testing SendGrid',
        firstName: 'Richard',
        content: 'Next.js'
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      }
      )
  }

  return (
    <>
      <div className="block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                {selectedFolder.space !== 'compose' ? (
                  <div className="h-full px-4 py-6">
                    {selectedFolder.space !== 'compose' ? (
                      <Tabs defaultValue="unread" className="h-full space-y-6">
                        <div className="space-between flex items-center px-6">
                          <TabsList>
                            <TabsTrigger value="unread" className="relative">
                              Unread
                            </TabsTrigger>
                            <TabsTrigger value="read">Read</TabsTrigger>
                          </TabsList>
                          {/* <div className="ml-auto mr-4">
                                      <Button variant='secondary' onClick={sendEmail}>
                                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                                        Compose
                                      </Button>
                                    </div> */}
                          <div className="ml-auto mr-4">
                            <Button variant='secondary' onClick={sendEmail}>
                              <PlusCircleIcon className="mr-2 h-4 w-4" />
                              Compose
                            </Button>
                          </div>
                        </div>
                        <TabsContent
                          value="unread"
                          className="border-none p-0 outline-none"
                        >
                          {selectedFolder && <EmailFolder />}
                        </TabsContent>
                        <TabsContent
                          value="read"
                          className="h-full flex-col border-none p-0 data-[state=active]:flex"
                        >
                          <ScrollArea className="h-72 w-48 rounded-md border">
                            {selectedFolder && <EmailFolder />}
                          </ScrollArea>
                        </TabsContent>
                      </Tabs>
                    ) : null}

                  </div>
                ) : <EmailFolder />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* 
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="unread" className="relative">
                          Unread
                        </TabsTrigger>
                        <TabsTrigger value="read">Read</TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button variant='secondary'>
                          <PlusCircleIcon className="mr-2 h-4 w-4" />
                          Compose
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="unread"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Listen Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            something
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Made for You
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your personal playlists. Updated daily.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            something
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="read"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <EmailTable />
                      <Separator className="my-4" />

                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
*/