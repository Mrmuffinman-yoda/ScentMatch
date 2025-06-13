import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="w-full max-w-7xl mx-auto">
        <div data-theme="" className="navbar bg-base-100 shadow-sm">
          <div className="flex-1 ">
            <Link href="/">
              <img
                className="w-20"
                src="/api/minio/scentmatch/core/logoWithText.webp"
                alt="ScentMatch"
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
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="/api/minio/scentmatch/core/noprofile.webp"
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
