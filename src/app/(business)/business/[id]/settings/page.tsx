"use client"
import { Button } from "@/components/ui/button";
import { useDeleteBusiness } from "@/hooks/business-queries";
import { useRouter } from "next/navigation";
import React from "react";

export default function SettingsPage({ params }: { params: { id: string } }) {
    const { id } = params
    const { mutate: deleteBusiness } = useDeleteBusiness();
    const router = useRouter();
    const handleDeleteBusiness = () => {
        deleteBusiness(id,{
            onSuccess: () => {
                router.push("/")
            },
        })
    }

    return (
    <div>
      <h2 className="text-center text-2xl md:text-4xl text-white font-bold">
        Ustawienia Salonu
      </h2>
      <Button onClick={handleDeleteBusiness} className="text-xl" variant={"destructive"}>
        Usuń salon
      </Button>
    </div>
  );
}
