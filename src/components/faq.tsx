import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import StarBackground from "./StarBackground"

export function Faq() {
    const faqs = [
        {
            question: 'What is Plant.AI?',
            answer:
                'HealPlant.AI is an AI-powered plant assistant that identifies plant species and detects possible diseases from photos, then provides care and treatment recommendations.',
        },
        {
            question: 'How does the plant scan work?',
            answer:
                'You upload a photo of your plant, and our AI analyzes the image to identify the plant and possible health problems within seconds.',
        },
        {
            question: 'Can Plant.AI detect plant diseases?',
            answer:
                'Yes. It can recognize many common issues such as pests, fungal infections, overwatering, and nutrient deficiencies and suggest what to do next.',
        },
        {
            question: 'How accurate are the results?',
            answer:
                'Our AI models are trained on large plant datasets and provide high accuracy for common plants and conditions, but results are guidance and not a replacement for a professional botanist.',
        },
        {
            question: 'Is Plant.AI free to use?',
            answer:
                'A free version with limited scans is available. Premium plans unlock unlimited scans, advanced diagnostics, and detailed care features.',
        },
        {
            question: 'Who is Plant.AI for?',
            answer:
                'It is designed for everyone — from beginners and home plant owners to hobby gardeners and small growers who want simple, smart plant care help.',
        },
    ]


    return (
        <section className="py-16 bg-gradient-to-b from-[#00C3C1]/65 to-white animate-fade-in-up">
            <StarBackground />
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl font-bold dark:[text-shadow:1px_1px_2px_black]">Frequently Asked Questions</h2>
                    <p className="max-w-2xl mx-auto dark:[text-shadow:1px_1px_2px_black]">
                       Quick answers about using HealPlant.AI to identify and heal your plants.
                    </p>
                </div>

                <div className="flex flex-wrap gap-8 max-w-6xl mx-auto">
                    <Accordion type="single" collapsible className="flex flex-wrap gap-8 w-full ">
                        {faqs.map((faq, index) => (
                            <div key={index} className="w-full lg:w-[calc(50%-1rem)]">
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="rounded-2xl border border-border bg-background shadow-xl"
                                >
                                    <AccordionTrigger className="px-6 py-4 text-left font-medium text-base leading-snug break-words">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        ))}
                    </Accordion>
                </div>

            </div>
        </section>
    )
}
