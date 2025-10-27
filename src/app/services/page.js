'use client';

import { useAppContext, Loading } from "../components/AppContext";
import HeroBanner from "../components/sections/HeroBanner";
import Footer from "../components/sections/Footer";

export default function Services() {
  const context = useAppContext();

  if (!context) {
    return <Loading />;
  }

  const { allData } = context;
  const servicesPageData = allData?.servicesPage || null;
  const homePageData = allData?.homePage || null;

  return (
    <div className="servicesPage">
      <HeroBanner 
        heroText={servicesPageData?.heroText}
        heroImage={servicesPageData?.heroImage}
      />
      <Footer footerData={homePageData} />
    </div>
  );
}
