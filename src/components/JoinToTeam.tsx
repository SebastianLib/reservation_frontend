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

export default function JoinToTeam() {
  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer gap-4 text-xl font-semibold text-black/70 transition-colors hover:text-black">
        Dołącz do zespołu
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wpisz kod zaproszenia</DialogTitle>
          <DialogDescription className="flex gap-4">
            <Input className="mt-2" />
            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-xl w-full font-bold"
            >
              Generuj Zaproszenia!
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
