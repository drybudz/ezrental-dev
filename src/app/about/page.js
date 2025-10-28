'use client';

import { useAppContext, Loading } from "../components/AppContext";
import HeroBanner from "../components/sections/HeroBanner";
import FiftySection from "../components/sections/FiftySection";
import QuoteSection from "../components/sections/QuoteSection";
import Footer from "../components/sections/Footer";

export default function About() {
  const context = useAppContext();

  if (!context) {
    return <Loading />;
  }

  const { allData } = context;
  const aboutPageData = allData?.aboutPage || null;
  const homePageData = allData?.homePage || null;

  return (
    <div className="aboutPage">
      <HeroBanner 
        heroText={aboutPageData?.heroText}
        heroImage={aboutPageData?.heroImage}
      />
      <QuoteSection 
        quoteTitle={aboutPageData?.quoteTitle}
        quoteImage={aboutPageData?.quoteImage}
      />
      <FiftySection fiftySection={aboutPageData?.fiftySection} />
      <Footer footerData={homePageData} />
    </div>
  );
}

