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
  DialogFooter, // Added DialogFooter import
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  Filter,
  Leaf,
  Clock,
  User,
  Calendar,
  Droplets,
  Flame,
  Wind,
  Mountain,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

// Mock treatment data
const treatments = [
  {
    id: 1,
    name: "Panchakarma Detox Program",
    patient: "Priya Sharma",
    duration: "21 days",
    status: "Active",
    progress: 65,
    startDate: "2024-01-01",
    endDate: "2024-01-21",
    dosha: "Vata-Pitta",
    therapies: ["Abhyanga", "Shirodhara", "Virechana"],
    practitioner: "Dr. Ayurveda Sharma",
  },
  {
    id: 2,
    name: "Digestive Wellness Plan",
    patient: "Raj Patel",
    duration: "14 days",
    status: "Planning",
    progress: 0,
    startDate: "2024-01-20",
    endDate: "2024-02-03",
    dosha: "Pitta-Kapha",
    therapies: ["Abhyanga", "Basti", "Diet Therapy"],
    practitioner: "Dr. Ayurveda Sharma",
  },
  {
    id: 3,
    name: "Joint Pain Relief",
    patient: "Anita Kumar",
    duration: "28 days",
    status: "Active",
    progress: 40,
    startDate: "2024-01-05",
    endDate: "2024-02-02",
    dosha: "Vata-Kapha",
    therapies: ["Abhyanga", "Swedana", "Kizhi"],
    practitioner: "Dr. Ayurveda Sharma",
  },
]

const ayurvedicTherapies = [
  { name: "Abhyanga", description: "Full body oil massage", duration: "60 min", dosha: ["Vata", "Pitta", "Kapha"] },
  {
    name: "Shirodhara",
    description: "Continuous oil pouring on forehead",
    duration: "45 min",
    dosha: ["Vata", "Pitta"],
  },
  { name: "Swedana", description: "Herbal steam therapy", duration: "30 min", dosha: ["Vata", "Kapha"] },
  { name: "Virechana", description: "Therapeutic purgation", duration: "Full day", dosha: ["Pitta"] },
  { name: "Basti", description: "Medicated enema therapy", duration: "45 min", dosha: ["Vata"] },
  { name: "Nasya", description: "Nasal administration of medicines", duration: "20 min", dosha: ["Kapha"] },
  { name: "Kizhi", description: "Herbal poultice massage", duration: "45 min", dosha: ["Vata", "Kapha"] },
  { name: "Akshi Tarpana", description: "Eye treatment with medicated ghee", duration: "30 min", dosha: ["Pitta"] },
]

interface TreatmentsPageProps {
  onNavigate: (page: string) => void
}

