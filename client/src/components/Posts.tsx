import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getPostsAction } from "../../redux/actions/postActions";
import Post from "./Post";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [profileLimit, setProfileLimit] = useState(
    window.innerWidth < 470 ? 10 : window.innerWidth < 850 ? 15 : 20
  );
  const [isStart, setIsStart] = useState(true);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post);

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
      setProfileLimit(
        window.innerWidth < 470 ? 10 : window.innerWidth < 850 ? 15 : 20
      );
    };

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getPostsAction(currentPage, profileLimit));
  }, [currentPage, profileLimit, dispatch]);

  return (
    <div className="grid grid-cols-4 gap-3 my-5 mx-3 tab:gap-5 tab:grid-cols-3 xs:grid xs:grid-cols-1 xs:grid-rows-3">
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
  );
};

export default Posts;
