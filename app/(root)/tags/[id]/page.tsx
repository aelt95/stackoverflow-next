import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import React from "react";

const Page = async ({ params, searchParams }: any) => {
  console.log(searchParams);
  const tags = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.p,
  });
  return <div>page</div>;
};

export default Page;
