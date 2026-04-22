// Server Component: keep layout/content server-rendered; sections are data-driven.
import { Navbar as LayoutNavbar } from "@/components/layout/navbar";
import { getAuthSession } from "@/lib/auth/session";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div className={"crm-home min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#e0f2ff] text-zinc-900 transition-colors dark:from-[#0a1828] dark:via-[#0e2340] dark:to-[#142c55] dark:text-[#dbe9ff]"}>
      <LayoutNavbar isLoggedIn={!!session} />
      <main className="flex min-h-screen w-full flex-col gap-16 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-slide">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">LiteStack: CRM for Customers and Leads Management

          </h1>
          <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">Manage your sales pipeline, customer relations, and leads all in one simple platform.

          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={"/auth/signup"}
              className="rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline-2">Get Started Free


            </a>
            <a
              href={"#features"}
              className="rounded-md border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:text-indigo-400 dark:border-indigo-400">Explore Features


            </a>
          </div>
        </section>

        {/* Core CRM Capabilities */}
        <section id="features" className="max-w-5xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Centralized Contact & Customer Records</h3>
            <p className="text-zinc-600 dark:text-zinc-300">Visualize and manage sales opportunities with confidence using our intuitive pipeline tracker.

            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Pipeline Management & Deal Insights</h3>
            <p className="text-zinc-600 dark:text-zinc-300">Automated reminders and follow-ups keep your sales process smooth and efficient.

            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Automations & Team Collaboration</h3>
            <p className="text-zinc-600 dark:text-zinc-300">Unified dashboard integrating contacts, deals, and team collaboration for enhanced productivity.

            </p>
          </div>
        </section>

        {/* Pipeline / Contacts / Deals Messaging */}
        <section className="max-w-4xl mx-auto text-center space-y-6 px-4 sm:px-0">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">All Your CRM Tools in One Place</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg max-w-xl mx-auto">Join thousands of growing businesses leveraging LiteStack's CRM to boost sales and manage leads.

          </p>
        </section>

        {/* Trust and Value Highlights */}
        <section className="bg-indigo-600 dark:bg-indigo-700 rounded-lg p-12 max-w-5xl mx-auto text-white grid grid-cols-1 sm:grid-cols-3 gap-8 text-center shadow-lg animate-float">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Trusted by Fast-Growing Businesses</h3>
            <p>Dedicated support ready to assist you whenever needed.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">24/7 Customer Support</h3>
            <p>Built on a secure platform scaled for business growth.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Enterprise Security & Scalability</h3>
            <p>Unlock your business's potential with LiteStack's streamlined CRM solutions.</p>
          </div>
        </section>

        {/* Calls to Action */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Revolutionize Your Customer Management</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg">Start today and transform how you engage and grow your customer relationships.

          </p>
          <a
            href="/auth/signup"
            className="inline-block rounded-md bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline-2">Start Your Free Trial


          </a>
        </section>
      </main>

      {/* lightweight animations defined locally to avoid tailwind config changes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fade-slide {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-slide {
          animation: fade-slide 0.6s ease both;
        }
      `}</style>
    </div>);

}