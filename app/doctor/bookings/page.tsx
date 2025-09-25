"use client"

import { BookingsTable } from "@/components/bookings-table"
import { QuickBlackoutCalendar } from "@/components/quick-blackout-calendar"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

export default function DoctorBookingsPage() {
  // Mock data for bookings
  const mockBookings = [
    {
      id: "bkg001",
      patientName: "Alice Smith",
      date: "2025-10-26",
      time: "10:00",
      status: "Pending",
      reason: "Initial consultation for chronic fatigue.",
      hasAttachment: true,
    },
    {
      id: "bkg002",
      patientName: "Bob Johnson",
      date: "2025-10-26",
      time: "14:30",
      status: "Confirmed",
      reason: "Follow-up for Ayurvedic diet plan.",
      hasAttachment: false,
    },
    {
      id: "bkg003",
      patientName: "Charlie Brown",
      date: "2025-10-27",
      time: "09:00",
      status: "Declined",
      reason: "Vata imbalance assessment.",
      hasAttachment: true,
    },
    {
      id: "bkg004",
      patientName: "Diana Prince",
      date: "2025-10-28",
      time: "11:00",
      status: "Confirmed",
      reason: "Pitta dosha management.",
      hasAttachment: false,
    },
    {
      id: "bkg005",
      patientName: "Eve Adams",
      date: "2025-10-28",
      time: "15:00",
      status: "Pending",
      reason: "Detoxification program inquiry.",
      hasAttachment: true,
    },
  ]

  const handleExportCsv = () => {
    console.log("[v0] Exporting bookings to CSV...")
    // Logic to convert mockBookings to CSV and trigger download
    const headers = ["Booking ID", "Patient Name", "Date", "Time", "Status", "Reason", "Attachment"]
    const rows = mockBookings.map((b) => [
      b.id,
      b.patientName,
      b.date,
      b.time,
      b.status,
      b.reason,
      b.hasAttachment ? "Yes" : "No",
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      // Feature detection for download attribute
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "bookings.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Your Bookings</h1>
        <Button onClick={handleExportCsv} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookingsTable bookings={mockBookings} />
        </div>
        <div className="lg:col-span-1">
          <QuickBlackoutCalendar />
        </div>
      </div>
    </div>
  )
}
