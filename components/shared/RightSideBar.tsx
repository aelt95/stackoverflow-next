import Link from "next/link";
import Image from "next/image";
import RenderTags from "./RenderTags";

const RightSideBar = () => {
  const hotQuestion = [
    {
      _id: "1",
      tittle: "How to use something",
    },
    {
      _id: "2",
      tittle: "How to use something",
    },
    {
      _id: "3",
      tittle: "How to use something",
    },
    {
      _id: "4",
      tittle: "How to use something",
    },
  ];

  const popularTags = [
    { _id: 1, name: "React", totalQuestion: 5 },
    { _id: 1, name: "Javascript", totalQuestion: 5 },
    { _id: 1, name: "Next", totalQuestion: 5 },
    { _id: 1, name: "CSS", totalQuestion: 5 },
    { _id: 1, name: "Tailwind", totalQuestion: 5 },
  ];

  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestion.map((question) => {
            return (
              <Link
                key={question._id}
                href={`/questions/${question._id}`}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {question.tittle}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => {
            return (
              <RenderTags
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestion={tag.totalQuestion}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
