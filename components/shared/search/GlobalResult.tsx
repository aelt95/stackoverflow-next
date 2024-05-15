"use client";
import React, { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const GlobalResult = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="absolute w-full z-10 bg-light-800 dark:bg-dark-400 mt-3 rounded-lg py-5 animate-accordion-down">
      <p className="text-dark400_light900 paragraph-semibold px-5">Type</p>
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5 ">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database 🐢
            </p>
          </div>
        ) : (
          <div className="">Content</div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
