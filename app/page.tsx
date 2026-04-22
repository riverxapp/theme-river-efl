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
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">LiteStack: Simplify Your Business Management

          </h1>
          <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">Centralize your contacts and customer information for smarter and personalized interactions.

          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline-2">Start Free Trial


            </a>
            <a
              href="#features"
              className="rounded-md border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:text-indigo-400 dark:border-indigo-400">Discover Features


            </a>
          </div>
        </section>

        {/* Core CRM Capabilities */}
        <section id="features" className="max-w-5xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Unified Contact & Customer Management</h3>
            <p className="text-zinc-600 dark:text-zinc-300">Track sales opportunities clearly and forecast outcomes with intuitive pipeline visualization.

            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Visual Pipeline & Deal Insights</h3>
            <p className="text-zinc-600 dark:text-zinc-300">Stay on top of your to-dos and follow-ups with automated notifications to keep deals moving.

            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Automated Tasks & Reminders</h3>
            <p className="text-zinc-600 dark:text-zinc-300">LiteStack integrates pipeline, contacts, deals, and collaboration tools into a clean, unified dashboard for productive teams.

            </p>
          </div>
        </section>

        {/* Pipeline / Contacts / Deals Messaging */}
        <section className="max-w-4xl mx-auto text-center space-y-6 px-4 sm:px-0">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">All Your Business Tools in One Place</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg max-w-xl mx-auto">Thousands of businesses trust LiteStack to power their growth and customer success.

          </p>
        </section>

        {/* Trust and Value Highlights */}
        <section className="bg-indigo-600 dark:bg-indigo-700 rounded-lg p-12 max-w-5xl mx-auto text-white grid grid-cols-1 sm:grid-cols-3 gap-8 text-center shadow-lg animate-float">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Trusted by Growing Companies</h3>
            <p>Our dedicated support team is here whenever you need assistance.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Around-the-Clock Support</h3>
            <p>Built on a robust platform designed to grow with your business securely.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Enterprise-Grade Security and Scalability</h3>
            <p>Join LiteStack today and unlock the full potential of your business with streamlined tools.</p>
          </div>
        </section>

        {/* Calls to Action */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Transform How You Manage Your Business</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg">
            Sign up today and start managing your customer relationships more effectively with our powerful CRM.
          </p>
          <a
            href="/auth/signup"
            className="inline-block rounded-md bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline-2">Start Free Trial


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