import { useGetInvitesQuery } from "@/hooks/business-queries";
import { useParams } from "next/navigation";
import SignleInvite from "./SignleInvite";

const InviteCodes = () => {
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

  if (errorInvites) {
    return <p>Wystąpił błąd podczas pobierania zaproszeń.</p>;
  }

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
