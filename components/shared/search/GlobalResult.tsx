"use client";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/global.actions";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const globalParam = searchParams.get("global");
  const typeParam = searchParams.get("type");

  useEffect(() => {
    const fetchResults = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        const results = await globalSearch({
          query: globalParam,
          type: typeParam,
        });
        setResult(JSON.parse(results));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    if (globalParam) {
      fetchResults();
    }
  }, [globalParam, typeParam]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;

      case "answer":
        return `/question/${id}`;

      case "user":
        return `/profile/${id}`;

      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="absolute w-full z-10 bg-light-800 dark:bg-dark-400 mt-3 rounded-lg py-5 animate-accordion-down">
      <GlobalFilters />
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
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index) => {
                return (
                  <Link
                    href={renderLink(item.type, item.id)}
                    key={item.type + item.id + index}
                    className="flex  w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                  >
                    <Image
                      src={"/assets/icons/tag.svg"}
                      alt="tags"
                      width={18}
                      height={18}
                      className="invert-colors mt-1 object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="body-medium text-dark200_light800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="small-medium text-dark400_light500 line-clamp-1 mt-1 font-bold capitalize">
                        {item.type}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular py-5 px-2.5">
                  Oops, no results found 😥
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
