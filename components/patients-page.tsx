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
  Info,
} from "lucide-react"

interface Patient {
  id: number
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  condition: string
  status: string
  lastVisit: string
  nextAppointment: string
  priority: string
  dosha: string
  notes?: string
  allergies?: string
  medications?: string
}

// Mock patient data
const mockPatients: Patient[] = [
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
    notes: "Patient has a history of anxiety. Responds well to meditation and herbal remedies.",
    allergies: "None",
    medications: "Ashwagandha, Brahmi",
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
    notes: "Suffers from occasional acid reflux. Recommended a pitta-pacifying diet.",
    allergies: "Dairy",
    medications: "Triphala",
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
    notes: "Chronic knee pain. Undergoing Abhyanga and Swedana treatments.",
    allergies: "None",
    medications: "Guggul",
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
    notes: "Difficulty falling asleep. Recommended Shirodhara and lifestyle changes.",
    allergies: "Pollen",
    medications: "Jatamansi",
  },
  {
    id: 5,
    name: "Deepa Mehta",
    age: 29,
    gender: "Female",
    phone: "+91 99887 76655",
    email: "deepa.mehta@email.com",
    address: "Bengaluru, Karnataka",
    condition: "Skin Rashes",
    status: "Active",
    lastVisit: "2024-01-18",
    nextAppointment: "2024-01-26",
    priority: "high",
    dosha: "Pitta",
    notes: "Frequent skin breakouts. Following a strict pitta-pacifying diet and topical treatments.",
    allergies: "Dust",
    medications: "Neem, Manjistha",
  },
  {
    id: 6,
    name: "Sanjay Kumar",
    age: 60,
    gender: "Male",
    phone: "+91 77665 54433",
    email: "sanjay.kumar@email.com",
    address: "Chennai, Tamil Nadu",
    condition: "Hypertension",
    status: "Treatment",
    lastVisit: "2024-01-05",
    nextAppointment: "2024-01-23",
    priority: "medium",
    dosha: "Kapha-Pitta",
    notes: "Managing blood pressure with diet and stress reduction techniques.",
    allergies: "None",
    medications: "Arjuna",
  },
  {
    id: 7,
    name: "Pooja Singh",
    age: 25,
    gender: "Female",
    phone: "+91 90000 11111",
    email: "pooja.singh@email.com",
    address: "Pune, Maharashtra",
    condition: "Weight Management",
    status: "Consultation",
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-29",
    priority: "low",
    dosha: "Kapha",
    notes: "Seeking guidance for healthy weight loss. Recommended kapha-pacifying diet and exercise.",
    allergies: "Gluten",
    medications: "Guggul",
  },
  {
    id: 8,
    name: "Rahul Gupta",
    age: 40,
    gender: "Male",
    phone: "+91 81234 56789",
    email: "rahul.gupta@email.com",
    address: "Hyderabad, Telangana",
    condition: "Chronic Fatigue",
    status: "Follow-up",
    lastVisit: "2024-01-01",
    nextAppointment: "2024-02-05",
    priority: "high",
    dosha: "Vata",
    notes: "Persistent tiredness. Exploring rejuvenating therapies and dietary changes.",
    allergies: "Dust mites",
    medications: "Chyawanprash",
  },
  {
    id: 9,
    name: "Smita Rao",
    age: 31,
    gender: "Female",
    phone: "+91 92345 67890",
    email: "smita.rao@email.com",
    address: "Kochi, Kerala",
    condition: "Hair Fall",
    status: "Active",
    lastVisit: "2024-01-20",
    nextAppointment: "2024-02-01",
    priority: "medium",
    dosha: "Pitta",
    notes: "Experiencing significant hair loss. Recommended head massage and specific herbal oils.",
    allergies: "None",
    medications: "Bhringraj oil",
  },
  {
    id: 10,
    name: "Gaurav Sharma",
    age: 55,
    gender: "Male",
    phone: "+91 78901 23456",
    email: "gaurav.sharma@email.com",
    address: "Lucknow, Uttar Pradesh",
    condition: "Diabetes Management",
    status: "Treatment",
    lastVisit: "2024-01-07",
    nextAppointment: "2024-02-10",
    priority: "high",
    dosha: "Kapha",
    notes: "Managing type 2 diabetes with Ayurvedic diet and exercise. Regular blood sugar monitoring.",
    allergies: "Shellfish",
    medications: "Guduchi",
  },
]

interface PatientsPageProps {
  onNavigate: (page: string) => void
}

export function PatientsPage({ onNavigate }: PatientsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)

  const filteredPatients = mockPatients.filter((patient) => {
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
            <div className="text-2xl font-bold mt-2">{mockPatients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Active Treatments</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {mockPatients.filter((p) => p.status === "Active" || p.status === "Treatment").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {
                mockPatients.filter((p) => new Date(p.nextAppointment).getTime() <= new Date("2024-02-04").getTime())
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">High Priority</span>
            </div>
            <div className="text-2xl font-bold mt-2">{mockPatients.filter((p) => p.priority === "high").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>
            {filteredPatients.length} of {mockPatients.length} patients shown
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

export function PatientCard({ patient }: { patient: Patient }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
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
            <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Patient Details: {patient.name}</DialogTitle>
                  <DialogDescription>Comprehensive information about {patient.name}.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-sm">
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Age:</Label>
                    <span>{patient.age}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Gender:</Label>
                    <span>{patient.gender}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Phone:</Label>
                    <span>{patient.phone}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Email:</Label>
                    <span>{patient.email}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Address:</Label>
                    <span>{patient.address}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Condition:</Label>
                    <span>{patient.condition}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Status:</Label>
                    <span>{patient.status}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Last Visit:</Label>
                    <span>{patient.lastVisit}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Next Appointment:</Label>
                    <span>{patient.nextAppointment}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Priority:</Label>
                    <span>{patient.priority}</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Label className="font-medium">Dosha:</Label>
                    <span>{patient.dosha}</span>
                  </div>
                  {patient.notes && (
                    <div className="grid grid-cols-2 items-start gap-2">
                      <Label className="font-medium">Notes:</Label>
                      <span>{patient.notes}</span>
                    </div>
                  )}
                  {patient.allergies && (
                    <div className="grid grid-cols-2 items-start gap-2">
                      <Label className="font-medium">Allergies:</Label>
                      <span>{patient.allergies}</span>
                    </div>
                  )}
                  {patient.medications && (
                    <div className="grid grid-cols-2 items-start gap-2">
                      <Label className="font-medium">Medications:</Label>
                      <span>{patient.medications}</span>
                    </div>
                  )}
                </div>
                <Dialog.Close asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </Dialog.Close>
              </DialogContent>
            </Dialog>
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
