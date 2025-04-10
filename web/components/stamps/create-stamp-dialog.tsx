'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { createStampFormSchema, CreateStampFormValues } from "@/types/form"
import { ImageUpload } from "@/components/ui/image-upload"
import { Checkbox } from "@/components/ui/checkbox"

interface CreateStampDialogProps {
  handleCreateStamp: (values: CreateStampFormValues) => void;
}

export function CreateStampDialog({ handleCreateStamp }: CreateStampDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateStampFormValues>({
    resolver: zodResolver(createStampFormSchema),
    defaultValues: {
      name: "",
      description: "",
      point: "",
      image: "",
      claimCode: "",
      startDate: undefined,
      endDate: undefined,
      totalCountLimit: 0,
      userCountLimit: 1,
      publicClaim: false
    },
  })

  const publicClaim = form.watch("publicClaim")

  const onSubmit = async (values: CreateStampFormValues) => {
    const finalValues = {
      ...values,
      claimCode: values.publicClaim ? "00000" : values.claimCode
    }
    handleCreateStamp(finalValues);
    setIsOpen(false)
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full text-sm px-4 py-2 lg:text-base">Create new Stamp</Button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="sm:max-w-[425px] flex flex-col p-0 max-h-svh">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-4xl font-bold text-left">Create Stamp</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center space-y-4">
                    <FormControl>
                      <div className="flex flex-col items-center gap-4">
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          disabled={form.formState.isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="point"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Point*</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publicClaim"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Public Claim</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="claimCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Claim Code {!publicClaim && "(optional)"}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={publicClaim ? "00000" : "Claim Code"} 
                        {...field} 
                        disabled={publicClaim}
                        value={publicClaim ? "00000" : field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date (optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value ? field.value.toString() : ''}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (optional)</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} value={field.value ? field.value.toString() : ''}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="totalCountLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Count Limit (optional, 0 is unlimited)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(Number(e.target.value))}
                          placeholder="unlimited"
                          value={field.value === 0 ? '' : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />  
                {/* <FormField
                  control={form.control}
                  name="userCountLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Count Limit</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(Number(e.target.value))}
                          placeholder="default is 1" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
            </form>
          </Form>
        </div>
        <div className="bottom-0 border-t bg-card border border-border px-6 py-4 mt-auto">
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setIsOpen(false)
                form.reset()
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full"
              onClick={form.handleSubmit(onSubmit)}
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 