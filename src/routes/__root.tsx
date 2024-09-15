import { Suspense } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { ScrollRestoration } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense fallback={<Loader />}>
        <main className="flex-1">
          <Outlet />
          <ScrollRestoration />
        </main>
        <Footer />
      </Suspense>
    </div>
  ),
});
