"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const response = await fetch("/api/core/getUsername", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        setUsername(null); // Clear username if not authenticated
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUsername(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.info("Fetching user data...");
    fetchUser();
  }, []);

  // Re-fetch user data when pathname changes to homepage
  useEffect(() => {
    if (pathname === "/") {
      fetchUser();
    }
  }, [pathname]);

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
            {loading ? (
              <div className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            ) : username ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
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
                <span>
                  <p data-theme="">{username}</p>
                </span>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
