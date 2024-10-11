import { Suspense } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ScrollRestoration } from "@tanstack/react-router";

import Header from "../components/Header";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

/**
 * This is the root route of the application.
 *
 * The root layout includes the Header, Footer, and a Suspense wrapper
 * that displays a Loader while the nested routes (via `Outlet`) are loading.
 *
 * - The `<main>` tag wraps the primary content area, which can be dynamically replaced by nested routes.
 * - `<Suspense>` is used to show a fallback Loader during async loading of components.
 * - `<ScrollRestoration>` is added to manage scroll positions when navigating between routes.
 *
 * @returns {JSX.Element} The root layout for the app.
 */
export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  ),
});
