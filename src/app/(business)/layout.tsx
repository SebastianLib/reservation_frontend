import BusinessSidebar from "./components/BusinessSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BusinessSidebar />
      <main>{children}</main>
    </>
  );
}
