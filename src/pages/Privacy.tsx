import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p>
                HeartCareAI collects health information you provide during risk assessments, including age, blood pressure, 
                cholesterol levels, and other cardiovascular indicators. We also collect account information such as name, 
                email address, and usage data to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
              <p>
                Your health data is used exclusively to provide personalized cardiovascular risk assessments through our AI models. 
                We may also use aggregated, anonymized data for research and to improve our algorithms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">3. Data Security</h2>
              <p>
                We implement industry-standard security measures including end-to-end encryption, HIPAA-compliant infrastructure, 
                and regular security audits. Your health information is stored securely and is never shared with third parties 
                without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">4. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information at any time. You can also request 
                a copy of your data or opt out of certain data processing activities by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">5. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our 
                services. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">6. Changes to This Policy</h2>
              <p>
                We may update this privacy policy periodically. We will notify you of any significant changes via email or 
                through our platform. Your continued use of HeartCareAI after such changes constitutes acceptance of the 
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">7. Contact Us</h2>
              <p>
                If you have any questions or concerns about our privacy practices, please contact us at 
                privacy@heartcareai.com or through our contact page.
              </p>
            </section>

            <p className="text-sm mt-8">Last updated: January 2024</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
