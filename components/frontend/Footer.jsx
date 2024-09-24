"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import React, { useState } from "react";
import Link from "next/link";
import { FacebookIcon, TwitterIcon } from "react-share";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <section>
      <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Logo and Social Links Section */}
          <div className="space-y-4">
            <Image src={logo} width={200} height={200} alt="PrintSix logo" />
            <p className="text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Recusandae nobis aliquam ex quaerat! Unde animi, inventore
              nesciunt totam velit quia numquam aut, eos molestiae suscipit
              dolorem facere labore libero blanditiis.
            </p>
            <div className="flex space-x-1">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <FacebookIcon className="h-8" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <TwitterIcon className="h-8" />
              </Link>
            </div>
          </div>

          {/* PrintSix Solutions Links Section */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-primary tracking-wider">
              PrintSix Solutions
            </h3>
            <div className="mt-4 space-y-4">
              <Link
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services Links Section */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-primary tracking-wider">
              Services
            </h3>
            <div className="mt-4 space-y-4">
              <Link
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Shipping Options
              </Link>
              <Link
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Free Delivery Eligibility
              </Link>
              <Link
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Support Center
              </Link>
              <Link
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Marketing
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-gray-800 py-4">
        <div className="container">
          <p className="text-white text-center">
            PrintSix Solutions - All Right Reserved 2024
          </p>
        </div>
      </div>
    </section>
  );
};
export default Footer;
