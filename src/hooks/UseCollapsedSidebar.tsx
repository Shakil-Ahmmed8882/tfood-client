import { createContext, useContext, useState, type ReactNode } from "react"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => setCollapsed((prev) => !prev)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggleCollapsed }}>{children}</SidebarContext.Provider>
  )
}

export function useCollapsedSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useCollapsedSidebar must be used within a SidebarProvider")
  }
  return context
}

