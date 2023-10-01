import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import dbConnect from "../../../lib/mongodb";
import Store from "../../../models/storeModel";
import Navbar from "../../../components/navbar";

export default async function DashboardLayout({ children, params }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await dbConnect();
  const store = await Store.findOne({
    _id: params.storeId,
    userId,
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
