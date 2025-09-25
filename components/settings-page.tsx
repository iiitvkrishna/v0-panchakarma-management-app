import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Palette, Lock, Info } from "lucide-react"

interface SettingsPageProps {
  onNavigate: (page: string) => void
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Settings</h1>
          <p className="text-muted-foreground text-pretty">
            Manage your account, preferences, and application settings.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your personal information and professional details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Dr. Ayurveda Sharma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="dr.sharma@panchakarma.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input id="specialty" defaultValue="Ayurvedic Practitioner" />
            </div>
            <Button>Save Profile</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-600" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Configure how you receive alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-notifications">In-App Notifications</Label>
              <Switch id="app-notifications" defaultChecked />
            </div>
            <Button>Save Notifications</Button>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-blue-600" />
              Theme Settings
            </CardTitle>
            <CardDescription>Customize the look and feel of your application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Application Theme</Label>
              <Select defaultValue="system">
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Apply Theme</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-600" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security and privacy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline" className="text-destructive hover:bg-destructive/10 bg-transparent">
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              About
            </CardTitle>
            <CardDescription>Information about the Panchakarma Management System.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <strong>Version:</strong> 1.0.0
            </p>
            <p className="text-sm">
              <strong>Developed by:</strong> v0.dev
            </p>
            <p className="text-sm text-muted-foreground">
              This application is designed to streamline the management of Panchakarma treatments and patient care.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
