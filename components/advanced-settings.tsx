"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const advancedSchema = z.object({
  recaptchaEnabled: z.boolean(),
  customCss: z.string().optional(),
})

type AdvancedFormValues = z.infer<typeof advancedSchema>

export function AdvancedSettings() {
  const form = useForm<AdvancedFormValues>({
    resolver: zodResolver(advancedSchema),
    defaultValues: {
      recaptchaEnabled: false,
      customCss: "",
    },
  })

  function onSubmit(values: AdvancedFormValues) {
    console.log("[v0] Advanced settings saved:", values)
    // Here you would typically send data to a backend API
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Advanced Settings</CardTitle>
        <CardDescription>Configure advanced features and custom styling.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="recaptchaEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">reCAPTCHA v3</FormLabel>
                    <FormDescription>Enable Google reCAPTCHA v3 for spam protection.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} aria-label="Toggle reCAPTCHA" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customCss"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom CSS Injection</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="/* Add your custom CSS here */"
                      className="min-h-[150px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Inject custom CSS to override default styles. Be careful, invalid CSS may break your site.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Advanced Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
