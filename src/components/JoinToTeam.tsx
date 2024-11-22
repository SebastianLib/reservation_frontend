import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { useJoinToBusiness } from "@/hooks/business-queries";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

export default function JoinToTeam() {
  const { data: session, update } = useSession();
  const [code, setCode] = useState<string>("");
  const { mutate: joinToBusiness } = useJoinToBusiness();
  const router = useRouter();

  const handleSubmit = () => {
    joinToBusiness(code, {
      onSuccess: async (data) => {
        const updatedBusinesses = session?.user?.businesses
          ? [...session.user.businesses, data]
          : [data];
        
          await update({
            ...session,
            user: {
              ...session?.user,
              businesses: updatedBusinesses,
            },
          });

        if (data?.id) {
          router.push(`/business/${data.id}`);
        } else {
          console.error("Nie znaleziono ID biznesu");
        }
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer gap-4 text-xl font-semibold text-black/70 transition-colors hover:text-black">
        Dołącz do zespołu
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wpisz kod zaproszenia</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <Input
              className="mt-2 text-black"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
              }
            />
            <Button type="submit" disabled={code === ""} onClick={handleSubmit}>
              Dołącz do zespołu
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
