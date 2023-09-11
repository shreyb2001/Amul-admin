"use client";

import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Server, Copy } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { toast } from "react-hot-toast";

export const ApiAlert = ({ title, description, variant = "public" }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to the clipboard");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variant}>{variant}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
