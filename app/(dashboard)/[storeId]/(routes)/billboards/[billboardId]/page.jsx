import React from "react";
import Billboard from "../../../../../../models/billboardModel";
import dbConnect from "../../../../../../lib/mongodb";
import BillboardForm from "./components/billboards-form";

const BillboardsPage = async ({ params }) => {
  await dbConnect();
  const billboard = await Billboard.findOne({
    _id: params.billboardId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardsPage;
