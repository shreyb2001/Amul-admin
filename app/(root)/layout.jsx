import dbConnect from "../../lib/mongodb";

import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Store from "../../models/storeModel";

export default async function SetupLayout({ children }) {
  const { userId } = auth();
  const { emailAddresses } = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  await dbConnect();
  const store = await Store.findOne({
    userId,
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
