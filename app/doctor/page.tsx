import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DoctorDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950 text-foreground p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-balance">Doctor Dashboard</h1>
      <p className="text-lg text-center mb-8 max-w-2xl text-pretty">
        Manage your profile, availability, bookings, and settings.
      </p>
      <div className="flex gap-4">
        <Button asChild className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/doctor/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="px-6 py-3 border-emerald-600 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900 bg-transparent"
        >
          <Link href="/doctor/bookings">View Bookings</Link>
        </Button>
      </div>
    </div>
  )
}
