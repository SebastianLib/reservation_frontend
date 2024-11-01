import React, { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="min-h-screen pt-32 bg-cyan-500 text-white">
      {children}
    </section>
  );
};

export default PageLayout;