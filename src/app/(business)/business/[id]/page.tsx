"use client";
import React from "react";
import PageLayout from "@/components/PageLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useBusinessAuthorization } from "@/hooks/useBusinessAuthorization";

const BusinessPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { business, loading } = useBusinessAuthorization(id);

  if (loading) {
    return <LoadingSpinner className="sm:pl-[260px]" />;
  }

  return (
    <>
      <h1>Business ID: {id}</h1>
    </>
  );
};

export default BusinessPage;
