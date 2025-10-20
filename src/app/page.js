'use client';

import { useAppContext } from "./components/AppContext";
import HeroBannerGSAP from "./components/sections/HeroBannerGSAP";
import CenteredOrangeContentGSAP from "./components/sections/CenteredOrangeContentGSAP";
import HorizontalShowcaseGSAP from "./components/sections/HorizontalShowcaseGSAP";
import Methodology from "./components/sections/Methodology";
import Footer from "./components/sections/Footer";

export default function Home() {
  const context = useAppContext();

  if (!context) {
    return <div>Loading...</div>;
  }

  const { allData } = context;
  const homePageData = allData?.homePage || null;
  console.log("@H------Home Page Data:", homePageData); //checkign for featuredProjects

  return (
    <div className="homePage">
      {/* Hero Banner Section */}
      <HeroBannerGSAP
        heroText={homePageData?.heroText}
        heroImage={homePageData?.heroImage}
      />

      {/* Centered Orange Content Section */}
      <CenteredOrangeContentGSAP
        centeredTitle={homePageData?.centeredTitle}
        centeredDescription={homePageData?.centeredDescription}
      />

      {/* Horizontal Showcase Section */}
      <HorizontalShowcaseGSAP
        horizontalShowcase={homePageData?.horizontalShowcase}
      />

      {/* Methodology Section */}
      <Methodology methodology={homePageData?.methodology} />
      
      {/* Footer Section */}
      <Footer footerData={homePageData} />
    </div>
  );
}
