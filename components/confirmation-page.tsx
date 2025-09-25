import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2Icon, CalendarIcon, ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

interface ConfirmationPageProps {
  bookingDetails: {
    bookingId: string
    doctor: string
    clinic: string
    date: string
    time: string
    patientName: string
    patientEmail: string
    zoomLink?: string
  }
}

export function ConfirmationPage({ bookingDetails }: ConfirmationPageProps) {
  const { bookingId, doctor, clinic, date, time, patientName, patientEmail, zoomLink } = bookingDetails

  const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=Appointment with ${doctor} at ${clinic}&dates=${date.replace(/-/g, "")}T${time.replace(":", "")}00/${date.replace(/-/g, "")}T${time.replace(":", "")}00&details=Your appointment details.&sf=true&output=xml`
  const iCalLink = "#" // Placeholder for actual iCal generation

  return (
    <Card className="bg-card text-card-foreground shadow-lg border-t-4 border-emerald-500">
      <CardHeader className="text-center">
        <CheckCircle2Icon className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <CardTitle className="text-3xl font-bold text-foreground">Appointment Confirmed!</CardTitle>
        <CardDescription className="text-lg">
          Thank you, {patientName}. Your appointment has been successfully booked.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">Booking ID:</p>
            <p>{bookingId}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Doctor:</p>
            <p>{doctor}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Date:</p>
            <p>{date}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Time:</p>
            <p>{time}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Patient Email:</p>
            <p>{patientEmail}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Add to Google Calendar
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900 bg-transparent"
          >
            <a href={iCalLink} download="appointment.ics" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Download iCal
            </a>
          </Button>
        </div>

        {zoomLink && (
          <div className="text-center mt-6">
            <p className="text-lg font-semibold text-foreground mb-2">Your Zoom Meeting Link:</p>
            <Button asChild variant="link" className="text-emerald-600 dark:text-emerald-400">
              <a
                href={zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                {zoomLink} <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-muted-foreground">You will also receive a confirmation email with these details.</p>
          <Button asChild variant="link" className="mt-2 text-emerald-600 dark:text-emerald-400">
            <Link href="/">Book another appointment</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
