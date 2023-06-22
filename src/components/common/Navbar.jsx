import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink, useLocation, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import {ACCOUNT_TYPE} from "../../utils/constants"

const Navbar = () => {
  //* Redux hooks
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  // console.log("Token From slice", token);
  // console.log("from local storage", localStorage.getItem("token"));

  //* For color of tabs in navbar
  const location = useLocation();

  //* Api call
  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing Data", result);
      setSubLinks(result?.data?.data);
    } catch (error) {
      console.log("could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between mx-auto">
        {/* image adding */}
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" alt="logo" />
        </Link>

        {/* Main tab */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1 text-richblack-25">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />
                    {/* <AiOutlineDown/> */}

                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                      {subLinks.length ? (
                        subLinks?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )?.map((subLinks, index) => {
                          const courseLink = subLinks.name
                            .split(" ")
                            .join("-")
                            .toLowerCase();
                          return (
                            <Link
                              to={`/catalog/${courseLink}`}
                              key={index}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            >
                              <p>{subLinks.name}</p>
                            </Link>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-100"
                      }`}
                    >
                      {link.title}
                    </p>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/*login signup and dashboard  */}
        <div className="flex gap-x-4 items-center">
          {user && user?.acountType === ACCOUNT_TYPE.STUDENT && ( 
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5">
                {/* need to change text color */}
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
