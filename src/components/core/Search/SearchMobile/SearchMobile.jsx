import React from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import SearchDropDown from "../SearchDropDown";
import { useState } from "react";

const SearchMobile = ({ searchOpen, setSearchOpen,subLinks }) => {

  const [searchList, setSearchList] = useState(false);
  const [query, setQuery] = useState("")

  console.log(query);

  return (
    <>
      <div
        className={`relative overflow-hidden lg:hidden ${
          searchOpen
            ? "w-[90vw] rounded-3xl bg-richblue-400 mx-auto"
            : "w-[40px] rounded-full bg-transparent"
        } transition-all duration-1000`}
      >
        <input
          type="search"
          name="search"
          placeholder="Search...."
          onChange={(e)=>setQuery(e.target.value)}
          onClick={()=>setSearchList(true)}
          value={query}
          autoComplete="off"
          className={`search__input ${
            searchOpen ? "w-[87vw] opacity-100 p-4" : "w-0 opacity-0 p-0"
          } transition-all duration-1000 h-[35px] bg-richblue-400 border-none outline-none font-semibold text-richblack-5`}
        />
        <button
           onClick={() => {setSearchOpen((prev) => !prev); setQuery("")}}
          className="w-8 h-8 bg-richblue-600 rounded-full absolute top-[1.1px] right-1 mx-auto grid place-items-center place-content-center transition-[transform] duration-[0.6s]"
        >
          <AiOutlineSearch
            className={`text-xl text-richblack-5 absolute ${
              searchOpen ? "rotate-90 scale-0" : "scale-100"
            } transition-all duration-[2s]`}
          />
          <AiOutlineCloseCircle
            className={`text-xl text-richblack-5 absolute  transition-all duration-1000 ${
              searchOpen ? "scale-100" : "-rotate-90 scale-0"
            } transition-all duration-[2s]`}
          />
        </button>
      </div>
      
      <SearchDropDown
        subLinks={subLinks}
        searchList={searchList}
        setSearchList={setSearchList}
        customClass={"w-[90vw] lg:hidden h-auto max-h-[50vh]"}
        query={query}
        setQuery={query}
        setSearchOpen={setSearchOpen}
      />
    </>
  );
};

export default SearchMobile;
