import React from "react";

interface Props {
  totalAnswers: number;
  totalQuestions: number;
}

const Stats = ({ totalAnswers, totalQuestions }: Props) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {totalQuestions}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {totalAnswers}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
