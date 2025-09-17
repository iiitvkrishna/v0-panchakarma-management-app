"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Leaf,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "#", icon: LayoutDashboard, current: true, badge: null },
  { name: "Patients", href: "#", icon: Users, current: false, badge: "127" },
  { name: "Treatments", href: "#", icon: Leaf, current: false, badge: "43" },
  { name: "Schedule", href: "#", icon: Calendar, current: false, badge: "8" },
  { name: "Progress", href: "#", icon: BarChart3, current: false, badge: null },
  { name: "Reports", href: "#", icon: FileText, current: false, badge: null },
  { name: "Settings", href: "#", icon: Settings, current: false, badge: null },
]

interface SidebarProps {
  currentPage?: string
  onNavigate?: (page: string) => void
}

export function Sidebar({ currentPage = "Dashboard", onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (pageName: string) => {
    onNavigate?.(pageName)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-card shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">Panchakarma</h1>
                <p className="text-xs text-sidebar-foreground/60">Management System</p>
              </div>
            </div>
          </div>

          {/* Search and Notifications */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 justify-start gap-2 text-muted-foreground bg-transparent"
              >
                <Search className="h-4 w-4" />
                Search...
              </Button>
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-destructive">3</Badge>
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = item.name === currentPage
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => handleNavigation(item.name)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-sidebar-border">
            <Card className="p-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">DR</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">Dr. Ayurveda Sharma</p>
                  <p className="text-xs text-muted-foreground truncate">Senior Practitioner</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Online Status</span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
    </>
  )
}
