"use client";

import { useStoreModalStore } from "../../../hooks/use-store-modal";

import { useEffect } from "react";

export default function SetupPage() {
  const onOpen = useStoreModalStore((state) => state.onOpen);
  const isOpen = useStoreModalStore((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
