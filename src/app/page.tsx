import { AchievementsSection } from "@/components/sections/achievements-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { FocusSection } from "@/components/sections/focus-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorkSection } from "@/components/sections/work-section";

export default function Page() {
  return (
    <>
      <HeroSection />
      <FocusSection />
      <ExperienceSection />
      <WorkSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
