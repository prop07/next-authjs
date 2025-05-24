import type { Metadata } from "next";

const metadataMap: Record<string, Metadata> = {
  home: {
    title: "Home | My Next.js App",
    description: "Welcome to my Next.js application homepage",
  },
  about: {
    title: "About Us | My Next.js App",
    description: "Learn more about our company and team",
  },
  contact: {
    title: "Contact Us | My Next.js App",
    description: "Get in touch with our team",
  },
  login: {
    title: "Login | My Next.js App",
    description: "Login to your account",
  },
};

const baseUrl = "https://yourdomain.com";

export function getMetadata(page: string): Metadata {
  const data = metadataMap[page] || metadataMap["home"];
  return {
    ...data,
    openGraph: {
      ...data,
      url: `${baseUrl}/${page === "home" ? "" : page}`,
      images: [
        {
          url: `/og-image-${page}.jpg`,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}
