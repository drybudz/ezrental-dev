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
          
          // Horizontal Showcase Section
          horizontalShowcase{
            title,
            items[]{
              image{
                asset->{
                  url,
                  metadata {
                    dimensions,
                    lqip
                  }
                },
                alt
              },
              title,
              description
            }
          },
          
          // Methodology Section
          methodology{
            image{
              asset->{
                url,
                metadata {
                  dimensions,
                  lqip
                }
              },
              alt
            },
            steps[]{
              counter,
              description
            }
          },
          
          // Navigation
          logo{
            asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt
          },
          mainMenu[]{
            linkText,
            linkUrl,
            linkTarget
          },
          
          // Footer
          footerCoordinates,
          footerCoordinatesLink,
          footerPhone,
          footerSocialMedia[]{
            platform,
            url
          },
          footerEmail,
          footerAdditionalLinks[]{
            text,
            url
          }
        },
        "aboutPage": *[_type == "aboutPage"][0]{
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
          }
        }
      }`
    );
}