"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { format, isSameDay } from "date-fns"
import { toast } from "sonner" // Assuming sonner is available for toasts

type QuickBlackoutCalendarProps = {}

export function QuickBlackoutCalendar({}: QuickBlackoutCalendarProps) {
  const [blackoutDates, setBlackoutDates] = useState<Date[]>([])
  const [month, setMonth] = useState<Date>(new Date())

  const handleDateClick = (date: Date | undefined) => {
    if (!date) return

    setBlackoutDates((prevDates) => {
      if (prevDates.some((d) => isSameDay(d, date))) {
        // Remove date if already blacked out
        toast.info(`Removed blackout for ${format(date, "PPP")}`)
        return prevDates.filter((d) => !isSameDay(d, date))
      } else {
        // Add date to blackout
        toast.success(`Blacked out ${format(date, "PPP")}`)
        return [...prevDates, date]
      }
    })
  }

  return (
    <Card className="bg-card text-card-foreground shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Quick Black-out Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={blackoutDates} // Highlight blacked out dates
          onSelect={handleDateClick}
          modifiers={{
            blackout: blackoutDates,
          }}
          modifiersStyles={{
            blackout: {
              backgroundColor: "var(--destructive)", // Tailwind red-500 equivalent
              color: "var(--destructive-foreground)", // Tailwind white equivalent
              borderRadius: "0.375rem", // rounded-md
            },
          }}
          className="rounded-md border shadow"
        />
        <p className="text-sm text-muted-foreground mt-4">Click on a day to quickly toggle its availability.</p>
      </CardContent>
    </Card>
  )
}
