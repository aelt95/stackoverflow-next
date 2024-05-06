import { getUserQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "./cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });

  return (
    <>
      {result.questions.map((item) => {
        return (
          <QuestionCard
            key={item._id}
            _id={item._id}
            clerkId={clerkId}
            title={item.title}
            tags={item.tags}
            author={item.author}
            upvotes={item.upvotes}
            views={item.views}
            answers={item.answers}
            createdAt={item.createdAt}
          />
        );
      })}
    </>
  );
};

export default QuestionTab;
