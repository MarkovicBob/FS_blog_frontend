import { FaBloggerB } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 gap-5">
      <NavLink to="/" className="text-4xl flex-1 w-fit block">
        <FaBloggerB />
      </NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/new">New Post</NavLink>
    </div>
  );
}

export default Navbar;
