"use client";

import Head from "next/head";
import { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <title>My product page</title>
      <meta name="description" content="This is just a store" />

      {/* <meta name="title" content={pageTitle} />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription}></meta>
      <meta name="twitter:image" content={image} />  */}
      {children}
    </>
  );
}
