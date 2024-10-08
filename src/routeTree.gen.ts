/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PurchaseCompleteImport } from './routes/purchase-complete'
import { Route as ContactImport } from './routes/contact'
import { Route as CheckoutImport } from './routes/checkout'
import { Route as CartImport } from './routes/cart'
import { Route as IndexImport } from './routes/index'
import { Route as ProductIdImport } from './routes/product/$id'

// Create/Update Routes

const PurchaseCompleteRoute = PurchaseCompleteImport.update({
  path: '/purchase-complete',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const CheckoutRoute = CheckoutImport.update({
  path: '/checkout',
  getParentRoute: () => rootRoute,
} as any)

const CartRoute = CartImport.update({
  path: '/cart',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductIdRoute = ProductIdImport.update({
  path: '/product/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/cart': {
      id: '/cart'
      path: '/cart'
      fullPath: '/cart'
      preLoaderRoute: typeof CartImport
      parentRoute: typeof rootRoute
    }
    '/checkout': {
      id: '/checkout'
      path: '/checkout'
      fullPath: '/checkout'
      preLoaderRoute: typeof CheckoutImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/purchase-complete': {
      id: '/purchase-complete'
      path: '/purchase-complete'
      fullPath: '/purchase-complete'
      preLoaderRoute: typeof PurchaseCompleteImport
      parentRoute: typeof rootRoute
    }
    '/product/$id': {
      id: '/product/$id'
      path: '/product/$id'
      fullPath: '/product/$id'
      preLoaderRoute: typeof ProductIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  CartRoute,
  CheckoutRoute,
  ContactRoute,
  PurchaseCompleteRoute,
  ProductIdRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/cart",
        "/checkout",
        "/contact",
        "/purchase-complete",
        "/product/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/cart": {
      "filePath": "cart.tsx"
    },
    "/checkout": {
      "filePath": "checkout.tsx"
    },
    "/contact": {
      "filePath": "contact.tsx"
    },
    "/purchase-complete": {
      "filePath": "purchase-complete.tsx"
    },
    "/product/$id": {
      "filePath": "product/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
