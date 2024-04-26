import { getSavedQuestion } from "@/lib/actions/user.actions";
import React from "react";
import { auth } from "@clerk/nextjs";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/search/Filter";
import { QuestionFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/cards/QuestionCard";

const page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getSavedQuestion({ clerkId: userId });
  return (
    <>
      <>
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      </>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions && result.questions.length > 0 ? (
          result.questions.map((question: any) => {
            return (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResult
            title={"There's no question saved to show"}
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default page;
