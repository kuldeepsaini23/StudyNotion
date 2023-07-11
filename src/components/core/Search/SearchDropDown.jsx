import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllCourses,
  getQueryCourses,
} from "../../../services/operations/searchAPI";
import { useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";

const SearchDropDown = ({
  subLinks,
  searchList,
  setSearchList,
  customClass,
  query,
  setQuery,
  setSearchOpen,
}) => {
  // Search Bar

  const searchRef = useRef(null);
  useOnClickOutside(searchRef, () => setSearchList(false));
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [querySearchCourses, setQuerySearchCourses] = useState([]);
  const [instructorProfile, setInstructorProfile] = useState([]);
  const [autoComplete, setAutoComplete] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      setLoading(true);
      const res = await getAllCourses();
      if (res) {
        // console.log(res);
        setCourses(res);
      }
      setLoading(false);
    };

    fetchAllCourses();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (query.length > 3) {
      const fetchSearchQuery = async () => {
        const res = await getQueryCourses(query);
        if (res) {
          console.log(res);
          setQuerySearchCourses(res?.data?.populatedCourses);
          setInstructorProfile(res?.data?.instructorDetails);
          setAutoComplete(res?.data?.autoComplete);
        }
        setTimeout(() => setLoading(false), 1000);
      };

      fetchSearchQuery();
    }
  }, [query]);

  const handleClick = () => {
    setSearchList(false);
    setSearchOpen(false);
  };

  return (
    <div
      className={`absolute top-14 ml-2 z-[1000] rounded-xl overflow-hidden bg-richblue-400 ${
        searchList ? "flex" : "hidden"
      } ${customClass} text-white`}
      ref={searchRef}
    >
      {query?.length === 0 ? (
        <ul className="overflow-auto w-full">
          <li className="w-full my-2 flex flex-col items-center justify-start gap-y-4">
            {subLinks
              ?.filter((subLink) => subLink?.courses?.length > 0)
              ?.map((subLink, i) => (
                <Link
                  to={`/catalog/${subLink.name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`}
                  className="w-full bg-transparent hover:bg-richblue-700 px-5 text-xl py-4"
                  key={i}
                  onClick={handleClick}
                >
                  <div className="flex items-center justify-start gap-4 text-white">
                    <AiOutlineSearch className="font-semibold text-2xl font-mono " />
                    <p className="font-semibold">{subLink.name}</p>
                  </div>
                </Link>
              ))}

            {courses?.map((course, i) => (
              <Link
                to={`/courses/${course._id}`}
                className="w-full bg-transparent hover:bg-richblue-700 gap-3 px-5 flex xs:flex-row flex-col py-4"
                key={i}
                onClick={handleClick}
              >
                <img
                  src={course.thumbnail}
                  alt="course-img"
                  className="w-full h-40 xs:w-36 xs:h-20 mx-auto xs:mx-0 rounded-lg"
                />
                <div className="flex flex-col items-start justify-center gap-3 text-white">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-yellow-50 font-medium">
                    {course.instructor?.[0]} {course.instructor?.[1]}
                  </p>
                </div>
              </Link>
            ))}
          </li>
        </ul>
      ) : loading ? (
        <div className="w-full">
          <Skeleton
            count={
              querySearchCourses?.length === 0 ? 5 : querySearchCourses?.length
            }
            className="w-[90%] m-5"
            baseColor="#C5C7D4"
            highlightColor="#AFB2BF"
          />
        </div>
      ) : (
        <div className="w-full my-5 flex flex-col items-center justify-start gap-y-7 overflow-auto">
          {querySearchCourses?.length > 0 ||
          instructorProfile?.length > 0 ||
          autoComplete?.length > 0 ? (
            <>
              {autoComplete?.map((item, i) => (
                <div
                  className="w-full px-5 py-4 bg-transparent hover:bg-richblue-700"
                  key={i}
                >
                  <button
                    className="flex items-center justify-start gap-4"
                    onClick={() => {
                      setQuery(item.courseName);
                      setAutoComplete([]);
                    }}
                  >
                    <AiOutlineSearch className="font-semibold text-3xl font-mono" />
                    <div>
                      <p className="font-semibold text-left">
                        {item.courseName}
                      </p>
                    </div>
                  </button>
                </div>
              ))}

              {autoComplete?.length < 5 &&
                querySearchCourses?.map((course, i) => (
                  <Link
                    to={`/courses/${course._id}`}
                    className="w-full bg-transparent hover:bg-richblue-700 gap-3 px-5 flex xs:flex-row flex-col py-4"
                    key={i}
                    onClick={handleClick}
                  >
                    <img
                      src={course.thumbnail}
                      alt="course-img"
                      className="w-full h-40 xs:w-36 xs:h-20 mx-auto xs:mx-0"
                    />
                    <div className="flex flex-col items-start justify-center gap-3 mt-5 xs:mt-0">
                      <p className="font-semibold">{course?.courseName}</p>
                      <p className="text-yellow-50 font-medium">
                        {course.instructor?.[0]} {course.instructor?.[1]}
                      </p>
                    </div>
                  </Link>
                ))}

              {instructorProfile.map((item, i) => (
                <Link
                  to={`/instructor/${item._id}`}
                  className="w-full bg-transparent hover:bg-richblue-700 gap-3 px-5 flex py-4"
                  key={i}
                  onClick={handleClick}
                >
                  <img
                    src={item.image}
                    alt="course-img"
                    className="w-[48px] h-[48px] rounded-full xs:w-[68px] xs:h-[68px]"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <p className="font-bold text-lg">
                      {" "}
                      {item?.firstName} {item?.lastName}
                    </p>
                    <p className="font-medium text-yellow-50 ml-4">
                      Instructor
                    </p>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div
              className="w-full px-5 py-4 bg-transparent hover:bg-richblue-700"
              onClick={() => setSearchList(false)}
            >
              <Link
                className="flex items-center justify-start gap-4"
                to={`/search/${query}`}
              >
                <AiOutlineSearch className="font-semibold text-2xl font-mono" />
                <p className="font-semibold">{query}</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropDown;
