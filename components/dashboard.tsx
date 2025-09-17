import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, TrendingUp, Clock, Plus, Leaf, Heart, AlertCircle, CheckCircle, Star } from "lucide-react"

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Welcome back, Dr. Sharma</h1>
          <p className="text-muted-foreground text-pretty">Here's what's happening with your practice today</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Patient
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
        <CardContent className="flex items-center gap-3 p-4">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Reminder: Monthly inventory check due in 3 days
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Review herbal medicine stock and treatment supplies
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent"
          >
            Review Now
          </Button>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12%</span> from last month
            </p>
            <Progress value={75} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+8%</span> from last week
            </p>
            <Progress value={60} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Next appointment in <span className="text-primary">2 hours</span>
            </p>
            <Progress value={37.5} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+2%</span> improvement
            </p>
            <Progress value={94} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Patients */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Patients
                </CardTitle>
                <CardDescription>Latest patient registrations and updates</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Priya Sharma",
                condition: "Stress Management",
                status: "Active",
                time: "2 hours ago",
                priority: "high",
              },
              {
                name: "Raj Patel",
                condition: "Digestive Issues",
                status: "Consultation",
                time: "4 hours ago",
                priority: "medium",
              },
              { name: "Anita Kumar", condition: "Joint Pain", status: "Treatment", time: "1 day ago", priority: "low" },
              {
                name: "Vikram Singh",
                condition: "Sleep Disorders",
                status: "Follow-up",
                time: "2 days ago",
                priority: "medium",
              },
            ].map((patient, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <Badge
                      variant={patient.status === "Active" ? "default" : "secondary"}
                      className={patient.priority === "high" ? "border-red-200 bg-red-50 text-red-700" : ""}
                    >
                      {patient.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{patient.time}</p>
                  </div>
                  {patient.priority === "high" && <AlertCircle className="h-4 w-4 text-red-500" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                time: "09:00 AM",
                patient: "Meera Joshi",
                treatment: "Abhyanga",
                duration: "60 min",
                status: "confirmed",
              },
              {
                time: "10:30 AM",
                patient: "Arjun Reddy",
                treatment: "Shirodhara",
                duration: "45 min",
                status: "confirmed",
              },
              {
                time: "12:00 PM",
                patient: "Kavya Nair",
                treatment: "Consultation",
                duration: "30 min",
                status: "pending",
              },
              {
                time: "02:00 PM",
                patient: "Rohit Gupta",
                treatment: "Panchakarma",
                duration: "90 min",
                status: "confirmed",
              },
            ].map((appointment, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    {appointment.status === "confirmed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div className="w-px h-6 bg-border last:hidden"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{appointment.time}</p>
                    <Badge variant="outline" className="text-xs">
                      {appointment.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{appointment.patient}</p>
                  <p className="text-xs text-muted-foreground">{appointment.treatment}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Treatment Overview and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Treatment Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Treatment Overview
            </CardTitle>
            <CardDescription>Current treatment distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { treatment: "Panchakarma Detox", count: 15, percentage: 35, color: "bg-primary" },
              { treatment: "Abhyanga Massage", count: 12, percentage: 28, color: "bg-secondary" },
              { treatment: "Shirodhara", count: 8, percentage: 19, color: "bg-accent" },
              { treatment: "Consultation", count: 8, percentage: 18, color: "bg-muted-foreground" },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.treatment}</span>
                  <span className="text-muted-foreground">{item.count} patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button variant="outline" className="h-16 flex items-center justify-start gap-3 bg-transparent">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Add New Patient</p>
                  <p className="text-xs text-muted-foreground">Register a new patient</p>
                </div>
              </Button>
              <Button variant="outline" className="h-16 flex items-center justify-start gap-3 bg-transparent">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Schedule Appointment</p>
                  <p className="text-xs text-muted-foreground">Book a new session</p>
                </div>
              </Button>
              <Button variant="outline" className="h-16 flex items-center justify-start gap-3 bg-transparent">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Create Treatment Plan</p>
                  <p className="text-xs text-muted-foreground">Design therapy program</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Practice Performance
          </CardTitle>
          <CardDescription>Key metrics for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">4.9</div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-secondary">98%</div>
              <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
              <Progress value={98} className="mt-2 h-1" />
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-accent">₹2.4L</div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="text-xs text-green-600 mt-1">+15% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
