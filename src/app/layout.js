import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./components/AppContext";
import { getAllEZRentalData } from "../sanity/schemaTypes/sanity-utils";

export const metadata = {
  title: "EZ Rental Website",
  description: "EZ Rental Website built with Next.js and Sanity.io",
};

export default async function RootLayout({ children }) {
  const initialData = await getAllEZRentalData();

  return (
    <html lang="en">
      <body>
        <AppProvider initialData={initialData}>
           {children}
        </AppProvider>
      </body>
    </html>
  );
}
