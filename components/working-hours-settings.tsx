"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/ // HH:MM format

const workingHoursSchema = z
  .object({
    days: z.array(
      z.object({
        day: z.string(),
        enabled: z.boolean(),
        startTime: z.string().regex(timeRegex, { message: "Invalid time format (HH:MM)" }).optional(),
        endTime: z.string().regex(timeRegex, { message: "Invalid time format (HH:MM)" }).optional(),
        splitShiftEnabled: z.boolean(),
        splitStartTime: z.string().regex(timeRegex, { message: "Invalid time format (HH:MM)" }).optional(),
        splitEndTime: z.string().regex(timeRegex, { message: "Invalid time format (HH:MM)" }).optional(),
      }),
    ),
  })
  .refine(
    (data) => {
      // Custom validation for start/end times if enabled
      for (const day of data.days) {
        if (day.enabled) {
          if (!day.startTime || !day.endTime) {
            return false // Must have start/end if enabled
          }
          if (day.startTime >= day.endTime) {
            return false // Start must be before end
          }
          if (day.splitShiftEnabled) {
            if (!day.splitStartTime || !day.splitEndTime) {
              return false
            }
            if (day.splitStartTime >= day.splitEndTime) {
              return false
            }
            // Ensure split shift doesn't overlap with main shift
            if (day.splitStartTime < day.endTime && day.splitEndTime > day.startTime) {
              return false
            }
          }
        }
      }
      return true
    },
    {
      message: "Invalid working hours configuration.",
      path: ["days"], // General error path
    },
  )

type WorkingHoursFormValues = z.infer<typeof workingHoursSchema>

const defaultWorkingHours = [
  {
    day: "Monday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
    splitShiftEnabled: false,
    splitStartTime: "",
    splitEndTime: "",
  },
  {
    day: "Tuesday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
    splitShiftEnabled: false,
    splitStartTime: "",
    splitEndTime: "",
  },
  {
    day: "Wednesday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
    splitShiftEnabled: false,
    splitStartTime: "",
    splitEndTime: "",
  },
  {
    day: "Thursday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
    splitShiftEnabled: false,
    splitStartTime: "",
    splitEndTime: "",
  },
  {
    day: "Friday",
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
    splitShiftEnabled: false,
    splitStartTime: "",
    splitEndTime: "",
  },
  {
    day: "Saturday",
    enabled: false,
    startTime: "",
    endTime: "",
    splitShiftEnabled: false,
    splitStartTime: "",
    splitEndTime: "",
  },
  {
    day: "Sunday",
    enabled: false,
    startTime: "",
    endTime: "",
    splitShiftEnabled: false,
    splitStartTime: "",
    splitEndTime: "",
  },
]

export function WorkingHoursSettings() {
  const form = useForm<WorkingHoursFormValues>({
    resolver: zodResolver(workingHoursSchema),
    defaultValues: {
      days: defaultWorkingHours,
    },
  })

  function onSubmit(values: WorkingHoursFormValues) {
    console.log("[v0] Working hours settings saved:", values)
    // Here you would typically send data to a backend API
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Working Hours</CardTitle>
        <CardDescription>Define your availability for each day of the week.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {form.watch("days").map((dayConfig, index) => (
              <div
                key={dayConfig.day}
                className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 p-4 border rounded-md"
              >
                <FormField
                  control={form.control}
                  name={`days.${index}.enabled`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label={`Enable ${dayConfig.day}`}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal w-24">{dayConfig.day}</FormLabel>
                    </FormItem>
                  )}
                />
                {dayConfig.enabled && (
                  <>
                    <FormField
                      control={form.control}
                      name={`days.${index}.startTime`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="sr-only">Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="mx-2 text-muted-foreground">-</span>
                    <FormField
                      control={form.control}
                      name={`days.${index}.endTime`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="sr-only">End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`days.${index}.splitShiftEnabled`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 ml-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              aria-label={`Enable split shift for ${dayConfig.day}`}
                            />
                          </FormControl>
                          <FormLabel className="text-base font-normal">Split Shift</FormLabel>
                        </FormItem>
                      )}
                    />
                    {dayConfig.splitShiftEnabled && (
                      <>
                        <FormField
                          control={form.control}
                          name={`days.${index}.splitStartTime`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="sr-only">Split Start Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <span className="mx-2 text-muted-foreground">-</span>
                        <FormField
                          control={form.control}
                          name={`days.${index}.splitEndTime`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="sr-only">Split End Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Working Hours
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
