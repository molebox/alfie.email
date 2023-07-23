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
import { useForm, UseFormReturn } from "react-hook-form"
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
import { FolderType, defaultFolders, useFolderContext, userFolders } from "@/lib/context"



interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}


export function Sidebar({ className }: SidebarProps) {
  const [folders, setFolders] = useState<FolderType[]>(userFolders);
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
  const { selectedFolder, setSelectedFolder } = useFolderContext();

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
    setFolders([...folders, newFolder]);
    form.reset({ newFolder: '' });
  }

  function removeFolder(folderToRemove: string) {
    // If the folder to remove is the currently selected one, switch to "Standard"
    if (selectedFolder?.space === folderToRemove) {
      const standardUnreadEmails = selectedFolder.unreadEmails; // fetch or retrieve the current 'unreadEmails' for 'Standard'
      setSelectedFolder({ name: 'Standard', space: 'standard', unreadEmails: standardUnreadEmails });
    }

    // Filter out the removed folder from the folders list
    setFolders(folders.filter(folder => folder.space !== folderToRemove));
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
              <AvatarImage src="https://github.com/molebox.png" alt="@molebox" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm pl-3">Rich Haines</span>
          </div>
          <Separator className="my-4" />
          <h2 className="mb-2 px-4 text-lg font-light tracking-tight text-slate-500">
            Inboxes
          </h2>
          <div className="space-y-1">
            {defaultFolders.map(folder => (
              <Button key={folder.space} variant="ghost" className="w-full justify-start" onClick={() => setSelectedFolder({ name: folder.name, space: folder.name.toLocaleLowerCase(), unreadEmails: folder.unreadEmails })}>
                {folder.icon}
                {folder.name}
                {folder.unreadEmails !== 0 ? <Badge variant='outline' className="ml-auto bg-red-100 border-slate-600">{folder.unreadEmails}</Badge> : null}
              </Button>
            ))}
            {/* <Button variant="secondary" className="w-full justify-start" onClick={() => setSelectedFolder('Standard')}>
              <BuildingLibraryIcon className="mr-2 h-4 w-4" />
              Standard
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedFolder('Favorites')}>
              <HeartIcon className="mr-2 h-4 w-4" />
              Favorites
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedFolder('Important')}>
              <ExclamationTriangleIcon className="mr-2 h-4 w-4" />
              Important
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedFolder('Work')}>
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              Work
            </Button> */}
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
              {folders.map(folder => (
                <Button key={folder.space} variant="ghost" className="w-full justify-start" onClick={() => setSelectedFolder({ name: folder.name, space: folder.name.toLocaleLowerCase(), unreadEmails: folder.unreadEmails })}>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}