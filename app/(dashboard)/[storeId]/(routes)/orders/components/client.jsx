"use client";

import React from "react";
import Heading from "../../../../../../components/ui/heading";
import { Separator } from "../../../../../../components/ui/separator";
import { DataTable } from "../../../../../../components/ui/data-table";
import { columns } from "./columns";

const OrderClient = ({ data }) => {

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description={"Manage orders for your store"}
      />
      <Separator />
      <DataTable searchKey={"label"} columns={columns} data={data} />
    </>
  );
};

export default OrderClient;
