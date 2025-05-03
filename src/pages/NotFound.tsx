import { Button } from "@/components/ui/button"
import { Search, Home, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 md:py-24 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative h-24 w-24 rounded-full bg-[#f5b100]/10 p-4">
            <Search className="h-full w-full text-[#f5b100]" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-gray-900 md:text-7xl">404</h1>
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">Page not found</h2>

        <p className="mb-8 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild className="bg-[#f5b100] hover:bg-[#d99e00] focus:ring-[#f5b100]">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
            <Link to="/faq">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to FAQ
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          If you believe this is an error, please{" "}
          <Link to="/contact" className="font-medium text-[#f5b100] hover:text-[#d99e00]">
            contact our support team
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
