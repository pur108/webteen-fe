import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserDropdown } from "./user-dropdown";
import { LoginButton } from "./login-button";

export default async function UserMenu() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <UserDropdown
        user={{
          id: session.user.id ?? "",
          username: session.user.username ?? "",
          email: session.user.email ?? "",
          image: session.user.image,
          role: (session.user.role as "user" | "creator" | "admin") ?? "user",
        }}
      />
    );
  }

  return <LoginButton />;
}
