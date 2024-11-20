import { toast } from "@/hooks/use-toast";
import { InviteCodeEntity } from "@/models/business";
import { Copy, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const SignleInvite = ({ invite }: { invite: InviteCodeEntity }) => {
  const [visible, setVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(invite.inviteCode)
      .then(() => {
        toast({ title: "Skopiowałeś kod!" });
      })
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Nie udało skopiować się kodu!",
        })
      );
  };

  return (
    <>
      {!visible ? (
        <div className="flex items-center gap-2 font-bold text-lg">
          <Eye onClick={() => setVisible(true)} />
          <p className="mt-2">***********</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 font-bold text-lg">
          <button onClick={() => setVisible(false)} className="">
            <EyeOff />
          </button>
          <p>{invite.inviteCode}</p>
          <Copy
            className="cursor-pointer ml-2 text-cyan-500 hover:text-cyan-600 transition-colors"
            onClick={handleCopy}
          />
        </div>
      )}
    </>
  );
};

export default SignleInvite;
