"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon, PaperclipIcon, CheckIcon, XIcon, BanIcon, MessageSquareIcon } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Booking {
  id: string
  patientName: string
  date: string
  time: string
  status: "Pending" | "Confirmed" | "Declined" | "Cancelled"
  reason: string
  hasAttachment: boolean
}

interface BookingsTableProps {
  bookings: Booking[]
}

export function BookingsTable({ bookings: initialBookings }: BookingsTableProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [note, setNote] = useState("")
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)

  const handleAction = (id: string, newStatus: Booking["status"]) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)),
    )
    console.log(`[v0] Booking ${id} status updated to ${newStatus}`)
  }

  const handleAddNote = (id: string) => {
    console.log(`[v0] Adding note to booking ${id}: "${note}"`)
    // In a real app, this would save the note to the backend
    setNote("") // Clear note after saving
    setSelectedBookingId(null) // Close dialog
  }

  const getStatusBadgeVariant = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return "default" // green
      case "Pending":
        return "secondary" // yellow/orange
      case "Declined":
      case "Cancelled":
        return "destructive" // red
      default:
        return "outline"
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-center">Attachment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.patientName}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">{booking.reason}</TableCell>
              <TableCell className="text-center">
                {booking.hasAttachment ? (
                  <Button variant="ghost" size="icon" aria-label="View attachment">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {booking.status === "Pending" && (
                      <>
                        <DropdownMenuItem onClick={() => handleAction(booking.id, "Confirmed")}>
                          <CheckIcon className="mr-2 h-4 w-4" /> Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(booking.id, "Declined")}>
                          <XIcon className="mr-2 h-4 w-4" /> Decline
                        </DropdownMenuItem>
                      </>
                    )}
                    {(booking.status === "Confirmed" || booking.status === "Pending") && (
                      <DropdownMenuItem onClick={() => handleAction(booking.id, "Cancelled")}>
                        <BanIcon className="mr-2 h-4 w-4" /> Cancel
                      </DropdownMenuItem>
                    )}
                    <Dialog onOpenChange={(open) => !open && setSelectedBookingId(null)}>
                      <DialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault() // Prevent dropdown from closing
                            setSelectedBookingId(booking.id)
                          }}
                        >
                          <MessageSquareIcon className="mr-2 h-4 w-4" /> Add Note
                        </DropdownMenuItem>
                      </DialogTrigger>
                      {selectedBookingId === booking.id && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Note to Booking {booking.id}</DialogTitle>
                            <DialogDescription>Add a private note for this booking.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="note">Note</Label>
                              <Textarea
                                id="note"
                                placeholder="Enter your note here..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                              />
                            </div>
                          </div>
                          <Button onClick={() => handleAddNote(booking.id)}>Save Note</Button>
                        </DialogContent>
                      )}
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
