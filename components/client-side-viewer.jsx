"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ClientSideViewer = ({ storeUrl }) => {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.push(storeUrl)}>
      Client Side Site
    </Button>
  );
};

export default ClientSideViewer;
