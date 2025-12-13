'use client';

import { useState } from 'react';
import { useAppContext } from "./components/AppContext";
import HeroBannerLoader from "./components/sections/HeroBannerLoader";
import HeroBannerGSAP from "./components/sections/HeroBannerGSAP";
import CenteredOrangeContentGSAP from "./components/sections/CenteredOrangeContentGSAP";
// import HorizontalShowcaseGSAP from "./components/sections/HorizontalShowcaseGSAP";
import HorizontalShowcaseGalleryGSAP from "./components/sections/HorizontalShowcaseGalleryGSAP";
import Methodology from "./components/sections/Methodology";
import LeftInfoBanner from "./components/sections/LeftInfoBanner";
// import FiftyContact from "./components/sections/FiftyContact";
import Footer from "./components/sections/Footer";

export default function Home() {
  const context = useAppContext();
  const [loaderFinished, setLoaderFinished] = useState(false);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { allData } = context;
  const homePageData = allData?.homePage || null;
  console.log("@H------Home Page Data:", homePageData); //checkign for featuredProjects

  return (
    <div className="homePage">
      {/* Loader Component */}
      <HeroBannerLoader
        loaderSettings={homePageData?.loaderSettings}
        onComplete={() => setLoaderFinished(true)}
      />

      {/* Hero Banner Section */}
      <HeroBannerGSAP
        heroText={homePageData?.heroText}
        heroImage={homePageData?.heroImage}
        heroVideo={homePageData?.heroVideo}
        loaderFinished={loaderFinished}
      />

      {/* Centered Orange Content Section */}
      <CenteredOrangeContentGSAP
        centeredTitle={homePageData?.centeredTitle}
        centeredDescription={homePageData?.centeredDescription}
      />

      {/* Horizontal Showcase Gallery Section */}
      <HorizontalShowcaseGalleryGSAP
        horizontalShowcase={homePageData?.horizontalShowcase}
      />
      
      {/* Horizontal Showcase Section - OLD (commented out) */}
      {/* <HorizontalShowcaseGSAP
        horizontalShowcase={homePageData?.horizontalShowcase}
      /> */}

      {/* Methodology Section */}
      <Methodology methodology={homePageData?.methodology} />
      
      {/* Left Info Banner Section */}
      <LeftInfoBanner leftInfoBanner={homePageData?.leftInfoBanner} />
      
      {/* 50Contact Section - commented out */}
      {/* <FiftyContact fiftyContact={homePageData?.fiftyContact} /> */}
      
      {/* Footer Section */}
      <Footer footerData={homePageData} />
    </div>
  );
}
