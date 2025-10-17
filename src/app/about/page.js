'use client';

import { useAppContext } from "../components/AppContext";
import HeroBanner from "../components/sections/HeroBanner";

export default function About() {
  const context = useAppContext();

  if (!context) {
    return <div>Loading...</div>;
  }

  const { allData } = context;
  const aboutPageData = allData?.aboutPage || null;

  return (
    <div className="aboutPage">
      <HeroBanner 
        heroText={aboutPageData?.heroText}
        heroImage={aboutPageData?.heroImage}
      />
    </div>
  );
}

