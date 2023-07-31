'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SwatchIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { ColorResult, TwitterPicker } from "react-color";
import * as z from 'zod';
import { defaultLabelColors } from "@/lib/utils";

const formSchema = z.object({
  newLabel: z.string().min(3, {
    message: 'Label must be at least 3 characters.',
  }).max(10, {
    message: 'Label can be max 10 characters.',
  }),
});

export function LabelSwatch() {
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newLabel: '',
    },
  });

  const { handleSubmit, register, formState: { errors } } = form;

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle saving the new label to your database here
    // The label name is stored in `values.newLabel`
    // The selected color is stored in `selectedColor`
    console.log('Label Name: ', values.newLabel);
    console.log('Selected Color: ', selectedColor);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground ml-4 bg-blue-100 px-2 py-2">
          <SwatchIcon className="mr-2 h-4 w-4" />
          Add Label
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full h-[300px] space-y-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
            <FormItem>
              <FormLabel>New Label</FormLabel>
              <FormControl>
                <Input placeholder="Label Name" {...register('newLabel')} />
              </FormControl>
              {errors.newLabel && (
                <FormMessage>{errors.newLabel.message}</FormMessage>
              )}
              <FormDescription>
                Give your label a name and choose a color
              </FormDescription>
            </FormItem>
            <TwitterPicker triangle="hide" color={selectedColor} colors={defaultLabelColors} onChange={handleColorChange} />
            <Button type='submit'>Add</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};