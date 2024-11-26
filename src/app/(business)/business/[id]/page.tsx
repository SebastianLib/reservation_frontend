import React from "react";
import PageLayout from "@/components/PageLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { BusinessApi } from "@/app/api/business-api";
import { redirect } from "next/navigation";

const BusinessPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    console.error("Nie znaleziono sesji.");
    redirect("/auth/login"); 
    return <></>;
  }

  let business;
  try {
    business = await BusinessApi.getBusinessById(id);
  } catch (error) {
    console.error(`Błąd podczas pobierania biznesu o ID ${id}:`, error);
    redirect("/"); 
    return <></>;
  }

  // const isWorker = business.workers?.some((user) => user.id === session.user.id);
  // const isOwner = business.owner?.id === session.user.id;
  // const isAuthorized = isOwner || isWorker;

  // if (!isAuthorized) {
  //   console.error("Użytkownik nie ma uprawnień do tego biznesu.");
  //   redirect("/");
  //   return <></>;
  // }

  return (
    <PageLayout>
      <h1>ID Biznesu: {business.id}</h1>
      <p>Nazwa Biznesu: {business.name}</p>
    </PageLayout>
  );
};

export default BusinessPage;
