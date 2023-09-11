"use client";

import React from "react";
import Heading from "../../../../../../components/ui/heading";
import { Button } from "../../../../../../components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../../../../../../components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../../../../../../components/ui/data-table";
import { columns } from "./columns";
import ApiList from "../../../../../../components/ui/api-list";

const ColorsClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description={"Manage sizes for your store"}
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/colors/AAf99e51a0AA174ecd1212ef
`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title={"API"} description={"API calls for Colors"} />
      <Separator />
      <ApiList entityName={"colors"} entityIdName={"colorsId"} />
    </>
  );
};

export default ColorsClient;
