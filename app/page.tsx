import { HeroSection } from "@/components/sections/HeroSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <MembersSection />
      <EventsSection />
      <ContactSection />
    </div>
  );
}
