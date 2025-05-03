import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

// Define the item types
export interface SubItem {
    title: string
    url: string
    icon?: LucideIcon | ReactNode
    isActive?: boolean
    onClick?: () => void // Optional callback for sub-items
  }
  
  export interface NavItem {
    title: string
    url: string
    icon?: LucideIcon | ReactNode
    isActive?: boolean
    onClick?: () => void // Optional callback for main items
    items?: SubItem[]
  }
  