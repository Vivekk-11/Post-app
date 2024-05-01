import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getPostsAction } from "../../redux/actions/postActions";
import Post from "./Post";
import NextAndPrevButton from "./NextAndPrevButton";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsLimit, setPostsLimit] = useState(
    window.innerWidth < 470 ? 4 : window.innerWidth < 850 ? 6 : 8
  );
  const [isStart, setIsStart] = useState(true);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const dispatch = useAppDispatch();
  const { posts, postsCount } = useAppSelector((state) => state.post);

  const handleClickNext = () => {
    if (reachedToEnd) return;
    setCurrentPage((prev) => {
      return (prev += 1);
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClickPrev = () => {
    if (isStart) return;
    setCurrentPage((prev) => {
      return (prev -= 1);
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setPostsLimit(
        window.innerWidth < 470 ? 4 : window.innerWidth < 850 ? 6 : 8
      );
    };

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    currentPage === 0 ? setIsStart(true) : setIsStart(false);
    dispatch(getPostsAction(currentPage, postsLimit));
  }, [currentPage, postsLimit, dispatch]);

  useEffect(() => {
    if (!posts.length || posts.length < postsLimit) setReachedToEnd(true);
    else setReachedToEnd(false);

    if ((currentPage + 1) * postsLimit === postsCount) setReachedToEnd(true);

    if (posts.length > postsLimit) setReachedToEnd(false);
  }, [posts, postsLimit, postsCount, currentPage]);

  return (
    <>
      <NextAndPrevButton
        onNextClick={handleClickNext}
        onPrevClick={handleClickPrev}
        isStart={isStart}
        reachedToEnd={reachedToEnd}
      />
      <div className="grid grid-cols-4 gap-3 my-5 mx-3 tab:gap-5 tab:grid-cols-3 xs:grid xs:grid-cols-1 xs:grid-rows-3">
        {posts.slice(0, postsLimit).map((post) => (
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
    </>
  );
};

export default Posts;
