import React, { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import SearchDropDown from "../SearchDropDown";
import { useNavigate } from "react-router-dom";

const SearchWeb = ({ searchOpen, setSearchOpen, subLinks }) => {
  const [searchList, setSearchList] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden ${
          searchOpen
            ? "2xl:w-[40vw] w-[45vw] rounded-3xl bg-richblue-400"
            : "w-[40px] rounded-full bg-transparent"
        } transition-all duration-1000`}
      >
        <input
          type="search"
          name="search"
          placeholder="Search...."
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => setSearchList(true)}
          value={query}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setSearchList(false)
              return navigate(`/search/${query}`);
            }
          }}
          autoComplete="off"
          className={`search__input ${
            searchOpen ? "w-[43vw] opacity-100 p-4" : "w-0 opacity-0 p-0"
          } transition-all duration-1000 h-[35px] bg-richblue-400 border-none outline-none font-semibold text-richblack-5`}
        />
        <button
          onClick={() => {
            setSearchOpen((prev) => !prev);
            setQuery("");
          }}
          className="w-8 h-8 bg-richblue-600 rounded-full absolute top-[1.1px] right-1 mx-auto grid place-items-center place-content-center transition-[transform] duration-[0.6s]"
        >
          <AiOutlineSearch
            className={`text-xl text-richblack-5 absolute ${
              searchOpen ? "rotate-90 scale-0" : "scale-100"
            } transition-all duration-[2s]`}
          />
          <AiOutlineCloseCircle
            className={`text-xl text-richblack-5 absolute transition-all duration-1000 ${
              searchOpen ? "scale-100" : "-rotate-90 scale-0"
            } transition-all duration-[2s]`}
          />
        </button>
      </div>

      <SearchDropDown
        subLinks={subLinks}
        searchList={searchList}
        setSearchList={setSearchList}
        customClass="2xl:w-[38vw] w-[45vw] h-auto max-h-[50vh]"
        query={query}
        setQuery={setQuery}
        setSearchOpen={setSearchOpen}
      />
    </div>
  );
};

export default SearchWeb;
