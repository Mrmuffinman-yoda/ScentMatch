import React from "react";

const page = () => {
  return (
    <div
      data-theme=""
      className="flex flex-col items-center justify-center h-screen "
    >
      {/*  login page */}
      <form className="" data-theme="">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="email"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <button className="btn mt-4">Login</button>
        <div className="mt-4">
          <a href="/register" className="link">
            Don&apos;t have an account? Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default page;
