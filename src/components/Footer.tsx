import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="mx-auto mt-10 w-full items-center justify-between px-4 sm:max-w-4xl md:mt-20 md:max-w-5xl md:px-10 xl:max-w-7xl">
      <div className="bg-muted flex w-full grid-cols-3 flex-col rounded-2xl xl:grid">
        <div className="flex flex-col justify-between py-2 md:flex-row md:items-center xl:flex-col xl:items-start xl:justify-start">
          <div className="p-4">
            <h1 className="text-2xl font-medium sm:text-3xl md:text-4xl">
              Cap&apos;s Store
            </h1>
            <h2 className="text-muted-foreground max-w-64 text-balance py-4 font-light xl:border-b">
              Selling premium products, designed to elevate your everyday
              experience
            </h2>
            <div className="border-b md:hidden" />
          </div>
          <div className="flex gap-4 px-4 py-2 md:-mb-8 xl:mb-0">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/icons/instagram.svg" alt="instagram" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/icons/facebook.svg" alt="facebook" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/icons/linkedin.svg" alt="linked in" />
            </a>
            <a
              href="https://x.com/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/icons/x.svg" alt="x" />
            </a>
          </div>
        </div>
        <div className="justify-between md:flex xl:col-span-2">
          <div className="flex gap-x-20 p-4 pt-10 md:pt-4">
            <div className="">
              <h3 className="text-xl">Pages</h3>
              <div className="py-4">
                <Link to="/" className="text-muted-foreground block py-2">
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-muted-foreground block whitespace-nowrap py-2"
                >
                  About Us
                </Link>
                <Link to="/" className="text-muted-foreground block py-2">
                  Sale
                </Link>
              </div>
            </div>
            <div className="">
              <h3 className="text-xl">Support</h3>
              <div className="py-4">
                <Link to="/faq" className="text-muted-foreground block py-2">
                  FAQ
                </Link>
                <Link
                  to="/contact"
                  className="text-muted-foreground block py-2"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/2 xl:w-full">
            <img
              src="/assets/map.png"
              alt="map"
              className="ml-auto aspect-[4/2] rounded-2xl object-cover xl:h-64 xl:pl-10"
            />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground py-2 text-sm">
        2024 © designed & developed by devmarty.com
      </p>
    </footer>
  );
}
