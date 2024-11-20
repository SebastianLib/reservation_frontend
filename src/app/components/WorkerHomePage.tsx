import LoadingSpinner from "@/components/LoadingSpinner";
import { useBusinessByUserIdQuery } from "@/hooks/business-queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WorkerHomePage = () => {
  const {
    data: businesses,
    isLoading: isLoadingBusinesses,
    error: errorBusinesses,
  } = useBusinessByUserIdQuery();

  if (isLoadingBusinesses) return <LoadingSpinner />;
  if (errorBusinesses) return <div>Error loading data</div>;
  
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
      </div>
    </div>
  );
};

export default WorkerHomePage;
