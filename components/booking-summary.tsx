import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import type { BookingStep } from "@/app/page"

interface BookingSummaryProps {
  doctor: {
    fullName: string
    title: string
  }
  selectedDate: Date | undefined
  selectedTimeSlot: string | undefined
  currentStep: BookingStep
}

export function BookingSummary({ doctor, selectedDate, selectedTimeSlot, currentStep }: BookingSummaryProps) {
  const isConfirmationStep = currentStep === "confirmation"

  return (
    <Card className="bg-card text-card-foreground shadow-lg border-l-4 border-emerald-500">
      <CardHeader>
        <CardTitle className="text-foreground">Your Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Doctor</p>
          <p className="text-lg font-semibold text-foreground">{doctor.fullName}</p>
          <p className="text-sm text-muted-foreground">{doctor.title}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="text-lg font-semibold text-foreground">
            {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Time</p>
          <p className="text-lg font-semibold text-foreground">{selectedTimeSlot || "Not selected"}</p>
        </div>

        {!isConfirmationStep && (
          <>
            <Separator />
            <div className="text-sm text-muted-foreground">
              <p>Next: Fill out your details to confirm.</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
