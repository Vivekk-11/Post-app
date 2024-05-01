import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
interface Props {
  title: string;
  description: string;
  image: string;
  userPicture: string;
  username: string;
  userId: string;
  createdAt: Date;
}

const Post = ({
  title,
  image,
  description,
  username,
  userPicture,
  userId,
  createdAt,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 items-start shadow-lg p-3">
      <h3 className={`text-2xl font-semibold desktop:text- capitalize`}>
        {title}
      </h3>
      {image && (
        <img className="object-cover w-full rounded-xl h-[10rem]" src={image} />
      )}
      <p className="text-gray-500 font-semibold desktop:text-sm capitalize">
        {description}
      </p>
      <div className="flex items-center justify-between w-full">
        <Link
          to={`/profile/${userId}`}
          className="flex items-center gap-x-1 text-gray-400 hover:text-gray-400 hover:opacity-70"
        >
          <img
            src={userPicture}
            className="w-7 h-7 object-cover rounded-full"
          />
          <p className="text-lg">{username}</p>
        </Link>
        <p className="text-xs text-muted-foreground opacity-65 font-semibold capitalize">
          {formatDistance(createdAt, new Date(), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default Post;
