import { getQuestionById } from "@/lib/actions/question.action";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Page = async ({ params, searchParams }) => {
  const questionResult = await getQuestionById({ questionId: params.id });
  console.log(questionResult);

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div>
          <Link href={`/profile/${questionResult.author.clerkId}`}>
            <Image
              src={questionResult.author.picture}
              height={22}
              width={22}
              alt="Profile picture"
              className="rounded-full"
            ></Image>
            <p>{questionResult.author.name}</p>
          </Link>
        </div>
      </div>
      {questionResult.title}
    </>
  );
};

export default Page;
