import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface PatientBookingHeroProps {
  doctor: {
    fullName: string
    title: string
    bio: string
    avatarUrl?: string
  }
}

export function PatientBookingHero({ doctor }: PatientBookingHeroProps) {
  return (
    <Card className="bg-card text-card-foreground shadow-lg">
      <CardContent className="flex flex-col md:flex-row items-center p-6 md:p-8 space-y-4 md:space-y-0 md:space-x-6">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-emerald-500">
          <AvatarImage src={doctor.avatarUrl || "/placeholder.svg?key=hx1r3"} alt={doctor.fullName} />
          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl md:text-3xl font-semibold">
            {doctor.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">{doctor.fullName}</h1>
          <h2 className="text-xl md:text-2xl text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            {doctor.title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-prose text-pretty">{doctor.bio}</p>
        </div>
      </CardContent>
    </Card>
  )
}
