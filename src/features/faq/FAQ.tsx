import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent} from "@/components/ui/card"

export  function FAQ() {
  return (
    <div className="container mx-auto  py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-gray-600">
          Find answers to the most common questions about our restaurant menu service.
        </p>
      </div>

      <Card className="">
        <CardContent className="">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">What is this website about?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our website will help you find out about the menus of various restaurants and their details. You can
                easily find all the important information you need, including the price of the menu items, the
                restaurant's address, phone number, etc.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">Is the information always accurate?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We try to keep all menus up-to-date, but if you notice something wrong, you can contact us.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">
                How can I suggest a new restaurant to be added?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                To add a new restaurant, please contact us directly using the information provided on our 'Contact Us'
                page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-medium">
                Do I need to sign up to use the website?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can use our website without signing up. But if you want to add your restaurant, you must sign up.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

FAQ.displayName = "FAQ"