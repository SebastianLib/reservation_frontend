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
import Image from "next/image";
import Link from "next/link";

const OwnerHomePage = () => {
  const { data: session, status } = useSession();
  const {
    data: businesses,
    isLoading: isLoadingBusinesses,
    error: errorBusinesses,
  } = useBusinessByUserIdQuery(session?.user?.id!);
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useCategoriesQuery();

  if (isLoadingBusinesses || isLoadingCategories) return <LoadingSpinner />;
  if (errorBusinesses || errorCategories) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col gap-4 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
        Twoje salony:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {businesses?.map((business) => (
          <Link
          href={`/business/${business.id}`}
            key={business.id}
            className="w-full h-[250px] lg:h-[300px] flex flex-col justify-end cursor-pointer relative overflow-hidden"
          >
            <Image
              src={`http://localhost:3003/api/uploads/test-upload/${business.images?.[0]}`}
              alt={`zdjęcie salonu`}
              sizes=""
              fill
              className="object-cover absolute z-10 hover:scale-105 transition-transform duration-500"
            />
            <h2 className="text-2xl md:text-3xl font-bold bg-white text-black p-2 self-end w-full text-center border-t-2 z-30">
              {business.name}
            </h2>
          </Link>
        ))}
        
        {/* Przycisk "Dodaj Salon" */}
        <div className="w-full h-[250px] lg:h-[300px] flex flex-col justify-end cursor-pointer relative overflow-hidden bg-gray-100  items-center">
          <Dialog>
            <DialogTrigger className="bg-white w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400">
              <Plus size={50} className="text-cyan-500" />
              <p className="text-center md:text-3xl text-2xl font-bold text-cyan-500">
                Dodaj Salon
              </p>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] max-h-[800px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <AddBusinessForm categories={categories} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default OwnerHomePage;
