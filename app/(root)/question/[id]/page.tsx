import { getQuestionById } from "@/lib/actions/question.action";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Metric from "@/components/shared/Metric";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTags from "@/components/shared/RenderTags";
import Answer from "@/components/forms/Answer";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { getAnswers } from "@/lib/actions/answer.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

const Page = async ({ params }: any) => {
  const questionResult = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-centert sm:gap-2">
          <Link
            href={`/profile/${questionResult.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={questionResult.author.picture}
              height={22}
              width={22}
              alt="Profile picture"
              className="rounded-full"
            ></Image>
            <p className="paragraph-semibold text-dark300_light700">
              {questionResult.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(questionResult._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={questionResult.upvotes.length}
              downvotes={questionResult.downvotes.length}
              hasupVoted={questionResult.upvotes.includes(mongoUser._id)}
              hasdownVoted={questionResult.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(questionResult._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {questionResult.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimeStamp(questionResult.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={questionResult.answers.length}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={questionResult.views}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={questionResult.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {questionResult.tags.map((tag: any) => {
          return <RenderTags key={tag._id} _id={tag._id} name={tag.name} />;
        })}
      </div>
      <AllAnswers
        questionId={questionResult._id}
        userId={mongoUser._id}
        totalAnswers={questionResult.answers.length}
      />
      <Answer
        question={questionResult.content}
        questionId={JSON.stringify(questionResult._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default Page;
