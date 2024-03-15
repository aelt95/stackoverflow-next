import Link from "next/link";
import RenderTags from "../RenderTags";
const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: any) => {
  console.log(title);
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {createdAt}
        </span>
        <Link href={`/question/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag: any) => {
          return <RenderTags key={tag._id} _id={tag._id} name={tag.name} />;
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
