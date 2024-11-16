import React, { ReactNode } from "react";

const PageLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <section className={`min-h-screen pt-24 bg-cyan-500 text-white ${className}`}>
      {children}
    </section>
  );
};

export default PageLayout;