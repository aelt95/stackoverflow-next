import { getUserAnswers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "./cards/AnswerCard";
import Pagination from "./Pagination";
interface AnswerTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswerTabProps) => {
  const result = await getUserAnswers({ userId, page: 1 });
  return (
    <>
      {result.answers.map((item) => {
        return (
          <AnswerCard
            key={item._id}
            clerkId={clerkId}
            _id={item._id}
            question={item.question}
            author={item.author}
            upvotes={item.upvotes.length}
            createdAt={item.createdAt}
          />
        );
      })}
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={result?.isNextAnswers}
      />
    </>
  );
};

export default AnswersTab;
