import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoctorProfileSettings } from "@/components/doctor-profile-settings"
import { WorkingHoursSettings } from "@/components/working-hours-settings"
import { AvailabilitySettings } from "@/components/availability-settings"
import { PolicySettings } from "@/components/policy-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { AdvancedSettings } from "@/components/advanced-settings"

export default function DoctorSettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Doctor Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="working-hours">Working Hours</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <DoctorProfileSettings />
        </TabsContent>
        <TabsContent value="working-hours" className="mt-6">
          <WorkingHoursSettings />
        </TabsContent>
        <TabsContent value="availability" className="mt-6">
          <AvailabilitySettings />
        </TabsContent>
        <TabsContent value="policies" className="mt-6">
          <PolicySettings />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="advanced" className="mt-6">
          <AdvancedSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
