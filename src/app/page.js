'use client';

import { useAppContext } from "./components/AppContext";
import HeroBanner from "./components/sections/HeroBanner";
import CenteredOrangeContent from "./components/sections/CenteredOrangeContent";
import HorizontalShowcase from "./components/sections/HorizontalShowcase";
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
      <HeroBanner
        heroText={homePageData?.heroText}
        heroImage={homePageData?.heroImage}
      />

      {/* Centered Orange Content Section */}
      <CenteredOrangeContent
        centeredTitle={homePageData?.centeredTitle}
        centeredDescription={homePageData?.centeredDescription}
      />

      {/* Horizontal Showcase Section */}
      <HorizontalShowcase
        horizontalShowcase={homePageData?.horizontalShowcase}
      />
      
      {/* Footer Section */}
      <Footer footerData={homePageData} />
    </div>
  );
}
