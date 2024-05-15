"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const Props = {
  pageNumber: 1,
  isNext: false,
};
interface Props {
  pageNumber: number;
  isNext: boolean | undefined;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };
  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex items-center justify-center w-full gap-2">
      <Button
        disabled={pageNumber === 1}
        className="light-border-2 border btn flex min-h-[36px] items-center gap-2 "
        onClick={() => handleNavigation("prev")}
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="bg-primary-500 flex justify-center items-center px-3.5 py-2  rounded-md">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        className="light-border-2 border btn flex min-h-[36px] items-center gap-2 "
        onClick={() => handleNavigation("next")}
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
