import { getQuestionById } from "@/lib/actions/question.action";
import React from "react";

const Page = ({ params, searchParams }) => {
  console.log(params);
  const questionResult = getQuestionById(params.id);
  console.log(questionResult.question);

  return <div>Page</div>;
};

export default Page;
