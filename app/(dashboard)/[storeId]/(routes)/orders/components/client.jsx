"use client";

import React, { useState, useEffect } from "react";
import Heading from "../../../../../../components/ui/heading";
import { Separator } from "../../../../../../components/ui/separator";
import { DataTable } from "../../../../../../components/ui/data-table";
import { columns } from "./columns";
import { InterminateBar } from "../../../../../../components/ui/progress";

const OrderClient = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <InterminateBar />;

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description={"Manage orders for your store"}
      />
      <Separator />
      <DataTable searchKey={"products"} columns={columns} data={data} />
    </>
  );
};

export default OrderClient;
