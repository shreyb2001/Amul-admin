"use client";

import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
