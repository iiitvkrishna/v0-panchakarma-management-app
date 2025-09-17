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
  Search,
  Filter,
  MoreHorizontal,
  User,
  Phone,
  Calendar,
  MapPin,
  Heart,
  AlertCircle,
  Edit,
  Eye,
} from "lucide-react"

// Mock patient data
const patients = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 34,
    gender: "Female",
    phone: "+91 98765 43210",
    email: "priya.sharma@email.com",
    address: "Mumbai, Maharashtra",
    condition: "Stress Management",
    status: "Active",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-22",
    priority: "high",
    dosha: "Vata-Pitta",
  },
  {
    id: 2,
    name: "Raj Patel",
    age: 45,
    gender: "Male",
    phone: "+91 87654 32109",
    email: "raj.patel@email.com",
    address: "Ahmedabad, Gujarat",
    condition: "Digestive Issues",
    status: "Consultation",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-20",
    priority: "medium",
    dosha: "Pitta-Kapha",
  },
  {
    id: 3,
    name: "Anita Kumar",
    age: 52,
    gender: "Female",
    phone: "+91 76543 21098",
    email: "anita.kumar@email.com",
    address: "Delhi, NCR",
    condition: "Joint Pain",
    status: "Treatment",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-25",
    priority: "low",
    dosha: "Vata-Kapha",
  },
  {
    id: 4,
    name: "Vikram Singh",
    age: 38,
    gender: "Male",
    phone: "+91 65432 10987",
    email: "vikram.singh@email.com",
    address: "Jaipur, Rajasthan",
    condition: "Sleep Disorders",
    status: "Follow-up",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-01-28",
    priority: "medium",
    dosha: "Vata",
  },
]

export function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || patient.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Patient Management</h1>
          <p className="text-muted-foreground text-pretty">Manage patient records, treatments, and wellness journeys</p>
        </div>
        <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter patient information to create a new record in the system.</DialogDescription>
            </DialogHeader>
            <AddPatientForm onClose={() => setIsAddPatientOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="treatment">Treatment</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Patients</span>
            </div>
            <div className="text-2xl font-bold mt-2">127</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Active Treatments</span>
            </div>
            <div className="text-2xl font-bold mt-2">43</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <div className="text-2xl font-bold mt-2">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">High Priority</span>
            </div>
            <div className="text-2xl font-bold mt-2">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>
            {filteredPatients.length} of {patients.length} patients shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PatientCard({ patient }: { patient: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{patient.name}</h3>
                <Badge
                  variant={patient.status === "Active" ? "default" : "secondary"}
                  className={
                    patient.priority === "high"
                      ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400"
                      : ""
                  }
                >
                  {patient.status}
                </Badge>
                {patient.priority === "high" && <AlertCircle className="h-4 w-4 text-red-500" />}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {patient.age}y, {patient.gender}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {patient.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {patient.address}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium text-primary">Condition: {patient.condition}</span>
                <span className="text-muted-foreground">Dosha: {patient.dosha}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Last Visit: {patient.lastVisit}</span>
                <span>Next: {patient.nextAppointment}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AddPatientForm({ onClose }: { onClose: () => void }) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="medical">Medical</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4 mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" placeholder="Enter first name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" placeholder="Enter last name" required />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input id="age" type="number" placeholder="Age" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dosha">Primary Dosha</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select dosha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vata">Vata</SelectItem>
                <SelectItem value="pitta">Pitta</SelectItem>
                <SelectItem value="kapha">Kapha</SelectItem>
                <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="medical" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="condition">Primary Condition *</Label>
          <Input id="condition" placeholder="e.g., Stress Management, Digestive Issues" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="symptoms">Current Symptoms</Label>
          <Textarea id="symptoms" placeholder="Describe current symptoms and concerns" rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="medications">Current Medications</Label>
          <Textarea id="medications" placeholder="List any current medications or treatments" rows={2} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies & Restrictions</Label>
          <Textarea id="allergies" placeholder="Food allergies, medication restrictions, etc." rows={2} />
        </div>
      </TabsContent>

      <TabsContent value="contact" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" placeholder="+91 XXXXX XXXXX" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="patient@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" placeholder="Complete address" rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergency">Emergency Contact</Label>
          <Input id="emergency" placeholder="Emergency contact name and phone" />
        </div>
      </TabsContent>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Add Patient</Button>
      </div>
    </Tabs>
  )
}
