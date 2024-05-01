import { Post as PostType } from "../../types/post";
import Post from "./Post";

interface Props {
  posts: PostType[];
  searchTerm: string;
}

const SearchPosts = ({ posts, searchTerm }: Props) => {
  return (
    <div className="flex flex-col items-start gap-y-2 w-full">
      <h1 className="text-3xl font-bold">
        Posts with the term "{searchTerm}":
      </h1>
      <div className="w-full grid grid-cols-4 gap-3 my-5 mx-3 tab:gap-5 tab:grid-cols-3 xs:grid xs:grid-cols-1 xs:grid-rows-3">
        {posts.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            description={post.description}
            image={post.image}
            userPicture={post.creator.picture}
            username={post.creator.name}
            userId={post.creator._id}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPosts;
