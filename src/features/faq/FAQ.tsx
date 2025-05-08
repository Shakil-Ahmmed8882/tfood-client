import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    question: "What is this website about?",
    answer:
      "Our website will help you find out about the menus of various restaurants and their details. You can easily find all the important information you need, including the price of the menu items, the restaurant's address, phone number, etc.",
  },
  {
    question: "Is the information always accurate?",
    answer:
      "We try to keep all menus up-to-date, but if you notice something wrong, you can contact us.",
  },
  {
    question: "How can I suggest a new restaurant to be added?",
    answer:
      "To add a new restaurant, please contact us directly using the information provided on our 'Contact Us' page.",
  },
  {
    question: "Do I need to sign up to use the website?",
    answer:
      "You can use our website without signing up. But if you want to add your restaurant, you must sign up.",
  },
]

export function FAQ() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Find answers to the most common questions about our restaurant menu service.
        </p>
      </div>

      <Card>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="cursor-pointer">
                <AccordionTrigger className="text-left font-medium cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

FAQ.displayName = "FAQ"
