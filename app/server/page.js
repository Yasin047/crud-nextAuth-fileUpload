import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Server = async () => {
  const session = await getServerSession(authOptions);
  // if (!session?.user.role === "admin" || session === null) {
  //   return redirect("/");
  // }
  return <div>{JSON.stringify(session)}</div>;
};

export default Server;
