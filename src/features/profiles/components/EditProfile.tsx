
import type React from "react"
import { useState } from "react"
import { ArrowLeft, Camera, Mail, MapPin, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import dummyAvater from "../../../assets/dummyAvater.png";
export  function EditProfile() {
  const [profileImage, setProfileImage] = useState(dummyAvater)
  const [formData, setFormData] = useState({
    name: "Zillur",
    email: "abcf@gmail.com",
    phone: "0123456789",
    location: "Savar, Dhaka",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the data to your backend
    console.log("Form submitted:", formData)
    // Redirect to profile page after saving
    // window.location.href = "/profile"
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center">
            <Link to="/profile" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle>Edit Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile picture"
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                </div>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <p className="text-sm text-muted-foreground">Click the camera icon to change your profile picture</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Link to="/profile">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Save Changes</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

