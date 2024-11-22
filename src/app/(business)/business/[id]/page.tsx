"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageLayout from "@/components/PageLayout";
import { useGetBusinessByIdQuery } from "@/hooks/business-queries";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const BusinessPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const {
    data: business,
    isLoading: isLoadingBusinesses,
    error: errorBusinesses,
  } = useGetBusinessByIdQuery(id);
  const { data: session, status: sessionStatus } = useSession();
  console.log("Xdddddddd");
  
  if (sessionStatus === "loading" || isLoadingBusinesses) {
    return <LoadingSpinner className="sm:pl-[260px]" />;
  }

  // if (!business || errorBusinesses) {
    
  //   redirect("/"); 
  // }

  const isWorker = business?.workers?.some(
    (user) => user.id === session?.user?.id
  );

  // if (session?.user?.id !== business?.owner?.id && !isWorker) {
    
  //   redirect("/");
  // }

  return (
    <PageLayout className="pl-12 sm:pl-[260px]">
      <h1>Business ID: {id}</h1>
    </PageLayout>
  );
};

export default BusinessPage;
