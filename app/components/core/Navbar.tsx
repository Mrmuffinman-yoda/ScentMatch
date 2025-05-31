import React from "react";
import PageContainer from "../general/PageContainer";

const Navbar = () => {
  return (
    <div>
      <PageContainer pb={2}>
        <div data-theme="" className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <a href="/">
              <img
                className="w-20"
                src="/api/minio/scentmatch/core/logoWithText.png"
                alt="ScentMatch"
              />
            </a>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="/api/minio/scentmatch/core/noprofile.png"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Navbar;
