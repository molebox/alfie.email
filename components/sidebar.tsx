'use client'

import { capitalizeFirstLetter, cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { HeartIcon, ExclamationTriangleIcon, BuildingLibraryIcon, BriefcaseIcon, UserGroupIcon, GlobeEuropeAfricaIcon, ShoppingBagIcon, PlusCircleIcon, BookmarkIcon } from "@heroicons/react/24/outline"
import { Separator } from "./ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { RefObject, useEffect, useRef, useState, ReactNode, useMemo } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm, UseFormReturn } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { MinusCircleIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { FolderType, useFolderContext, defaultFolders as defaultFoldersData } from "@/lib/context"
import { SignIn, currentUser, useUser, UserButton } from "@clerk/nextjs";
import { getEmails } from "@/lib/server-actions"
import Link from "next/link"
import { usePathname } from 'next/navigation'


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { userFolders, addUserFolder, removeUserFolder, setUserFolders } = useFolderContext();
  const [folders, setFolders] = useState<FolderType[]>(userFolders);
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
  const { selectedFolder, setSelectedFolder } = useFolderContext();
  const { isLoaded, isSignedIn, user } = useUser()
  const [defaultFolders, setDefaultFolders] = useState<FolderType[]>(defaultFoldersData);
  const pathname = usePathname()

  useEffect(() => {
    async function fetchEmails() {
      const result = await getEmails(selectedFolder?.space!);

      // Use the already provided defaultFolders and userFolders, which should include all folders
      const defaultFoldersToUpdate = [...defaultFolders];
      const userFoldersToUpdate = [...userFolders];

      defaultFoldersToUpdate.forEach(folder => {
        const emailsInFolder = result.filter(email => email.folder.toLowerCase() === folder.space.toLowerCase());
        const unreadEmailsInFolder = emailsInFolder.filter(email => email.read === false).length;
        folder.unreadEmails = unreadEmailsInFolder;
      });

      userFoldersToUpdate.forEach(folder => {
        const emailsInFolder = result.filter(email => email.folder.toLowerCase() === folder.space.toLowerCase());
        const unreadEmailsInFolder = emailsInFolder.filter(email => email.read === false).length;
        folder.unreadEmails = unreadEmailsInFolder;
      });

      // Now update the defaultFolders and userFolders with the updated folders
      setDefaultFolders(defaultFoldersToUpdate);
      setUserFolders(userFoldersToUpdate);
    }

    fetchEmails();
  }, []);

  if (!user) return <SignIn afterSignInUrl='/standard' appearance={{ variables: { colorPrimary: "#000" } }} />;

  const formSchema = useMemo(() => z.object({
    newFolder: z.string().min(3, {
      message: "Folder must be at least 3 characters."
    }).max(50, {
      message: "Folder can be max 50 characters."
    }).refine(name => {
      const lowerCaseName = name.toLowerCase();
      return !folders.some(folder => folder.name.toLowerCase() === lowerCaseName);
    }, {
      message: "Folder name already exists."
    })
  }), [folders, selectedFolder?.unreadEmails]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newFolder: '',
    },
  })

  const { handleSubmit, register, formState: { errors } } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newFolder: FolderType = {
      name: capitalizeFirstLetter(values.newFolder),
      space: values.newFolder.toLowerCase().split(' ').join('-'),
      icon: <BookmarkIcon className="mr-2 h-4 w-4" />,
      deletable: true,
      unreadEmails: 0
    };
    addUserFolder(newFolder);  // Here, newFolder is a FolderType object representing the new folder being added
    form.reset({ newFolder: '' });
  }


  function removeFolder(folderToRemove: string) {
    // If the folder to remove is the currently selected one, switch to "Standard"
    if (selectedFolder?.space === folderToRemove) {
      const standardUnreadEmails = selectedFolder.unreadEmails;
      setSelectedFolder({ name: 'Standard', space: 'standard', unreadEmails: standardUnreadEmails });
    }

    // Filter out the removed folder from the folders list
    const folderObjectToRemove = userFolders.find(folder => folder.space === folderToRemove);

    if (folderObjectToRemove) {
      removeUserFolder(folderObjectToRemove);
    }
  }





  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        form.reset({ newFolder: '' });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [form]);

  return (
    <div className={cn("pb-12 bg-slate-50 min-h-screen sticky top-0", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 pb-2">
          <div className="flex items-center justify-start px-3">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.profileImageUrl} alt={user.username!} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="text-sm pl-3">{user.firstName! + ' ' + user.lastName!}</span>
          </div>
          <Separator className="my-4" />
          <h2 className="mb-2 px-4 text-lg font-light tracking-tight text-slate-500">
            Inboxes
          </h2>
          <div className="space-y-1">
            {defaultFolders.map(folder => {
              const isActive = `/${folder.space.toLowerCase()}` === pathname;
              return (
                <Link key={folder.space} href={`/${folder.space.toLowerCase()}`}>
                  <Button variant="ghost" className={`w-full justify-start ${isActive ? 'bg-slate-200' : ''} ${isActive ? 'hover:bg-slate-200' : ''}`}>
                    {folder.icon}
                    {folder.name}
                    {folder.unreadEmails !== 0 ? <Badge variant='outline' className="ml-auto bg-red-100 border-slate-600">{folder.unreadEmails}</Badge> : null}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center justify-between px-3">
            <h2 className="mb-2 text-lg font-light tracking-tight text-slate-500">
              Folders
            </h2>
            <Popover>
              <PopoverTrigger>
                <PlusCircleIcon className="h-5 w-5 mb-2" />
              </PopoverTrigger>
              <PopoverContent>
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" ref={formRef} >
                    <FormItem>
                      <FormLabel>New folder</FormLabel>
                      <FormControl>
                        <Input placeholder="Music festivals" {...register("newFolder")} />
                      </FormControl>
                      {errors.newFolder && <p className="text-xs text-red-400">{errors.newFolder.message}</p>}
                      <FormDescription>
                        Give your folder a name
                      </FormDescription>
                    </FormItem>
                    <Button type="submit">Add</Button>
                  </form>
                </Form>
              </PopoverContent>
            </Popover>

          </div>
          <div className="space-y-1">
            <div className="space-y-1">
              {userFolders.map(folder => (
                <Link key={folder.space} href={`/${folder.space.toLowerCase()}`}>
                  <Button variant="ghost" className="w-full justify-start">
                    {folder.icon}
                    {folder.name}
                    {folder.unreadEmails !== 0 ? <Badge variant='outline' className="ml-auto bg-red-100 border-slate-600">{folder.unreadEmails}</Badge> : null}
                    {folder.deletable &&
                      <MinusCircleIcon
                        className="ml-auto h-4 w-4 hover:text-red-300"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents triggering the Button's onClick 
                          removeFolder(folder.space);
                        }}
                      />
                    }
                  </Button>
                </Link>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}