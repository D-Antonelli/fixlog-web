"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rental Property Maintenance Log</title>
        <meta
          name="description"
          content="Manage and track property maintenance easily with media uploads, document management, and repair timelines."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/property-icon.png" />
      </Head>
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-full h-full bg-gradient-to-b from-blue-100 to-yellow-50 flex flex-col justify-center items-center">
          <div className="max-w-screen-xl h-full px-6 sm:px-4">
            {/* Logo Section */}
            <div className="w-full flex justify-start items-center mt-12">
              <Image src="/fixlog-logo.png" alt="Property Log Logo" height={40} width={130} />
            </div>
            {/* Hero Section */}
            <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-12 mt-6">
              <div className="md:w-1/2 w-full flex flex-col gap-4 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                  Track Property Maintenance Seamlessly
                </h1>
                <p className="text-base md:text-lg text-gray-600">
                  Tired of email exchanges for getting property stuff fixed? Capture, upload, and manage property issues in real-time with simply maintenance log.
                </p>
                <Link
                  href="/login"
                  className="bg-green-500 text-white rounded-lg px-4 py-3 md:px-5 md:py-3 text-base md:text-lg transition hover:bg-green-400"
                >
                  Get Started Today
                </Link>
              </div>
              {/* Image */}
              <div className="md:w-1/2 w-full flex justify-center items-center">
                <Image
                  src="/maintenance-hero.png"
                  alt="Maintenance hero"
                  height={500}
                  width={500}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
          {/* Footer */}
          <footer className="bg-blue-500 w-full py-4 mt-8">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between text-white text-center md:text-left">
              <p className="text-sm">&copy; 2024 FixLog | All Rights Reserved</p>
              <div className="flex gap-4 justify-center md:justify-end mt-2 md:mt-0">
                <a href="" target="_blank">Twitter</a>
                <a href="" target="_blank">Discord</a>
                <a href="" target="_blank">YouTube</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}