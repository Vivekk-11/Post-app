import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

export const Header = () => {
  return (
    <header className="h-[3rem] w-full flex items-center justify-between">
      <Link to="/" className="flex items-center text-black hover:text-black/85">
        <img
          src="/header-logo.webp"
          alt="LOGO"
          className="h-12 w-12 object-cover"
        />
        <h3 className="text-2xl font-extrabold">PostIT</h3>
      </Link>
      <div>
        <IoIosAdd className="cursor-pointer" size={50} />
      </div>
    </header>
  );
};
