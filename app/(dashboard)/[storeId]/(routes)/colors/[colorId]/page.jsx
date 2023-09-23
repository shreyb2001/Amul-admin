import React from "react";
import Color from "../../../../../../models/colorModel";
import dbConnect from "../../../../../../lib/mongodb";
import ColorForm from "./components/color-form";

const ColorPage = async ({ params }) => {
  await dbConnect();
  const color = await Color.findOne({
    _id: params.colorId,
  });

  const plainObject = JSON.parse(JSON.stringify(color));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={plainObject} />
      </div>
    </div>
  );
};

export default ColorPage;
