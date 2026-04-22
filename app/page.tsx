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
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Empower Your Sales with <span className="text-indigo-600 dark:text-indigo-400">NextGen CRM</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">
            Streamline your customer relationships, manage pipelines, and close deals faster with our intuitive CRM management tool.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline-2"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="rounded-md border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:text-indigo-400 dark:border-indigo-400"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Core CRM Capabilities */}
        <section id="features" className="max-w-5xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Advanced Contact Management</h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Keep all your contacts organized and accessible with detailed profiles, notes, and interaction history.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Pipeline & Deal Tracking</h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Visualize your sales pipeline, track deal stages, and forecast revenue with ease.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-[#1e2a47] hover:shadow-indigo-500/30 transition-shadow cursor-default">
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Automated Task & Follow-ups</h3>
            <p className="text-zinc-600 dark:text-zinc-300">
              Never miss a follow-up with reminders, task scheduling, and automated notifications to boost your productivity.
            </p>
          </div>
        </section>

        {/* Pipeline / Contacts / Deals Messaging */}
        <section className="max-w-4xl mx-auto text-center space-y-6 px-4 sm:px-0">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Manage Your Pipeline, Contacts, and Deals All in One Place</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg max-w-xl mx-auto">
            Our CRM brings together your sales pipeline, contacts, and deals into a single, easy-to-use dashboard. Quickly access insights and make informed decisions to accelerate your sales process.
          </p>
        </section>

        {/* Trust and Value Highlights */}
        <section className="bg-indigo-600 dark:bg-indigo-700 rounded-lg p-12 max-w-5xl mx-auto text-white grid grid-cols-1 sm:grid-cols-3 gap-8 text-center shadow-lg animate-float">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Trusted by Hundreds</h3>
            <p>Join hundreds of businesses worldwide who rely on us to power their sales teams.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">24/7 Support</h3>
            <p>Our expert support team is available around the clock to help you succeed.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Scalable & Secure</h3>
            <p>Built on a secure, scalable platform that grows with your business needs.</p>
          </div>
        </section>

        {/* Calls to Action */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Ready to Transform Your Sales?</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg">
            Sign up today and start managing your customer relationships more effectively with our powerful CRM.
          </p>
          <a
            href="/auth/signup"
            className="inline-block rounded-md bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline-2"
          >
            Get Started Free
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
    </div>
  );
}