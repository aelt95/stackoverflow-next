import React from "react";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/search/Filter";
import { UserFilters } from "@/constants/filters";
import { getAllUser } from "@/lib/actions/user.actions";
import Link from "next/link";
import UserCard from "@/components/shared/cards/UserCard";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import Loading from "./loading";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const usersResult = await getAllUser({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between sm:flex-row">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {usersResult.users.length > 0 ? (
          usersResult.users.map((user) => {
            return <UserCard key={user._id} user={user} />;
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href={"/sing-up"} className="mt-3 font-bold text-accent-blue">
              Join us now!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={usersResult?.isNext}
        />
      </div>
    </>
  );
};

export default Page;
