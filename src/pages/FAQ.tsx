import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate is HeartCareAI?",
      answer: "Our AI models achieve over 98% accuracy, trained on thousands of medical records using advanced machine learning algorithms including Random Forest, XGBoost, and LightGBM.",
    },
    {
      question: "Is my health data secure?",
      answer: "Absolutely. We use HIPAA-compliant infrastructure with end-to-end encryption to ensure your health data remains completely private and secure. Your information is never shared with third parties.",
    },
    {
      question: "Do I need a doctor's referral to use HeartCareAI?",
      answer: "No, HeartCareAI is designed to be accessible to everyone. However, our assessments are meant to complement, not replace, professional medical advice. Always consult with your healthcare provider for diagnosis and treatment.",
    },
    {
      question: "How long does an assessment take?",
      answer: "The entire assessment process takes less than 5 minutes. Once you submit your health parameters, our AI provides instant results in under 3 seconds.",
    },
    {
      question: "What should I do if I receive a high-risk score?",
      answer: "If you receive a high-risk assessment, we recommend scheduling an appointment with a cardiologist or your primary care physician as soon as possible. Our platform provides detailed recommendations to guide your next steps.",
    },
    {
      question: "Can I track my risk over time?",
      answer: "Yes! With a registered account, you can save your assessments and track how your cardiovascular risk changes over time as you implement lifestyle modifications.",
    },
    {
      question: "What health parameters do I need to provide?",
      answer: "You'll need basic health metrics including age, blood pressure, cholesterol levels, resting heart rate, exercise habits, and information about any chest pain. Most of these can be obtained from a recent health checkup.",
    },
    {
      question: "Is HeartCareAI available 24/7?",
      answer: "Yes, our platform is available round-the-clock, allowing you to perform risk assessments and access your health data anytime, anywhere.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1">
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about HeartCareAI
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
