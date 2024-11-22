import SignleInvite from "./SignleInvite";
import { InviteCodeEntity } from "@/models/business";

const InviteCodes = ({invites}:{invites:InviteCodeEntity[]}) => {

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Twoje Kody</h2>
      <div className="flex flex-col gap-2">
        {invites && invites.length > 0 ? (
          invites.map((invite) => (
            <div key={invite.id}>
                <SignleInvite invite={invite}/>
            </div>
          ))
        ) : (
          <p>Nie znaleziono zaproszeń.</p>
        )}
      </div>
    </div>
  );
};

export default InviteCodes;
