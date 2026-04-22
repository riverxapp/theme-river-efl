import type { Metadata } from "next";
import { Navbar as LayoutNavbar } from "@/components/layout/navbar";
import { LayoutFooterSection } from "@/components/home/LayoutFooterSection";
import { getAuthSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "License | Panda - SaaS App Builder Starter",
  description: "MIT License for the Panda SaaS App Builder Starter repository.",
};

const mitLicenseText = `MIT License

Copyright (c) 2026 Panda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default async function LicensePage() {
  const session = await getAuthSession();

  return (
    <div className="home-dark min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#ffe6d8] text-zinc-900 transition-colors dark:from-[#120d0b] dark:via-[#16100d] dark:to-[#1f1612] dark:text-[#f7efe8]">
      <LayoutNavbar isLoggedIn={!!session} />
      <main className="flex min-h-[70vh] w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        <section className="mx-auto w-full max-w-4xl rounded-2xl border border-secondary bg-card p-6 text-card-foreground shadow-sm sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">License</h1>
          <p className="mt-3 text-sm opacity-80">This project is licensed under the MIT License.</p>
          <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-xl border border-secondary/70 bg-muted/40 p-4 font-mono text-xs leading-relaxed sm:text-sm">
            {mitLicenseText}
          </pre>
        </section>
      </main>
      <div className="px-6 pb-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        <LayoutFooterSection />
      </div>
    </div>
  );
}
