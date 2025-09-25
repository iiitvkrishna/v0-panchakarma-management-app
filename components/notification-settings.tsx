"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const notificationSchema = z
  .object({
    emailConfirmation: z.boolean(),
    emailReminder: z.boolean(),
    emailFollowUp: z.boolean(),
    sendgridApiKey: z.string().optional(),
    smsReminders: z.boolean(),
    googleCalendarSync: z.boolean(),
    zoomAutoLink: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if ((data.emailConfirmation || data.emailReminder || data.emailFollowUp) && !data.sendgridApiKey) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SendGrid API Key is required for email notifications.",
        path: ["sendgridApiKey"],
      })
    }
  })

type NotificationFormValues = z.infer<typeof notificationSchema>

export function NotificationSettings() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailConfirmation: true,
      emailReminder: true,
      emailFollowUp: true,
      sendgridApiKey: "",
      smsReminders: false,
      googleCalendarSync: false,
      zoomAutoLink: false,
    },
  })

  function onSubmit(values: NotificationFormValues) {
    console.log("[v0] Notification settings saved:", values)
    // Here you would typically send data to a backend API
  }

  const anyEmailNotificationsEnabled =
    form.watch("emailConfirmation") || form.watch("emailReminder") || form.watch("emailFollowUp")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Notification Settings</CardTitle>
        <CardDescription>Configure how you and your patients receive notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Email Notifications</h3>
              <FormField
                control={form.control}
                name="emailConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Confirmation Email</FormLabel>
                      <FormDescription>Send an email to patients upon successful booking.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Toggle email confirmation"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailReminder"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Reminder Email (24h before)</FormLabel>
                      <FormDescription>
                        Send a reminder email to patients 24 hours before their appointment.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Toggle email reminder"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailFollowUp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Follow-up Email (24h after)</FormLabel>
                      <FormDescription>
                        Send a follow-up email to patients 24 hours after their appointment.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Toggle email follow-up"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {anyEmailNotificationsEnabled && (
                <FormField
                  control={form.control}
                  name="sendgridApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SendGrid API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="SG.xxxxxxxxxxxxxxxxxxxx" {...field} />
                      </FormControl>
                      <FormDescription>Required for sending email notifications.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Integrations</h3>
              <FormField
                control={form.control}
                name="smsReminders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">SMS Reminders</FormLabel>
                      <FormDescription>Enable SMS reminders for appointments (placeholder).</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Toggle SMS reminders"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="googleCalendarSync"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Google Calendar 2-way Sync</FormLabel>
                      <FormDescription>
                        Automatically sync appointments with your Google Calendar (placeholder).
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Toggle Google Calendar sync"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zoomAutoLink"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Zoom Auto-link Generation</FormLabel>
                      <FormDescription>Automatically generate Zoom meeting links for appointments.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Toggle Zoom auto-link generation"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Notifications
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
