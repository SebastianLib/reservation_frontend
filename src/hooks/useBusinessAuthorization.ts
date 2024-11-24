import { useSession } from "next-auth/react";
import { useGetBusinessByIdQuery } from "@/hooks/business-queries";
import { redirect } from "next/navigation";

export function useBusinessAuthorization(id: string) {
  const { data: session, status: sessionStatus } = useSession();
  const {
    data: business,
    isLoading: isLoadingBusinesses,
    error: errorBusinesses,
  } = useGetBusinessByIdQuery(id);

  const isWorker = business?.workers?.some((user) => user.id === session?.user?.id);
  const isOwner = business?.owner?.id === session?.user?.id;

  const isAuthorized = isOwner || isWorker;

  if (sessionStatus === "loading" || isLoadingBusinesses) {
    return { loading: true };
  }

  if (!business || errorBusinesses || !isAuthorized) {
    redirect("/");
  }

  return { business, session, loading: false, isOwner, isWorker };
}