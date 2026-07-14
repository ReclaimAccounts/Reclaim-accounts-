import { useSEO } from "@/hooks/use-seo";

export default function PrivacyPage() {
  useSEO("Privacy Policy");

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-card border border-border/50 p-8 md:p-12 rounded-3xl shadow-sm">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="lead text-lg mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            At Reclaim Accounts, we take your privacy seriously. We collect information to provide better services to our users. The types of personal information we collect include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Information you provide to us directly (such as when creating an account).</li>
            <li>Information we get from your use of our services (such as device information, log information).</li>
            <li>Information we receive from other sources to help recover your accounts.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Information</h2>
          <p className="mb-4">
            We use the information we collect from all of our services for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To provide, maintain, and improve our services.</li>
            <li>To develop new services.</li>
            <li>To provide personalized services, including content and ads.</li>
            <li>To measure performance and analyze how our services are used.</li>
            <li>To communicate with you about your account or our services.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Information Sharing</h2>
          <p className="mb-6">
            We do not share personal information with companies, organizations, or individuals outside of Reclaim Accounts except in the following cases: with your consent, for legal reasons, or with domain administrators.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Data Security</h2>
          <p className="mb-6">
            We work hard to protect Reclaim Accounts and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We use encryption to keep your data private while in transit.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact us at privacy@reclaimaccounts.com.
          </p>
        </div>
      </div>
    </div>
  );
}