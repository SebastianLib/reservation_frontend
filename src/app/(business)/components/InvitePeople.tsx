import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiUserAdd } from "react-icons/hi";
import { useParams } from "next/navigation";
import {  useGetInvitesQuery } from "@/hooks/business-queries";
import { useState } from "react";
import { cn } from "@/lib/utils";
import InviteCodes from "./InviteCodes";
import InvitePeopleForm from "./InvitePeopleForm";

const InvitePeople = () => {
  const [step, setStep] = useState<number>(1);
  const { id } = useParams();
  const {
    data: invites,
    isLoading: isLoadingInvites,
    error: errorInvites,
  } = useGetInvitesQuery(String(id));
  if (isLoadingInvites) {
    return (
      <div>
        <h2 className="text-2xl font-bold">Twoje Zaproszenia</h2>
        <p>ładowanie zaproszeń...</p>
      </div>
    );
  }

  if (errorInvites || !invites) {
    return <p>Wystąpił błąd podczas pobierania zaproszeń.</p>;
  }

  return (
    <Dialog>
      <DialogTrigger className="text-lg font-semibold flex items-center gap-2">
        <HiUserAdd className="text-xl text-center" /> Zaproś Pracowników
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="flex gap-4 pb-4">
            <p
              className={cn(
                "font-bold border-2 text-lg border-cyan-500 cursor-pointer transition-colors py-1 px-2",
                step === 1
                  ? "bg-cyan-500 text-white"
                  : "text-cyan-500 hover:bg-cyan-500 hover:text-white"
              )}
              onClick={() => setStep(1)}
            >
              Zaproś
            </p>
            <p
              className={cn(
                "font-bold  border-2 text-lg border-cyan-500 cursor-pointer transition-colors py-1 px-2",
                step === 2
                  ? "bg-cyan-500 text-white"
                  : "text-cyan-500 hover:bg-cyan-500 hover:text-white"
              )}
              onClick={() => setStep(2)}
            >
              Zaproszenia
            </p>
          </div>
          {step === 1 ? <InvitePeopleForm changeStep={() => setStep(2)}/> : <InviteCodes invites={invites} />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InvitePeople;
