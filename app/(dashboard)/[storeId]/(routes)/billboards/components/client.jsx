"use client";

import React, { useEffect, useState } from "react";
import Heading from "../../../../../../components/ui/heading";
import { Button } from "../../../../../../components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../../../../../../components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../../../../../../components/ui/data-table";
import { columns } from "./columns";
import ApiList from "../../../../../../components/ui/api-list";

const BillboardClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description={"Manage billboards for your store"}
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/billboards/64f99e51a0AA174ecd1212ef
`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"label"} columns={columns} data={data} />
      <Heading title={"API"} description={"API calls for Billboards"} />
      <Separator />
      <ApiList entityName={"billboards"} entityIdName={"billboardsId"} />
    </>
  );
};

export default BillboardClient;
