import ContactDetails from "./ContactDetails";
import HeadingSection from "./HeadingSection";

export default function Contact() {
  return (
    <div className="mx-auto px-4 sm:max-w-4xl md:max-w-5xl md:px-10 xl:max-w-7xl">
      <HeadingSection />
      <ContactDetails />
    </div>
  );
}
