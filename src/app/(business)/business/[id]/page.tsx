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
    data: businesses,
    isLoading: isLoadingBusinesses,
    error: errorBusinesses,
  } = useGetBusinessByIdQuery(id);
  const { data: session, status: sessionStatus } = useSession();

  if (isLoadingBusinesses || sessionStatus === "loading") {
    return <LoadingSpinner className="sm:pl-[260px]" />;
  }

  if (errorBusinesses || sessionStatus === "unauthenticated") {
    return <div>Error loading data</div>;
  }

  const isOwner = session?.user?.ownedBusinesses?.some(
    (business) => business.id === Number(id)
  );
  const isWorker = session?.user?.businesses?.some(
    (business) => business.id === Number(id)
  );

  if (!isOwner && !isWorker) {
    redirect("/");
  }

  return (
    <PageLayout className="pl-12 sm:pl-[260px]">
      <h1>Business ID: {id}</h1>
    </PageLayout>
  );
};

export default BusinessPage;
