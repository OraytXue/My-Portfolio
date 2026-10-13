import { db } from "@/db";
import { sql } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import ProfileHeader from "@/components/ProfileHeader";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Quote from "@/components/Quote";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { ActiveSectionProvider } from "@/components/ActiveSectionProvider";

export const dynamic = "force-dynamic";

export default async function Home() {
  await db.execute(sql`select 1`);

  return (
    <ActiveSectionProvider>
      <Navbar />
      <ProfileHeader />

      <main className="px-4 md:px-6 py-6 md:py-8 max-w-6xl mx-auto space-y-6">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <About className="md:col-span-2" />
          <Experience className="md:col-span-1 md:row-span-2" />
          <Skills className="md:col-span-2" />
        </div>

        <Projects />
        <Quote />
        <Certifications />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
    </ActiveSectionProvider>
  );
}