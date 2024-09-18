import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useHandleLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/"); // Use router.push to navigate after sign out
  };

  return handleLogout;
}
