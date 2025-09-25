"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[v0] Application Error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950 text-foreground p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg mb-6 text-muted-foreground">We apologize for the inconvenience. Please try again.</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        Try again
      </Button>
    </div>
  )
}
