"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, UploadCloudIcon } from "lucide-react"
import { useRef, useState } from "react"

interface BookingFormProps {
  selectedDate: Date
  selectedTimeSlot: string
  onSubmit: (data: any) => void
  onBack: () => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"]

const bookingFormSchema = z.object({
  patientName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  patientEmail: z.string().email({ message: "Please enter a valid email address." }),
  patientPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number." }),
  patientDob: z.date({ required_error: "Date of birth is required." }),
  reasonForVisit: z
    .string()
    .min(10, { message: "Please describe your reason for visit (at least 10 characters)." })
    .max(500, { message: "Reason for visit must not exceed 500 characters." }),
  insuranceCard: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, .webp, and .pdf formats are supported.",
    )
    .optional(),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

export function BookingForm({ selectedDate, selectedTimeSlot, onSubmit, onBack }: BookingFormProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      reasonForVisit: "",
    },
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue("insuranceCard", file)
      setFileName(file.name)
    } else {
      form.setValue("insuranceCard", undefined)
      setFileName(null)
    }
  }

  const handleSubmit = (values: BookingFormValues) => {
    onSubmit(values)
  }

  return (
    <Card className="bg-card text-card-foreground shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Book Your Appointment</CardTitle>
        <Button variant="outline" onClick={onBack} aria-label="Go back to time slot selection">
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <p className="text-lg font-medium text-muted-foreground">
              Appointment on {format(selectedDate, "PPP")} at {selectedTimeSlot}
            </p>
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+15551234567" {...field} />
                  </FormControl>
                  <FormDescription>Include country code, e.g., +1234567890.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientDob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Your date of birth for record keeping.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reasonForVisit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Visit</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your symptoms or reason for booking..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide a brief description of why you are booking this appointment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insuranceCard"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Optional: Upload Insurance Card</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2"
                      >
                        <UploadCloudIcon className="h-4 w-4" />
                        <span>{fileName || "Choose File"}</span>
                      </Button>
                      {fileName && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            form.setValue("insuranceCard", undefined)
                            setFileName(null)
                            if (fileInputRef.current) {
                              fileInputRef.current.value = ""
                            }
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>Max 5MB. Accepted formats: JPG, PNG, PDF.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Confirm Booking
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
