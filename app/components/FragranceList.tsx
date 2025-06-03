import React from "react";

const FragranceList = () => {
  return (
    <div data-theme="" className="p-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Most popular fragrances of this week
        </li>

        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Turathi Electric</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Afnan
            </div>
          </div>
        </li>

        <li className="list-row justify-center">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/4@94.webp"
            />
          </div>
          <div>
            <div>Hawas Elixir</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Rasasi
            </div>
          </div>
        </li>

        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/3@94.webp"
            />
          </div>
          <div>
            <div>Art of universe</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Lattafa
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FragranceList;
