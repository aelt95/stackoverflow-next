import { BadgeCounts } from "@/types";
import Image from "next/image";

interface Props {
  totalAnswers: number;
  totalQuestions: number;
  badgeCounts: BadgeCounts;
  reputation: number;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} width={40} height={50} alt="badge" />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

const Stats = ({
  totalAnswers,
  totalQuestions,
  badgeCounts,
  reputation,
}: Props) => {
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
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={badgeCounts.GOLD}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={badgeCounts.SILVER}
          title="silver Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badgeCounts.BRONZE}
          title="bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
