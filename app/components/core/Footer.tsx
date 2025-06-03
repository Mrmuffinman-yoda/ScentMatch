import React from "react";
import PageContainer from "../general/PageContainer";

const Footer = () => {
  return (
    <div className="pt-5">
      <footer className="footer bg-neutral text-neutral-content p-10">
        <PageContainer disableAnim={true}>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <div className="text-lg font-semibold">ScentMatch</div>
            <div className="text-sm">&copy; 2025 All rights reserved.</div>
            <div className="text-xs text-neutral-content/70">
              A personal project by Harison
            </div>
          </div>
        </PageContainer>
      </footer>
    </div>
  );
};

export default Footer;
