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
            crop,
            hotspot,
            alt
          },
          loaderSettings{
            image{
              asset->{
                url,
                metadata {
                  dimensions,
                  lqip
                }
              },
              crop,
              hotspot,
              alt
            },
            size,
            animationDuration,
            backgroundColor,
            displayDuration
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
              crop,
              hotspot,
              alt
            },
            steps[]{
              counter,
              description
            }
          },
          
          // 50Contact Section
          fiftyContact{
            image{
              asset->{
                url,
                metadata {
                  dimensions,
                  lqip
                }
              },
              crop,
              hotspot,
              alt
            },
            title,
            description,
            cta{
              text,
              url,
              target
            }
          },
          
          // Left Info Banner Section
          leftInfoBanner{
            header,
            image{
              asset->{
                url,
                metadata {
                  dimensions,
                  lqip
                }
              },
              crop,
              hotspot,
              alt
            },
            title,
            description,
            cta{
              text,
              url,
              target
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
            crop,
            hotspot,
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
            crop,
            hotspot,
            alt
          },
          fiftySection{
            header,
            image{
              asset->{
                url,
                metadata {
                  dimensions,
                  lqip
                }
              },
              crop,
              hotspot,
              alt
            },
            title,
            description,
            cta{
              text,
              url,
              target
            }
          },
          aboutSection{
            items[]{
              headline,
              title,
              description
            },
            image{
              asset->{
                url,
                metadata {
                  dimensions,
                  lqip
                }
              },
              alt
            }
          },
          quoteTitle,
          quoteImage{
            asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            crop,
            hotspot,
            alt
          }
        },
        "servicesPage": *[_type == "servicesPage"][0]{
          heroText,
          heroDescription,
          heroImage{
            asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            crop,
            hotspot,
            alt
          },
          servicesImage{
            asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            crop,
            hotspot,
            alt
          },
          services[]{
            title,
            description,
            servicesDetails
          },
          quoteTitle,
          quoteImage{
            asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            crop,
            hotspot,
            alt
          }
        },
        "contactPage": *[_type == "contactPage"][0]{
          title,
          description,
          contactTypes[]{
            value
          }
        }
      }`
    );
}