"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
const Pagination = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePagination = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: "2",
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex items-center justify-center">
      <Button onClick={handlePagination}>Pagination</Button>
    </div>
  );
};

export default Pagination;
