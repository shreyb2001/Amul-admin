import React from "react";
import Size from "../../../../../../models/sizeModel";
import dbConnect from "../../../../../../lib/mongodb";
import SizeForm from "./components/size-form";

const SizePage = async ({ params }) => {
  await dbConnect();
  const size = await Size.findOne({
    _id: params.sizeId,
  });

  const plainObject = JSON.parse(JSON.stringify(size));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={plainObject} />
      </div>
    </div>
  );
};

export default SizePage;
