import React, { useContext, useState } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa6";

const UpperNavbar = () => {
  const { setSearchcategory, theme, setTheme } = useContext(Context);
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();

  const setCategory = (event) => {
    setSearch(event.target.value);
  };

  const performSearch = () => {
    if (search.length !== 0) {
      setSearchcategory(search);
      Navigate(`/searchResults/${search}`);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const searchEnter = (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  return (
    <>
      <nav
        className={`flex justify-center ${theme === "light" ? "bg-white" : "bg-black"
          } fixed ${theme === "light" ? "text-black" : "text-white"
          } top-0 items-center h-[60px] w-full z-10`}
      >
        <ul className=" w-full flex justify-between">
          <li className="flex items-center justify-center">
            <div className=" flex justify-center items-center mx-3">
              <img
                src="/images/youtube.webp"
                className="w-[75px] h-auto cursor-pointer"
                onClick={() => {
                  Navigate("/");
                }}
                alt="Youtube"
              />
            </div>
          </li>

          <li className="flex items-center justify-center">
            <div className="flex justify-center items-center">
              <input
                type="text"
                name="search"
                id="search"
                className={`rounded-l-full cursor-text text-black ${theme === "light" ? "bg-slate-200" : "bg-gray-200"
                  } lg:w-[600px] md:w-[400px] sm:w-[300px] w-[150px] px-[20px] py-[5px]`}
                placeholder="search video..."
                onKeyUp={searchEnter}
                onChange={setCategory}
                value={search}
                autoComplete="off"
              />
              <div
                id="serchButton"
                className="flex justify-center items-center w-[40px] h-[35px] bg-slate-400 rounded-r-full cursor-pointer"
                onClick={performSearch}
              >
                <IoMdSearch className="text-2xl" />
              </div>
            </div>
          </li>

          <li className="flex items-center justify-center mx-3">
            <button
              type="button"
              className={`w-9 h-9 rounded-full flex justify-center items-center ${theme === "light" ? "bg-slate-200" : "bg-slate-800"}`}
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UpperNavbar;
