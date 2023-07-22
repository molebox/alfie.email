'use client'

import { capitalizeFirstLetter, cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { HeartIcon, ExclamationTriangleIcon, BuildingLibraryIcon, BriefcaseIcon, UserGroupIcon, GlobeEuropeAfricaIcon, ShoppingBagIcon, PlusCircleIcon, PencilIcon } from "@heroicons/react/24/outline"
import { Separator } from "./ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { RefObject, useEffect, useRef, useState } from "react"
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



interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const formSchema = z.object({
  newFolder: z.string().min(3, {
    message: "Folder must be at least 3 characters."
  }).max(50, {
    message: "Folder can be max 50 characters."
  })
});



export function Sidebar({ className }: SidebarProps) {
  const [folders, setFolders] = useState<string[]>([]);
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newFolder: '',
    },
  })

  const { handleSubmit, register, formState: { errors } } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFolders([...folders, capitalizeFirstLetter(values.newFolder)]);
    form.reset({ newFolder: '' });
  }

  function removeFolder(folderToRemove: string) {
    setFolders(folders.filter(folder => folder !== folderToRemove));
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
    <div className={cn("pb-12 bg-slate-50 min-h-screen", className)}>
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
            <Button variant="secondary" className="w-full justify-start">
              <BuildingLibraryIcon className="mr-2 h-4 w-4" />
              Standard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HeartIcon className="mr-2 h-4 w-4" />
              Favorites
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ExclamationTriangleIcon className="mr-2 h-4 w-4" />
              Important
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              Work
            </Button>
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
            <Button variant="ghost" className="w-full justify-start">
              <UserGroupIcon className="mr-2 h-4 w-4" />
              Family
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <GlobeEuropeAfricaIcon className="mr-2 h-4 w-4" />
              Travel
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingBagIcon className="mr-2 h-4 w-4" />
              Shopping
            </Button>
            <div className="space-y-1">
              {folders.map(folder => (
                <Button key={folder} variant="ghost" className="w-full justify-start">
                  <PencilIcon className="mr-2 h-4 w-4" />
                  {folder}
                  <MinusCircleIcon
                    className="ml-auto h-4 w-4 hover:text-red-300"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering the Button's onClick 
                      removeFolder(folder);
                    }}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}