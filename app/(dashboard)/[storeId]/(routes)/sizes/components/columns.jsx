"use client";

import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
