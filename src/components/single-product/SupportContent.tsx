import SupportForm from "./SupportForm";

export default function SupportContent() {
  return (
    <div className="space-y-4 text-pretty font-light">
      <p>Get in touch with our team today</p>
      <p className="text-balance">
        Need any help? Send us a message using the form below and we&apos;ll get
        back to you as fast as we can.
      </p>
      <SupportForm />
    </div>
  );
}
