"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { addDays, isSameDay, isWeekend } from "date-fns"

interface BookingCalendarProps {
  onDateSelect: (date: Date | undefined) => void
  selectedDate: Date | undefined
}

// Mock doctor availability (for demonstration)
const mockAvailableDays = [
  addDays(new Date(), 1),
  addDays(new Date(), 2),
  addDays(new Date(), 4),
  addDays(new Date(), 5),
  addDays(new Date(), 8),
  addDays(new Date(), 9),
  addDays(new Date(), 11),
  addDays(new Date(), 12),
  addDays(new Date(), 15),
  addDays(new Date(), 16),
]

export function BookingCalendar({ onDateSelect, selectedDate }: BookingCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date())

  const isDayAvailable = (date: Date) => {
    // Example: Disable weekends and specific blackout dates
    if (isWeekend(date)) return false
    // Check against mock available days
    return mockAvailableDays.some((availableDate) => isSameDay(date, availableDate))
  }

  return (
    <Card className="bg-card text-card-foreground shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Select a Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          month={month}
          onMonthChange={setMonth}
          disabled={(date) => !isDayAvailable(date)}
          initialFocus
          className="rounded-md border shadow"
        />
        <p className="text-sm text-muted-foreground mt-4">
          <span className="inline-block h-3 w-3 rounded-full bg-emerald-500 mr-2"></span>
          Available days are highlighted.
        </p>
      </CardContent>
    </Card>
  )
}
