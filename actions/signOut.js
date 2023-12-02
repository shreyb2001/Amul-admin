"useClient";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default async function SignOut() {
  const { SignOut } = useClerk();
  const router = useRouter();

  SignOut(() => router.push("/"));
  return null;
}
