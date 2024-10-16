import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const DropAccount = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSignOut = () => {
    dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: true } });

    dispatch({
      type: "USER_LOGOUT",
    });
    const timer = setTimeout(() => {
      dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: false } });
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className="relative inline-block">
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        className="text-black bg-gray-100  hover:bg-gray-200 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  "
        type="button"
        onClick={toggleDropdown}
      >
        {state?.user?.avatar !== null ? (
          <img
            src={state?.user?.avatar}
            className="rounded-full w-7 h-7"
            alt="avatar"
          />
        ) : (
          <p className="text-black font-medium">Account</p>
        )}
        <svg
          className="w-2.5 h-2.5 ml-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownInformation"
          className="z-10 bg-white divide-y absolute mt-2 -translate-x-14 divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 duration-[0.25s] ease-in"
        >
          {state?.user?.email !== null && (
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{state?.user?.name}</div>
              <div className="font-medium truncate">{state?.user?.email}</div>
            </div>
          )}
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownInformationButton"
          >
            {state?.user?.name === null && (
              <>
                <li>
                  <Link
                    onClick={toggleDropdown}
                    to="/sign-up"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleDropdown}
                    to="/sign-in"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}
            {state?.user?.name !== null && (
              <li>
                <Link
                  to="/"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
            )}
          </ul>
          {state?.user?.name !== null && (
            <div className="py-2">
              <a
                href="#"
                onClick={toggleDropdown && handleSignOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropAccount;
