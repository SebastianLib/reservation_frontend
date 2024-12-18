import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/users/${props.params.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  
  const user = await response.json();

  return (
    <div className="m-2 border rounded shadow overflow-hidden">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
        User Profile
      </div>

      <div className="grid grid-cols-2  p-2 gap-2">
        <p className="p-2 text-slate-400">Name:</p>
        <p className="p-2 text-slate-950">{user.name}</p>
      </div>
    </div>
  );
};

export default ProfilePage;