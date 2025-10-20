'use client';

import { useAppContext } from "../components/AppContext";
import HeroBanner from "../components/sections/HeroBanner";

export default function Services() {
  const context = useAppContext();

  if (!context) {
    return <div>Loading...</div>;
  }

  const { allData } = context;
  const servicesPageData = allData?.servicesPage || null;

  return (
    <div className="servicesPage">
      <HeroBanner 
        heroText={servicesPageData?.heroText}
        heroImage={servicesPageData?.heroImage}
      />
    </div>
  );
}
