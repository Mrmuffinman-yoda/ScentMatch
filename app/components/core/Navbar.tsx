"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1 ">
            <Link href="/">
              <Image
                className="w-20"
                src="/api/minio/scentmatch/core/logoWithText.webp"
                alt="ScentMatch"
                width={120}
                height={40}
                unoptimized
                priority
              />
            </Link>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
            {/* TODO: once the user is logged in, change this button to a drop down instead of routing to the login page */}
            <Link href="/login">
              <div className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="User profile"
                    src="/api/minio/scentmatch/core/noprofile.webp"
                    width={40}
                    height={40}
                    className="w-10 rounded-full"
                    unoptimized
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
