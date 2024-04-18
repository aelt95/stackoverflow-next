import React from "react";
import Filter from "./search/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const answers = await getAnswers({ questionId });
  console.log(answers);

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{`${totalAnswers} ${
          totalAnswers == 1 ? "Answer" : "Answers"
        }`}</h3>

        <Filter filters={AnswerFilters} />
        <div>
          {answers.result.map((answer) => {
            return (
              <article
                key={answer._id}
                className="light-border border-b justify-between"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Link
                      href={`/profile/${answer.author.clerkId}`}
                      className="flex flex-1 items-start gap-1 sm:items-center"
                    >
                      <Image
                        src={answer.author.picture}
                        width={18}
                        height={18}
                        alt="profile"
                        className="rounded-full object-cover max-sm:mt-0.5"
                      />
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <p>{answer.author.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllAnswers;
