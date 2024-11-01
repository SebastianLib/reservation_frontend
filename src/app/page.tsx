"use client";

import PageLayout from "@/components/PageLayout";
import { ROLES } from "@/types/UserType";
import { useSession } from "next-auth/react";
import OwnerHomePage from "./components/OwnerHomePage";
import LoadingSpinner from "@/components/LoadingSpinner";
import WorkerHomePage from "./components/WorkerHomePage";
import CustomerHomePage from "./components/CustomerHomePage";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <LoadingSpinner/>

  return (
    <PageLayout>
      <div className="container mx-auto">
        {session?.user.role === ROLES.OWNER && <OwnerHomePage/>}
        {session?.user.role === ROLES.WORKER && <WorkerHomePage/>}
        {session?.user.role === ROLES.CUSTOMER && <CustomerHomePage/>}
      </div>
    </PageLayout>
  );
}
``