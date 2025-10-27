'use client';

import { useAppContext, Loading } from "../components/AppContext";
import ContactForm from "../components/sections/ContactForm";
import Footer from "../components/sections/Footer";

export default function Contact() {
  const context = useAppContext();

  if (!context) {
    return <Loading />;
  }

  const { allData } = context;
  const contactPageData = allData?.contactPage || null;
  const homePageData = allData?.homePage || null;

  console.log("Contact Page Data:", contactPageData);

  return (
    <div className="contactPage">
      <ContactForm contactPageData={contactPageData} />
      <Footer footerData={homePageData} />
    </div>
  );
}

