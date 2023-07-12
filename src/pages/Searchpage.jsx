import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSearchPageData } from "../services/operations/searchAPI";
import { useState } from "react";
import FilterSection from "../components/core/Search/Searchpage/FilterSection";
import CoursesSection from "../components/core/Search/Searchpage/CoursesSection";
import { FiFilter } from "react-icons/fi";
import { toast } from "react-toastify";
import { AiOutlineDown } from "react-icons/ai";

const Searchpage = () => {
  const { query } = useParams();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      const res = await getSearchPageData(query);
      if (res) {
        console.log(res);
        setCourses(res);
      }
      setLoading(false);
    };
    fetchPageData();
  }, [query]);

  const handleClick = () => {
    toast.info("Feature Coming Soon!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="mt-14">
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <div className="h-[calc(100vh-3.5rem)] overflow-auto flex-1">
          <div className="mx-auto w-11/12 max-w-[90%] py-10">
            <h1 className="mb-14 text-3xl border-b-2 border-b-richblue-400 pb-2 font-semibold text-richblue-200">
              {courses.length > 0
                ? `${courses.length} Search Result for "${query}"`
                : `Sorry, we couldn't find any results for "${query}"`}
            </h1>

            {loading ? (
              <div className="grid flex-1 place-items-center h-[60vh]">
                <div className="spinner"></div>
              </div>
            ) : courses?.length > 0 ? (
              <div className="mt-8 flex items-start gap-y-10 flex-col">
                <div className="flex flex-row text-richblue-5 gap-x-5">
                  <button
                    className="flex flex-row gap-3 text-lg px-6 py-4 border border-richblue-50 items-center"
                    onClick={handleClick}
                  >
                    <FiFilter className="" /> Filter
                  </button>
                  <button
                    className="flex flex-row gap-5 text-lg px-6 py-4 border border-richblue-50 items-center"
                    onClick={handleClick}
                  >
                    <div className="flex flex-col gap-y-2 items-start">
                      <p className="text-sm text-richblack-100">Sort by</p>
                      <p>Most Relevant</p>
                    </div>
                    <AiOutlineDown className="" />
                  </button>
                </div>
                <div className="flex items-start gap-x-10 w-full">
                  <FilterSection className="" />
                  <CoursesSection courses={courses} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-start justify-start px-4">
                <p className="text-xl text-richblue-200 font-bold">
                  Try adjusting your search. Here are some ideas:
                </p>
                <div className="mx-4 px-4">
                  <ul className="list-disc">
                    <li className="text-base text-richblack-200">
                      No course related to search term:{" "}
                      <span className="text-pink-300">"{query}"</span>
                    </li>
                    <li className="text-base text-richblack-200">
                      Make sure all words are spelled correctly
                    </li>
                    <li className="text-base text-richblack-200">
                      Try different search terms
                    </li>
                    <li className="text-base text-richblack-200">
                      Try more general search terms
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchpage;
