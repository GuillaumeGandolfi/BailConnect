"use client";
import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProcessSection from "../components/ProcessSection";
import CtaSection from "../components/CTASection";
import FaqSection from "../components/FAQSection";

export default function HomePage() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      <HeroSection />
      <ProcessSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