export function TreatmentsPage({ onNavigate }: TreatmentsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateTreatmentOpen, setIsCreateTreatmentOpen] = useState(false)

  const filteredTreatments = treatments.filter((treatment) => {
    const matchesSearch =
      treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || treatment.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Treatment Planning</h1>
          <p className="text-muted-foreground text-pretty">
            Design and manage personalized Ayurvedic treatment programs
          </p>
        </div>
        <Dialog open={isCreateTreatmentOpen} onOpenChange={setIsCreateTreatmentOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Treatment Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Treatment Plan</DialogTitle>
              <DialogDescription>Design a personalized Ayurvedic treatment program for your patient.</DialogDescription>
            </DialogHeader>
            <CreateTreatmentForm onClose={() => setIsCreateTreatmentOpen(false)} />
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
                placeholder="Search treatments by name or patient..."
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
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Treatments</span>
            </div>
            <div className="text-2xl font-bold mt-2">43</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">In Planning</span>
            </div>
            <div className="text-2xl font-bold mt-2">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <div className="text-2xl font-bold mt-2">28</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <div className="text-2xl font-bold mt-2">156</div>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Plans */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Treatment Plans</CardTitle>
            <CardDescription>Currently ongoing treatments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredTreatments.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ayurvedic Therapies</CardTitle>
            <CardDescription>Available treatment modalities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ayurvedicTherapies.slice(0, 6).map((therapy, index) => (
              <TherapyCard key={index} therapy={therapy} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Dosha Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Dosha Distribution in Active Treatments
          </CardTitle>
          <CardDescription>Treatment distribution by constitutional types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <DoshaCard dosha="Vata" count={18} percentage={42} icon={Wind} color="text-blue-600" />
            <DoshaCard dosha="Pitta" count={15} percentage={35} icon={Flame} color="text-red-600" />
            <DoshaCard dosha="Kapha" count={10} percentage={23} icon={Mountain} color="text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TreatmentCard({ treatment }: { treatment: any }) {
  const [isViewTreatmentOpen, setIsViewTreatmentOpen] = useState(false) // State for view dialog
  const [isEditTreatmentOpen, setIsEditTreatmentOpen] = useState(false) // State for edit dialog
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false) // State for delete confirmation

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200"
      case "planning":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "completed":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const handleDelete = () => {
    console.log(`[v0] Deleting treatment: ${treatment.id}`)
    setIsDeleteConfirmOpen(false)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-sm">{treatment.name}</h3>
            <p className="text-xs text-muted-foreground">Patient: {treatment.patient}</p>
          </div>
          <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{treatment.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all"
              style={{ width: `${treatment.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>{treatment.duration}</span>
          <span>{treatment.dosha}</span>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <Dialog open={isViewTreatmentOpen} onOpenChange={setIsViewTreatmentOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Eye className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>View Treatment Plan: {treatment.name}</DialogTitle>
                <DialogDescription>Details of the selected treatment plan.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p>
                  <strong>Patient:</strong> {treatment.patient}
                </p>
                <p>
                  <strong>Duration:</strong> {treatment.duration}
                </p>
                <p>
                  <strong>Status:</strong> {treatment.status}
                </p>
                <p>
                  <strong>Progress:</strong> {treatment.progress}%
                </p>
                <p>
                  <strong>Start Date:</strong> {treatment.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {treatment.endDate}
                </p>
                <p>
                  <strong>Dosha:</strong> {treatment.dosha}
                </p>
                <p>
                  <strong>Therapies:</strong> {treatment.therapies.join(", ")}
                </p>
                <p>
                  <strong>Practitioner:</strong> {treatment.practitioner}
                </p>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsViewTreatmentOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditTreatmentOpen} onOpenChange={setIsEditTreatmentOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Edit className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Treatment Plan: {treatment.name}</DialogTitle>
                <DialogDescription>Modify the details of this treatment plan.</DialogDescription>
              </DialogHeader>
              <p className="py-4 text-muted-foreground">Edit form for {treatment.name} coming soon...</p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditTreatmentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditTreatmentOpen(false)}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the treatment plan "{treatment.name}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="sm" className="h-7 px-2">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function TherapyCard({ therapy }: { therapy: any }) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-sm">{therapy.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">{therapy.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {therapy.duration}
              </Badge>
              <div className="flex gap-1">
                {therapy.dosha.map((d: string) => (
                  <Badge key={d} variant="secondary" className="text-xs">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Droplets className="h-4 w-4 text-primary" />
        </div>
      </CardContent>
    </Card>
  )
}

function DoshaCard({ dosha, count, percentage, icon: Icon, color }: any) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <Icon className={`h-8 w-8 mx-auto mb-2 ${color}`} />
        <h3 className="font-semibold">{dosha}</h3>
        <div className="text-2xl font-bold mt-1">{count}</div>
        <p className="text-xs text-muted-foreground">{percentage}% of treatments</p>
        <div className="w-full bg-muted rounded-full h-1 mt-2">
          <div className={`h-1 rounded-full bg-current ${color}`} style={{ width: `${percentage}%` }}></div>
        </div>
      </CardContent>
    </Card>
  )
}

function CreateTreatmentForm({ onClose }: { onClose: () => void }) {
  const [selectedTherapies, setSelectedTherapies] = useState<string[]>([])

  const handleTherapyToggle = (therapyName: string) => {
    setSelectedTherapies((prev) =>
      prev.includes(therapyName) ? prev.filter((t) => t !== therapyName) : [...prev, therapyName],
    )
  }

  return (
    <Tabs defaultValue="patient" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="patient">Patient</TabsTrigger>
        <TabsTrigger value="assessment">Assessment</TabsTrigger>
        <TabsTrigger value="therapies">Therapies</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
          <Label htmlFor="treatmentName">Treatment Plan Name *</Label>
          <Input id="treatmentName" placeholder="e.g., Stress Management Program" required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input id="startDate" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days) *</Label>
            <Input id="duration" type="number" placeholder="14" required />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="assessment" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="primaryDosha">Primary Dosha *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select primary dosha" />
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
        <div className="space-y-2">
          <Label htmlFor="condition">Primary Condition *</Label>
          <Input id="condition" placeholder="e.g., Chronic stress, digestive issues" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="symptoms">Current Symptoms</Label>
          <Textarea id="symptoms" placeholder="Describe current symptoms and imbalances" rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="goals">Treatment Goals</Label>
          <Textarea id="goals" placeholder="What do you want to achieve with this treatment?" rows={3} />
        </div>
      </TabsContent>

      <TabsContent value="therapies" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>Select Therapies *</Label>
          <div className="grid gap-3 md:grid-cols-2">
            {ayurvedicTherapies.map((therapy) => (
              <div key={therapy.name} className="flex items-start space-x-2 p-3 border rounded-lg">
                <Checkbox
                  id={therapy.name}
                  checked={selectedTherapies.includes(therapy.name)}
                  onCheckedChange={() => handleTherapyToggle(therapy.name)}
                />
                <div className="flex-1">
                  <Label htmlFor={therapy.name} className="font-medium cursor-pointer">
                    {therapy.name}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{therapy.description}</p>
                  <div className="flex gap-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {therapy.duration}
                    </Badge>
                    {therapy.dosha.map((d) => (
                      <Badge key={d} variant="secondary" className="text-xs">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customTherapy">Additional Notes</Label>
          <Textarea id="customTherapy" placeholder="Any specific instructions or modifications" rows={2} />
        </div>
      </TabsContent>

      <TabsContent value="schedule" className="space-y-4 mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="frequency">Session Frequency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="alternate">Alternate days</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sessionDuration">Session Duration</Label>
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredTime">Preferred Time</Label>
          <Input id="preferredTime" type="time" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialInstructions">Special Instructions</Label>
          <Textarea
            id="specialInstructions"
            placeholder="Any specific scheduling requirements or patient preferences"
            rows={3}
          />
        </div>
      </TabsContent>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Create Treatment Plan</Button>
      </div>
    </Tabs>
  )
}
