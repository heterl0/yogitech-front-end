import MainLayout from "@/layouts/main";
import AboutUsHeroSection from "../sections/about-us-hero-section";
import AboutUsOverviewSection from "../sections/about-us-overview-section";
import AboutUsOurTeamSection from "../sections/about-us-our-team-section";

const AboutUsViewV2 = () => {
  return (
    <MainLayout isDisableOffsetBlur>
      <div className="flex flex-col">
        {/* Hero Section */}
        <AboutUsHeroSection />
        {/* Overview Section */}
        <AboutUsOverviewSection />
        {/* Our Team Section */}
        <AboutUsOurTeamSection />
      </div>
    </MainLayout>
  );
};

export default AboutUsViewV2;
