



export interface TRestaurant {
  id: string
  user: string
  name: string
  location: string
  website: string
  contact: string
  rating: string
  description: string
  ownerEmail: string
  logo: string
  category: string
  related_images: string[]
  totalMenus: number
  subscription: Subscription
  status: string
  slug: string
  operating_hours: OperatingHours
  created_at: string
  updated_at: string
}

export interface Subscription {
  endDate: string
  startDate: string
}

export interface OperatingHours {
  open: string
  close: string
}
