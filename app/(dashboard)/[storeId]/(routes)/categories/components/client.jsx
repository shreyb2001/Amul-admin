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

const CategoryClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description={"Manage categories for your store"}
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/categories/64fAAe51AAAA174eAA1212ef
`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title={"API"} description={"API calls for Categories"} />
      <Separator />
      <ApiList entityName={"categories"} entityIdName={"categoriesId"} />
    </>
  );
};

export default CategoryClient;
