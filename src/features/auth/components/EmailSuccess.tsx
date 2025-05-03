import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function EmailSuccess() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4 my-28">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col items-center justify-center pt-10 pb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-center">Email Sent Successfully!</h1>
        </CardHeader>
        <CardContent className="text-center   text-muted-foreground">
          <p className="mb-2 font-semibold">
            We've sent you an email with a link to reset your password.
          </p>
          <p>
            Please check your inbox and follow the instructions provided in the
            email. After resetting your password, you can login with your email
            and new password.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-10">
          <Link to="/">
            <Button size="lg" className="w-full text-gary-900 bg-yellow-500 hover:bg-yellow-200  px-8 py-6 my-5 md:my-10 cursor-pointer">Back to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

