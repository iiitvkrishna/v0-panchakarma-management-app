"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format, addMinutes, setHours, setMinutes, isBefore, isAfter } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"

interface TimeSlotSelectorProps {
  selectedDate: Date
  onTimeSlotSelect: (time: string) => void
  onBack: () => void
}

// Mock doctor's working hours and slot length (for demonstration)
const mockDoctorSettings = {
  slotLength: 30, // minutes
  bufferTime: 15, // minutes before/after each appointment
  workingHours: {
    start: "09:00",
    end: "17:00",
  },
  blackoutTimes: ["12:00", "12:30"], // Example: lunch break
  dailyLimit: 5, // Max bookings per day
}

// Mock existing bookings for the selected date
const mockExistingBookings = [{ time: "09:00" }, { time: "10:30" }, { time: "14:00" }]

export function TimeSlotSelector({ selectedDate, onTimeSlotSelect, onBack }: TimeSlotSelectorProps) {
  const generateTimeSlots = (date: Date) => {
    const slots: string[] = []
    const [startHour, startMinute] = mockDoctorSettings.workingHours.start.split(":").map(Number)
    const [endHour, endMinute] = mockDoctorSettings.workingHours.end.split(":").map(Number)

    let currentTime = setMinutes(setHours(date, startHour), startMinute)
    const endTime = setMinutes(setHours(date, endHour), endMinute)

    while (isBefore(currentTime, endTime)) {
      const slotStart = currentTime
      const slotEnd = addMinutes(currentTime, mockDoctorSettings.slotLength)

      // Check if slot is within working hours
      if (isAfter(slotEnd, endTime)) {
        break
      }

      // Check for blackout times (simple string comparison for mock)
      const formattedSlot = format(slotStart, "HH:mm")
      if (mockDoctorSettings.blackoutTimes.includes(formattedSlot)) {
        currentTime = addMinutes(currentTime, mockDoctorSettings.slotLength + mockDoctorSettings.bufferTime)
        continue
      }

      // Check for existing bookings and buffer times
      const isBooked = mockExistingBookings.some((booking) => {
        const bookingTime = setMinutes(
          setHours(date, Number.parseInt(booking.time.split(":")[0])),
          Number.parseInt(booking.time.split(":")[1]),
        )
        const bufferStart = addMinutes(bookingTime, -mockDoctorSettings.bufferTime)
        const bufferEnd = addMinutes(bookingTime, mockDoctorSettings.slotLength + mockDoctorSettings.bufferTime)
        return isBefore(slotStart, bufferEnd) && isAfter(slotEnd, bufferStart)
      })

      if (!isBooked) {
        slots.push(formattedSlot)
      }

      currentTime = addMinutes(currentTime, mockDoctorSettings.slotLength + mockDoctorSettings.bufferTime)
    }

    return slots
  }

  const availableTimeSlots = generateTimeSlots(selectedDate)
  const bookingsToday = mockExistingBookings.length // Simplified for mock
  const isDailyLimitReached = bookingsToday >= mockDoctorSettings.dailyLimit

  return (
    <Card className="bg-card text-card-foreground shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Select a Time for {format(selectedDate, "PPP")}</CardTitle>
        <Button variant="outline" size="icon" onClick={onBack} aria-label="Go back to calendar">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {isDailyLimitReached ? (
          <p className="text-red-500 text-center text-lg">
            Doctor has reached the maximum booking limit for this day. Please choose another day.
          </p>
        ) : availableTimeSlots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableTimeSlots.map((time) => (
              <Button
                key={time}
                variant="outline"
                className="text-emerald-600 border-emerald-300 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-700 dark:hover:bg-emerald-900 bg-transparent"
                onClick={() => onTimeSlotSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center text-lg">
            No available time slots for this date. Please select another day.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
