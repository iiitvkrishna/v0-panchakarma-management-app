"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  clinicName: z.string().min(2, { message: "Clinic name must be at least 2 characters." }),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  timezone: z.string().min(1, { message: "Please select a timezone." }),
  currency: z.string().min(1, { message: "Please select a currency." }),
  language: z.string().min(1, { message: "Please select a language." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional().or(z.literal("")),
})

type ProfileFormValues = z.infer<typeof profileSchema>

// Mock data for select options
const timezones = [
  { value: "America/New_York", label: "Eastern Time (US & Canada)" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
  { value: "Europe/London", label: "London (GMT)" },
]

const currencies = [
  { value: "USD", label: "USD - United States Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
]

const languages = [
  { value: "en", label: "English" },
  // { value: "es", label: "Spanish" }, // EN only as per spec
]

export function DoctorProfileSettings() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Dr. Jane Doe",
      title: "Ayurvedic Practitioner",
      clinicName: "Panchakarma Wellness Center",
      avatarUrl: "/doctor-avatar.png",
      timezone: "America/New_York",
      currency: "USD",
      language: "en",
      bio: "Experienced Ayurvedic practitioner specializing in Panchakarma treatments and holistic wellness.",
    },
  })

  function onSubmit(values: ProfileFormValues) {
    console.log("[v0] Profile settings saved:", values)
    // Here you would typically send data to a backend API
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Profile Settings</CardTitle>
        <CardDescription>Manage your personal and clinic information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={form.watch("avatarUrl") || "/placeholder.svg"} alt="Doctor Avatar" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/avatar.jpg" {...field} />
                    </FormControl>
                    <FormDescription>Link to your professional profile picture.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Jane Doe" {...field} />
                  </FormControl>
                  <FormDescription>Your full name as it will appear to patients.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Ayurvedic Practitioner" {...field} />
                  </FormControl>
                  <FormDescription>Your professional title or specialization.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clinicName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Panchakarma Wellness Center" {...field} />
                  </FormControl>
                  <FormDescription>The name of your clinic or practice.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Experienced Ayurvedic practitioner..." className="resize-y" {...field} />
                  </FormControl>
                  <FormDescription>A brief description about yourself for patients.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Your local timezone for appointment scheduling.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.value} value={curr.value}>
                          {curr.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The currency for your services.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The primary language for your communications.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
