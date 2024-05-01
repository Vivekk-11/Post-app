import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import Posts from "../components/Posts";
import { useDebounceValue } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { searchPostsAction } from "../../redux/actions/postActions";
import { ClipLoader } from "react-spinners";
import SearchPosts from "./SearchPosts";

const Home = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue] = useDebounceValue(searchTerm, 500);
  const { searchPosts, searchPostsLoading } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchPostsAction(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <div className="w-full h-full">
      <div className="relative ml-auto w-[20rem]">
        {showSearch && searchTerm.length <= 0 && (
          <IoMdSearch
            className="absolute left-2 top-1/2 translate-y-[-50%]"
            size={20}
          />
        )}
        <form>
          <input
            placeholder="Search Posts"
            onBlur={() => setShowSearch(true)}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="text"
            className="border-2 placeholder:pl-6 rounded-lg px-2 py-1 border-black w-full outline-none bg-white"
          />
        </form>
      </div>
      {searchTerm.length > 0 ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          {searchPostsLoading ? (
            <ClipLoader size={50} />
          ) : searchPosts.length <= 0 ? (
            <div className="text-3xl font-bold text-slate-500">
              <h2>{`There is no post with the title: "${debouncedValue}".`}</h2>
              <h2>{`Try searching for something else other than "${debouncedValue}".`}</h2>
            </div>
          ) : (
            <SearchPosts posts={searchPosts} searchTerm={debouncedValue} />
          )}
        </div>
      ) : (
        <Posts />
      )}
    </div>
  );
};

export default Home;

export const loader = () => {
  const user = Cookies.get("postIT-user");
  if (!user) return redirect("/login");
  return null;
};
