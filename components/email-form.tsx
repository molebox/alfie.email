import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from "zod"
import { ZodTypeAny } from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface FormInputs extends FieldValues {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  message: string;
}

const email = z.string().email({ message: 'Invalid email address.' });

const formSchema = z.object({
  to: z.array(email).min(1, { message: 'At least one recipient is required in "To" field.' }),
  cc: z.array(email).optional(),
  bcc: z.array(email).optional(),
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
  message: z.string().min(1, { message: 'Message field cannot be empty.' }),
});

export function EmailForm() {
  const form = useForm<FormInputs>({
    resolver: zodResolver<ZodTypeAny>(formSchema),
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
    // Here you would normally handle the form submission, e.g., send the email
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 my-4">
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs'>To</FormLabel>
              <FormControl>
                <Input placeholder="recipient@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex w-full'>
          <FormField
            control={form.control}
            name="cc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Cc</FormLabel>
                <FormControl>
                  <Input placeholder="cc@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bcc"
            render={({ field }) => (
              <FormItem className='ml-4'>
                <FormLabel className='text-xs'>Bcc</FormLabel>
                <FormControl>
                  <Input placeholder="bcc@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel className='text-xs'>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
