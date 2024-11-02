import React from "react";
import { useSession } from "next-auth/react";
import { useBusinessByUserIdQuery } from "@/hooks/business-queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddBusinessForm from "./AddBusinessForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCategoriesQuery } from "@/hooks/category-queries";

const OwnerHomePage = () => {
  const { data: session, status } = useSession();
  const { data: businesses, isLoading: isLoadingBusinesses, error: errorBusinesses } = useBusinessByUserIdQuery(session?.user?.id!);
  const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useCategoriesQuery();
  

if (isLoadingBusinesses || isLoadingCategories) return <LoadingSpinner/>;
if (errorBusinesses || errorCategories) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col gap-4 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
        Twoje salony:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/* <ul>
        {data?.map((business) => (
          <li key={business.id}>
            <h2>{business.name}</h2>
            <p>Owner: {business.name}</p>
            <p>Number of workers: {business?.workers?.length || 0}</p>
          </li>
        ))}
      </ul> */}

      <Dialog >
        <DialogTrigger className="bg-white w-fit px-20 py-10 md:px-32 md:py-16 text-cyan-500 mx-auto md:mx-0">
          <Plus size={50} className="mx-auto"/>
          <p className="text-center md:text-3xl text-2xl font-bold">Dodaj Salon</p>
          </DialogTrigger>
        <DialogContent className="max-w-[600px] max-h-[800px] overflow-y-auto">
          <DialogHeader>
          <DialogTitle></DialogTitle>
            <AddBusinessForm categories={categories}/>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
};

export default OwnerHomePage;
