import { useSEO } from "@/hooks/use-seo";

export default function TermsPage() {
  useSEO("Terms of Service");

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-card border border-border/50 p-8 md:p-12 rounded-3xl shadow-sm">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="lead text-lg mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing and using the Reclaim Accounts application and website ("Services"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our Services.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-6">
            Reclaim Accounts provides tools and resources for account recovery, status checking, and related cybersecurity news. We reserve the right to modify, suspend, or discontinue any part of the Services at any time without prior notice.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. User Conduct</h2>
          <p className="mb-4">
            You agree to use the Services only for lawful purposes. You are prohibited from:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Using the Service to attempt unauthorized access to accounts not belonging to you.</li>
            <li>Using the Service in any way that could damage, disable, overburden, or impair our servers or networks.</li>
            <li>Attempting to gain unauthorized access to any part of the Services or other accounts through hacking, password mining or any other means.</li>
            <li>Using the Services for any illegal or unauthorized purpose.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Disclaimer of Warranties</h2>
          <p className="mb-6">
            The Services are provided "as is" and "as available" without any warranty of any kind, either express or implied. Reclaim Accounts does not guarantee that the Services will meet your requirements or be uninterrupted, secure, or error-free. Account recovery is not guaranteed.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Limitation of Liability</h2>
          <p className="mb-6">
            In no event shall Reclaim Accounts be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Contact Information</h2>
          <p className="mb-6">
            For any questions regarding these Terms of Service, please contact legal@reclaimaccounts.com.
          </p>
        </div>
      </div>
    </div>
  );
}