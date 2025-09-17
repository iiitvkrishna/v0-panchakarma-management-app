"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { PatientsPage } from "@/components/patients-page"
import { TreatmentsPage } from "@/components/treatments-page"
import { ProgressPage } from "@/components/progress-page"
import { SchedulePage } from "@/components/schedule-page"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("Dashboard")

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />
      case "Patients":
        return <PatientsPage />
      case "Treatments":
        return <TreatmentsPage />
      case "Schedule":
        return <SchedulePage />
      case "Progress":
        return <ProgressPage />
      case "Reports":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )
      case "Settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="flex-1 overflow-hidden">{renderCurrentPage()}</main>
    </div>
  )
}
