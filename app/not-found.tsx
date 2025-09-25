import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950 text-foreground p-4 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg mb-6 text-muted-foreground">Could not find the requested resource.</p>
      <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
