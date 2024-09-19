import { useSEO } from "../../hooks/useSEO";
import ContactDetails from "./ContactDetails";
import HeadingSection from "./HeadingSection";

export default function Contact() {
  // SEO hook to update the page title and meta
  useSEO({
    title: "Mr Cap's Store | Contact Us",
    description:
      "Get in touch with us at Mr Cap's Store. We're here to assist you with your inquiries.",
    keywords: "Mr Cap's Store, contact, customer service, inquiries",
    currentPath: "/contact",
    ogTitle: "Mr Cap's Store | Contact Us",
    ogDescription:
      "Reach out to Mr Cap's Store for any inquiries or customer support.",
    ogImage: "/assets/logo.png",
    ogUrl: window.location.href, // To dynamically get the current URL
  });

  return (
    <div className="mx-auto px-4 sm:max-w-4xl md:max-w-5xl md:px-10 xl:max-w-7xl">
      <HeadingSection />
      <ContactDetails />
    </div>
  );
}
