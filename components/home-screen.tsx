"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf } from "lucide-react"

interface HomeScreenProps {
  onSelectRole: (role: "doctor" | "patient") => void
}

export function HomeScreen({ onSelectRole }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-balance">Welcome to Panchakarma Management</CardTitle>
          <CardDescription className="text-pretty">
            Please select your role to continue to the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={() => onSelectRole("doctor")} className="h-12 text-lg">
            I am a Doctor
          </Button>
          <Button onClick={() => onSelectRole("patient")} variant="outline" className="h-12 text-lg">
            I am a Patient
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
