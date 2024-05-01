import { IoMdSearch } from "react-icons/io";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import Posts from "../components/Posts";

const Home = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //TODO: Implement Live Search
    console.log(searchTerm);
  };
  return (
    <div>
      <div className="relative ml-auto w-[20rem]">
        {showSearch && searchTerm.length <= 0 && (
          <IoMdSearch
            className="absolute left-2 top-1/2 translate-y-[-50%]"
            size={20}
          />
        )}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search Posts"
            onBlur={() => setShowSearch(true)}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="text"
            className="border-2 placeholder:pl-6 rounded-lg px-2 py-1 border-black w-full outline-none bg-white"
          />
        </form>
      </div>
      <Posts />
    </div>
  );
};

export default Home;

export const loader = () => {
  const user = Cookies.get("postIT-user");
  if (!user) return redirect("/login");
  return null;
};
