"use client";

import React, { useState, useEffect } from "react";
import Heading from "../../../../../../components/ui/heading";
import { Button } from "../../../../../../components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../../../../../../components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../../../../../../components/ui/data-table";
import { columns } from "./columns";
import ApiList from "../../../../../../components/ui/api-list";
import { InterminateBar } from "../../../../../../components/ui/progress";

const ProductClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <InterminateBar />;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description={"Manage products for your store"}
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/products/AAAAAAA1a0AA174ecd1212ef
`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title={"API"} description={"API calls for Products"} />
      <Separator />
      <ApiList entityName={"products"} entityIdName={"productsId"} />
    </>
  );
};

export default ProductClient;
