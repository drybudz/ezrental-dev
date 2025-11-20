import { AppProvider } from "../components/AppContext";
import { getAllEZRentalData } from "../../sanity/schemaTypes/sanity-utils";

export default async function ComingSoonLayout({ children }) {
  const initialData = await getAllEZRentalData();

  return (
    <AppProvider initialData={initialData}>
      {children}
    </AppProvider>
  );
}

