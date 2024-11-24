import PageLayout from "@/components/PageLayout";
import BusinessSidebar from "./components/BusinessSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BusinessSidebar />
      <main>
        <PageLayout className="pl-12 sm:pl-[260px]">{children}</PageLayout>
      </main>
    </>
  );
}
