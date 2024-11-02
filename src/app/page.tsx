"use client";

import PageLayout from "@/components/PageLayout";
import { useSession } from "next-auth/react";
import OwnerHomePage from "./components/OwnerHomePage";
import LoadingSpinner from "@/components/LoadingSpinner";
import WorkerHomePage from "./components/WorkerHomePage";
import CustomerHomePage from "./components/CustomerHomePage";
import { ROLES, USER_STATUS } from "@/models/user";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  
  if(session?.user && session?.user.status !== USER_STATUS.ACTIVATED) {
    redirect("/verification")
  }
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