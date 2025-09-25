"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const policySchema = z
  .object({
    approvalMode: z.boolean(),
    allowPatientCancellation: z.boolean(),
    cancellationCutoffHours: z.coerce.number().min(0, { message: "Cut-off hours cannot be negative." }).optional(),
    allowPatientReschedule: z.boolean(),
    rescheduleCutoffHours: z.coerce.number().min(0, { message: "Cut-off hours cannot be negative." }).optional(),
    dailyLimit: z.coerce.number().min(0, { message: "Daily limit cannot be negative." }),
  })
  .superRefine((data, ctx) => {
    if (data.allowPatientCancellation && data.cancellationCutoffHours === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cancellation cut-off hours are required if patient cancellation is allowed.",
        path: ["cancellationCutoffHours"],
      })
    }
    if (data.allowPatientReschedule && data.rescheduleCutoffHours === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Reschedule cut-off hours are required if patient reschedule is allowed.",
        path: ["rescheduleCutoffHours"],
      })
    }
  })

type PolicyFormValues = z.infer<typeof policySchema>

export function PolicySettings() {
  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      approvalMode: false, // Instant confirmation
      allowPatientCancellation: true,
      cancellationCutoffHours: 24,
      allowPatientReschedule: true,
      rescheduleCutoffHours: 48,
      dailyLimit: 10,
    },
  })

  function onSubmit(values: PolicyFormValues) {
    console.log("[v0] Policy settings saved:", values)
    // Here you would typically send data to a backend API
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Policy Settings</CardTitle>
        <CardDescription>Define your booking, cancellation, and rescheduling policies.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="approvalMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Approval Mode</FormLabel>
                    <FormDescription>Instant confirmation vs. require doctor approval for bookings.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} aria-label="Toggle approval mode" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allowPatientCancellation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Patient Cancellation</FormLabel>
                    <FormDescription>Allow patients to cancel their own appointments.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Toggle patient cancellation"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("allowPatientCancellation") && (
              <FormField
                control={form.control}
                name="cancellationCutoffHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cancellation Cut-off (hours before appointment)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Patients can cancel up to this many hours before the appointment.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="allowPatientReschedule"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Patient Reschedule</FormLabel>
                    <FormDescription>Allow patients to reschedule their own appointments.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Toggle patient reschedule"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("allowPatientReschedule") && (
              <FormField
                control={form.control}
                name="rescheduleCutoffHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reschedule Cut-off (hours before appointment)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Patients can reschedule up to this many hours before the appointment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="dailyLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Booking Limit</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>Maximum number of patient bookings allowed per day.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Policies
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
