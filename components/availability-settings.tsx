"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

const availabilitySchema = z.object({
  slotLength: z.string().min(1, { message: "Please select a slot length." }),
  bufferTime: z.coerce.number().min(0, { message: "Buffer time cannot be negative." }),
  leadTimeMinHours: z.coerce.number().min(0, { message: "Minimum lead time cannot be negative." }),
  leadTimeMaxDays: z.coerce.number().min(0, { message: "Maximum lead time cannot be negative." }),
  blackoutDates: z.array(z.date()).optional(),
})

type AvailabilityFormValues = z.infer<typeof availabilitySchema>

const slotLengths = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
]

export function AvailabilitySettings() {
  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      slotLength: "30",
      bufferTime: 15,
      leadTimeMinHours: 12,
      leadTimeMaxDays: 90,
      blackoutDates: [],
    },
  })

  const [selectedDates, setSelectedDates] = useState<Date[]>(form.getValues("blackoutDates") || [])

  function onSubmit(values: AvailabilityFormValues) {
    console.log("[v0] Availability settings saved:", { ...values, blackoutDates: selectedDates })
    // Here you would typically send data to a backend API
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Availability Settings</CardTitle>
        <CardDescription>Configure your appointment slots and blackout periods.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="slotLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slot Length</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select slot length" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {slotLengths.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Duration of each appointment slot.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bufferTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buffer Time (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>Minutes before and after each appointment.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leadTimeMinHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Lead Time (hours ahead)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>Minimum hours ahead a patient can book an appointment.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leadTimeMaxDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Lead Time (days ahead)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>Maximum days ahead a patient can book an appointment.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Black-out Dates</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !selectedDates.length && "text-muted-foreground",
                      )}
                    >
                      {selectedDates.length > 0 ? (
                        selectedDates.length === 1 ? (
                          format(selectedDates[0], "PPP")
                        ) : (
                          `${selectedDates.length} dates selected`
                        )
                      ) : (
                        <span>Pick dates to block</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => {
                      setSelectedDates(dates || [])
                      form.setValue("blackoutDates", dates || [])
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select entire days to disable for bookings.</FormDescription>
              <FormMessage />
            </FormItem>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Availability
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
