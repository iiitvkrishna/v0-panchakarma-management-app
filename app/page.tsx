"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { PatientsPage } from "@/components/patients-page"
import { TreatmentsPage } from "@/components/treatments-page"
import { ProgressPage } from "@/components/progress-page"
import { SchedulePage } from "@/components/schedule-page"
import { HomeScreen } from "@/components/home-screen" // Import HomeScreen
import { ReportsPage } from "@/components/reports-page" // Import ReportsPage
import { SettingsPage } from "@/components/settings-page" // Import SettingsPage

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("Dashboard")
  const [userRole, setUserRole] = useState<"doctor" | "patient" | null>(null) // New state for user role

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const handleRoleSelect = (role: "doctor" | "patient") => {
    setUserRole(role)
    // Optionally navigate to a default page based on role
    if (role === "doctor") {
      setCurrentPage("Dashboard")
    } else {
      // For patients, maybe a different default page or a simplified view
      setCurrentPage("PatientDashboard") // Placeholder for a patient-specific dashboard
    }
  }

  const renderCurrentPage = () => {
    if (!userRole) {
      return <HomeScreen onSelectRole={handleRoleSelect} />
    }

    if (userRole === "patient") {
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold">Patient Portal</h1>
          <p className="text-muted-foreground">Welcome to your personalized patient dashboard.</p>
          <p className="mt-4">Here you can view your upcoming appointments, treatment plans, and progress reports.</p>
          {/* Add patient-specific components here */}
        </div>
      )
    }

    switch (currentPage) {
      case "Dashboard":
        return <Dashboard onNavigate={handleNavigation} /> // Pass onNavigate to Dashboard
      case "Patients":
        return <PatientsPage onNavigate={handleNavigation} /> // Pass onNavigate to PatientsPage
      case "Treatments":
        return <TreatmentsPage onNavigate={handleNavigation} /> // Pass onNavigate to TreatmentsPage
      case "Schedule":
        return <SchedulePage />
      case "Progress":
        return <ProgressPage />
      case "Reports":
        return <ReportsPage onNavigate={handleNavigation} /> // Render ReportsPage
      case "Settings":
        return <SettingsPage onNavigate={handleNavigation} /> // Render SettingsPage
      default:
        return <Dashboard onNavigate={handleNavigation} /> // Pass onNavigate to Dashboard
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {userRole === "doctor" && <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />}
      <main className="flex-1 overflow-hidden">{renderCurrentPage()}</main>
    </div>
  )
}
