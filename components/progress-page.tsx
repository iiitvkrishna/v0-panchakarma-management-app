"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, Heart, Target, Calendar, BarChart3, Filter, Download } from "lucide-react"

// Mock progress data
const wellnessData = [
  { date: "Week 1", energy: 3, sleep: 4, stress: 7, digestion: 3, overall: 4 },
  { date: "Week 2", energy: 4, sleep: 5, stress: 6, digestion: 4, overall: 5 },
  { date: "Week 3", energy: 6, sleep: 6, stress: 5, digestion: 6, overall: 6 },
  { date: "Week 4", energy: 7, sleep: 7, stress: 4, digestion: 7, overall: 7 },
  { date: "Week 5", energy: 8, sleep: 8, stress: 3, digestion: 8, overall: 8 },
]

const treatmentProgress = [
  { treatment: "Abhyanga", completed: 12, total: 15, percentage: 80 },
  { treatment: "Shirodhara", completed: 8, total: 10, percentage: 80 },
  { treatment: "Virechana", completed: 2, total: 3, percentage: 67 },
  { treatment: "Basti", completed: 5, total: 7, percentage: 71 },
]

const doshaBalance = [
  { name: "Vata", value: 35, color: "#3b82f6" },
  { name: "Pitta", value: 40, color: "#ef4444" },
  { name: "Kapha", value: 25, color: "#10b981" },
]

const patientOutcomes = [
  {
    patient: "Priya Sharma",
    condition: "Stress Management",
    improvement: 85,
    duration: "21 days",
    status: "Excellent",
  },
  {
    patient: "Raj Patel",
    condition: "Digestive Issues",
    improvement: 70,
    duration: "14 days",
    status: "Good",
  },
  {
    patient: "Anita Kumar",
    condition: "Joint Pain",
    improvement: 60,
    duration: "28 days",
    status: "Moderate",
  },
  {
    patient: "Vikram Singh",
    condition: "Sleep Disorders",
    improvement: 90,
    duration: "18 days",
    status: "Excellent",
  },
]

export function ProgressPage() {
  const [selectedPatient, setSelectedPatient] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Progress Tracking</h1>
          <p className="text-muted-foreground text-pretty">
            Monitor patient wellness journey and treatment effectiveness
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Generate Analytics
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex gap-2">
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="priya">Priya Sharma</SelectItem>
                  <SelectItem value="raj">Raj Patel</SelectItem>
                  <SelectItem value="anita">Anita Kumar</SelectItem>
                  <SelectItem value="vikram">Vikram Singh</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-40">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Overall Improvement</span>
            </div>
            <div className="text-2xl font-bold mt-2">76%</div>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Active Treatments</span>
            </div>
            <div className="text-2xl font-bold mt-2">43</div>
            <p className="text-xs text-blue-600 mt-1">8 completing this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Goals Achieved</span>
            </div>
            <div className="text-2xl font-bold mt-2">89%</div>
            <p className="text-xs text-purple-600 mt-1">Above target of 85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Patient Satisfaction</span>
            </div>
            <div className="text-2xl font-bold mt-2">4.8</div>
            <p className="text-xs text-red-600 mt-1">Out of 5.0 rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wellness Trends</CardTitle>
            <CardDescription>Patient wellness metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={wellnessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={2} name="Energy" />
                <Line type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2} name="Sleep" />
                <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
                <Line type="monotone" dataKey="digestion" stroke="#10b981" strokeWidth={2} name="Digestion" />
                <Line type="monotone" dataKey="overall" stroke="#8b5cf6" strokeWidth={3} name="Overall" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Treatment Completion</CardTitle>
            <CardDescription>Progress across different therapies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={treatmentProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="treatment" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#d97706" name="Completed" />
                <Bar dataKey="total" fill="#f3f4f6" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <Tabs defaultValue="individual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="individual">Individual Progress</TabsTrigger>
          <TabsTrigger value="dosha">Dosha Analysis</TabsTrigger>
          <TabsTrigger value="outcomes">Treatment Outcomes</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Progress Details</CardTitle>
              <CardDescription>Detailed progress tracking for individual patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {patientOutcomes.map((patient, index) => (
                <div key={index} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{patient.patient}</h3>
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                    </div>
                    <Badge
                      variant={
                        patient.status === "Excellent" ? "default" : patient.status === "Good" ? "secondary" : "outline"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Improvement</span>
                      <span className="font-medium">{patient.improvement}%</span>
                    </div>
                    <Progress value={patient.improvement} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Duration: {patient.duration}</span>
                    <span>
                      {patient.improvement >= 80 ? (
                        <TrendingUp className="h-3 w-3 text-green-600 inline" />
                      ) : patient.improvement >= 60 ? (
                        <Activity className="h-3 w-3 text-blue-600 inline" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-amber-600 inline" />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dosha" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Dosha Balance Distribution</CardTitle>
                <CardDescription>Current constitutional balance across patients</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={doshaBalance}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {doshaBalance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {doshaBalance.map((dosha) => (
                    <div key={dosha.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dosha.color }}></div>
                      <span className="text-sm">
                        {dosha.name} ({dosha.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dosha-Specific Outcomes</CardTitle>
                <CardDescription>Treatment effectiveness by constitutional type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Vata Treatments</span>
                    <span className="text-sm text-muted-foreground">82% success rate</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pitta Treatments</span>
                    <span className="text-sm text-muted-foreground">78% success rate</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Kapha Treatments</span>
                    <span className="text-sm text-muted-foreground">75% success rate</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Outcomes Summary</CardTitle>
              <CardDescription>Comprehensive analysis of treatment effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-600">94%</div>
                  <p className="text-sm text-muted-foreground mt-1">Overall Success Rate</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">+5% from last quarter</span>
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">18.5</div>
                  <p className="text-sm text-muted-foreground mt-1">Avg. Treatment Days</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">-2.3 days improvement</span>
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">4.8</div>
                  <p className="text-sm text-muted-foreground mt-1">Patient Satisfaction</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">+0.3 rating increase</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
