import React, { Suspense } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense fallback={<Loader />}>
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
      {/* <Suspense>
        <TanStackRouterDevtools />
      </Suspense> */}
    </div>
  ),
});
