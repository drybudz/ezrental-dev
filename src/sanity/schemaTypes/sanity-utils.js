import { createClient, groq } from "next-sanity"
import clientConfig from "./../config/client-config"

export async function getAllEZRentalData() {
    return createClient(clientConfig).fetch(
      groq`{
        "homePage": *[_type == "homePage"][0]{
          // Hero Section
          heroText,
          heroImage{
            asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt
          },
          
          // Centered Content Section
          centeredTitle,
          centeredDescription,
          
          // Navigation
          mainMenu[]{
            linkText,
            linkUrl,
            linkTarget
          }
        }
      }`
    );
}