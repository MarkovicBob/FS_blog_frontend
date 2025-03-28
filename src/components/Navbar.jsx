import { FaBloggerB } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <div>
        <NavLink to="/" className="text-4xl flex-1 w-fit block">
          <FaBloggerB />
        </NavLink>
      </div>
      <div className="flex space-x-4 gap-3">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/new">New Post</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
