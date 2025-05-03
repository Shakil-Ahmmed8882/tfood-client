
import { Card } from "@/components/ui/card"
import ContactForm from "@/features/restaurants/contactUs/ContactFrom"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Have questions about our restaurant listings or want to suggest a new restaurant? Get in touch with us.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1">
        {/* Contact Form */}
        <div>
          {/* <Card className="overflow-hidden">
            <div className="bg-[#f5b100]/10 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Send us a message</h2>
              <p className="text-sm text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <div className="p-6">
              <ContactForm />
            </div>
          </Card> */}
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-[#f5b100]" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:info@tfoodbd.com" className="text-gray-600 hover:text-[#f5b100]">
                    tfoodbangladesh@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-[#f5b100]" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <a href="tel:+880 1979401082" className="text-gray-600 hover:text-[#f5b100]">
                    +880 1979401082
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-[#f5b100]" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">Dhaka 1000, Bangladesh</p>
                </div>
              </div>
            </div>
          </Card>

          {/* <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Our Location</h2>
            <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-200">

              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                <MapPin className="mr-2 h-5 w-5" />
                <span>Map location</span>
              </div>
            </div>
          </Card> */}


        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          For restaurant owners: If you want to add your restaurant to our platform,{" "}
          <a href="/sign-up" className="font-medium text-[#f5b100] hover:text-[#d99e00]">
            sign up here
          </a>
          .
        </p>
      </div>
    </div>
  )
}
