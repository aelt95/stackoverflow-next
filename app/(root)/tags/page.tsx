import React from "react";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/search/Filter";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";

const Page = async () => {
  const tagsResult = await getAllTags({});

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between sm:flex-row">
        <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {tagsResult.tags.length > 0 ? (
          tagsResult.tags.map((tag) => {
            return (
              <Link
                href={`/tags/${tag._id}`}
                key={tag._id}
                className="shadow-light100_darknone"
              >
                <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                  <div className="background-light800_dark400 w-fit rounded-lg px-5 py-1.5">
                    <p className="paragraph-semibold text-dark300_light900">
                      {tag.name}
                    </p>
                  </div>
                  <p className="small-medium text-dark400_light500 mt-3.5">
                    <span className="body-semibold primary-text-gradient mr-2.5">
                      {tag.questions.length}+
                    </span>{" "}
                    Questions
                  </p>
                </article>
              </Link>
            );
          })
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are not tags found"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
    </>
  );
};

export default Page;
