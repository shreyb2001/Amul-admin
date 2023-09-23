import Store from "../../../../../models/storeModel";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/SettingsForm";
import dbConnect from "../../../../../lib/mongodb";

const SettingsPage = async ({ params }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  await dbConnect();
  const store = await Store.findOne({
    _id: params.storeId,
    userId,
  });

  if (!store) redirect("/");

  const plainObject = JSON.parse(JSON.stringify(store));

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={plainObject} />
      </div>
    </div>
  );
};

export default SettingsPage;
