import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./MainNav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import Store from "../models/storeModel";
import dbConnect from "../lib/mongodb";
import { ModeToggle } from "../components/theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await dbConnect();
  const stores = await Store.find({
    userId,
  });

  const plainObject = JSON.parse(JSON.stringify(stores));

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={plainObject} />
        <MainNav className={"mx-6"} />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
