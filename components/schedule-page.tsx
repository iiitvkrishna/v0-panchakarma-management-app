"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Mock appointment data
const appointments = [
  {
    id: 1,
    time: "09:00 AM",
    duration: 60,
    patient: "Priya Sharma",
    phone: "+91 98765 43210",
    treatment: "Abhyanga Massage",
    practitioner: "Dr. Ayurveda Sharma",
    status: "confirmed",
    notes: "First session of Panchakarma program",
    room: "Treatment Room 1",
  },
  {
    id: 2,
    time: "10:30 AM",
    duration: 45,
    patient: "Arjun Reddy",
    phone: "+91 87654 32109",
    treatment: "Shirodhara",
    practitioner: "Dr. Ayurveda Sharma",
    status: "confirmed",
    notes: "Stress relief therapy",
    room: "Treatment Room 2",
  },
  {
    id: 3,
    time: "12:00 PM",
    duration: 30,
    patient: "Kavya Nair",
    phone: "+91 76543 21098",
    treatment: "Consultation",
    practitioner: "Dr. Ayurveda Sharma",
    status: "pending",
    notes: "Initial assessment for digestive issues",
    room: "Consultation Room",
  },
  {
    id: 4,
    time: "02:00 PM",
    duration: 90,
    patient: "Rohit Gupta",
    phone: "+91 65432 10987",
    treatment: "Panchakarma Prep",
    practitioner: "Dr. Ayurveda Sharma",
    status: "confirmed",
    notes: "Pre-treatment preparation and assessment",
    room: "Treatment Room 1",
  },
  {
    id: 5,
    time: "04:00 PM",
    duration: 60,
    patient: "Meera Joshi",
    phone: "+91 54321 09876",
    treatment: "Abhyanga",
    practitioner: "Dr. Ayurveda Sharma",
    status: "completed",
    notes: "Regular maintenance therapy",
    room: "Treatment Room 2",
  },
]

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
]

export function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("day")
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setSelectedDate(newDate)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Schedule Management</h1>
          <p className="text-muted-foreground text-pretty">Manage appointments and treatment schedules</p>
        </div>
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
              <DialogDescription>Schedule a new appointment for a patient.</DialogDescription>
            </DialogHeader>
            <BookingForm onClose={() => setIsBookingOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-lg font-semibold">{formatDate(selectedDate)}</h2>
                <p className="text-sm text-muted-foreground">{appointments.length} appointments scheduled</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day View</SelectItem>
                  <SelectItem value="week">Week View</SelectItem>
                  <SelectItem value="month">Month View</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                Today
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Today's Appointments</span>
            </div>
            <div className="text-2xl font-bold mt-2">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Confirmed</span>
            </div>
            <div className="text-2xl font-bold mt-2">6</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <div className="text-2xl font-bold mt-2">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Available Slots</span>
            </div>
            <div className="text-2xl font-bold mt-2">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule View */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-4">
        <TabsList className="hidden">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Schedule</CardTitle>
              <CardDescription>Appointments for {formatDate(selectedDate)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Week view coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Weekly calendar view will be available soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Schedule</CardTitle>
              <CardDescription>Month view coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Monthly calendar view will be available soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Available Time Slots</CardTitle>
          <CardDescription>Click on a time slot to book an appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-6">
            {timeSlots.map((slot) => {
              const isBooked = appointments.some((apt) => apt.time === slot)
              return (
                <Button
                  key={slot}
                  variant={isBooked ? "secondary" : "outline"}
                  size="sm"
                  className={`justify-center ${isBooked ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground"}`}
                  disabled={isBooked}
                  onClick={() => !isBooked && setIsBookingOpen(true)}
                >
                  {slot}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AppointmentCard({ appointment }: { appointment: any }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200"
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{appointment.time}</div>
              <div className="text-xs text-muted-foreground">{appointment.duration} min</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{appointment.patient}</h3>
                <Badge className={getStatusColor(appointment.status)}>
                  {getStatusIcon(appointment.status)}
                  <span className="ml-1">{appointment.status}</span>
                </Badge>
              </div>
              <p className="text-sm text-primary font-medium">{appointment.treatment}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {appointment.practitioner}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {appointment.room}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {appointment.phone}
                </span>
              </div>
              {appointment.notes && <p className="text-xs text-muted-foreground mt-2">{appointment.notes}</p>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BookingForm({ onClose }: { onClose: () => void }) {
  return (
    <Tabs defaultValue="patient" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="patient">Patient</TabsTrigger>
        <TabsTrigger value="appointment">Appointment</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>

      <TabsContent value="patient" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="patient">Select Patient *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priya">Priya Sharma</SelectItem>
              <SelectItem value="raj">Raj Patel</SelectItem>
              <SelectItem value="anita">Anita Kumar</SelectItem>
              <SelectItem value="vikram">Vikram Singh</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPatient">Or add new patient</Label>
          <div className="grid gap-2 md:grid-cols-2">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </div>
          <Input placeholder="Phone Number" />
          <Input placeholder="Email Address" />
        </div>
      </TabsContent>

      <TabsContent value="appointment" className="space-y-4 mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input id="date" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="treatment">Treatment *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select treatment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="abhyanga">Abhyanga Massage</SelectItem>
              <SelectItem value="shirodhara">Shirodhara</SelectItem>
              <SelectItem value="swedana">Swedana</SelectItem>
              <SelectItem value="virechana">Virechana</SelectItem>
              <SelectItem value="basti">Basti</SelectItem>
              <SelectItem value="nasya">Nasya</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="room">Treatment Room</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="room1">Treatment Room 1</SelectItem>
                <SelectItem value="room2">Treatment Room 2</SelectItem>
                <SelectItem value="consultation">Consultation Room</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="details" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="practitioner">Practitioner</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select practitioner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dr-sharma">Dr. Ayurveda Sharma</SelectItem>
              <SelectItem value="dr-patel">Dr. Wellness Patel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Appointment Notes</Label>
          <Textarea id="notes" placeholder="Any special instructions or notes for this appointment" rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending Confirmation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reminders">Send Reminders</Label>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="sms" className="rounded" />
            <Label htmlFor="sms" className="text-sm">
              SMS Reminder (24 hours before)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="email" className="rounded" />
            <Label htmlFor="email" className="text-sm">
              Email Reminder (2 hours before)
            </Label>
          </div>
        </div>
      </TabsContent>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Book Appointment</Button>
      </div>
    </Tabs>
  )
}
