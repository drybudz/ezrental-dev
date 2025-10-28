'use client';

import { useAppContext, Loading } from "../components/AppContext";
import HeroBanner from "../components/sections/HeroBanner";
import ServicesAccordion from "../components/sections/ServicesAccordion";
import QuoteSection from "../components/sections/QuoteSection";
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
      <ServicesAccordion 
        servicesImage={servicesPageData?.servicesImage}
        services={servicesPageData?.services}
      />
      <QuoteSection 
        quoteTitle={servicesPageData?.quoteTitle}
        quoteImage={servicesPageData?.quoteImage}
      />
      <Footer footerData={homePageData} />
    </div>
  );
}
