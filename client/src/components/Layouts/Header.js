import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonFill } from 'react-icons/bs';
import { message } from "antd";

const Header = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // login handler
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  //logout handler
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };


  return (
    <>
      

      <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Expanse Tracker</span>
        </Link>
        <div className="relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" onClick={toggleDropdown} className="flex text-sm rounded-full md:me-0 shadow-lg " >
            
            <BsPersonFill className="w-6 h-6" /> <span className="items-center p-1">User</span>
          </button>
          <div className= {`absolute right-0 top-full mt-2 z-50 ${dropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`} id="user-dropdown" style={{ width: '200px' }}>
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 ">{loginUser && loginUser.name}</span>
              <span className="block text-sm text-gray-500 truncate ">{loginUser && loginUser.emai}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {/* <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Earnings</a> */}
              {/* </li> */}
              <li>
                <button  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " onClick={logoutHandler}> Sign out</button>
              </li>
            </ul>
          </div>
          <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-user" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">About</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">Services</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">Pricing</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">Contact</a>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  </>
  );
};

export default Header;
