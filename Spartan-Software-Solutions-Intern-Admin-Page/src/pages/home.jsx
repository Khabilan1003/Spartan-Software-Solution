import { useState } from "react";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdOutlineExpandMore } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AddNewBanner } from "../components/add_new_banner";
import { Dashboard } from "./dashboard";
import { AdsBanner } from "./ads_banner";
import { Toast } from "../components/toast";

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddBannerOpen, setIsAddBannerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(1);

  // Toast
  const [toastVisiblity, setToastVisiblity] = useState(false);

  function openAddBanner() {
    setIsAddBannerOpen(true);
  }

  function closeAdBanner() {
    setIsAddBannerOpen(false);
  }

  // Function used to show toast message when new banner is added
  function showToast() {
    setToastVisiblity(true);
    setTimeout(() => {
      setToastVisiblity(false);
    }, 3000);
  }

  return (
    <>
      {/* If Banner is added Toast will be shown */}
      {toastVisiblity && <Toast setToastVisiblity={setToastVisiblity} />}

      <div className="flex items-start justify-start">
        {/* Drawer Code */}
        <div className="sticky top-0 left-0 z-50">
          <div
            className={`${
              !isMenuOpen ? "-translate-x-full" : ""
            } fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-64 md:translate-x-0 md:static border-2 border-gray-200`}
          >
            <h5 className="text-base font-semibold text-gray-500 uppercase">
              Menu
            </h5>
            <button
              className="md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
            <div className="py-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                {/* Top Banners */}
                <li>
                  <div
                    className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                      selectedMenu == 1 ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedMenu(1);
                      setIsMenuOpen(false);
                    }}
                  >
                    <RiAdvertisementFill
                      className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${
                        selectedMenu == 1 ? "text-gray-900" : ""
                      }`}
                      size={20}
                    />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Dashboard
                    </span>
                  </div>
                </li>
                {/* Bottom Banners */}
                <li>
                  <div
                    className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group  ${
                      selectedMenu == 2 ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedMenu(2);
                      setIsMenuOpen(false);
                    }}
                  >
                    <RiAdvertisementFill
                      className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${
                        selectedMenu == 2 ? "text-gray-900" : ""
                      }`}
                      size={20}
                    />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Ads Banner
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                      7
                    </span>
                  </div>
                </li>
                {/* Logout Button */}
                <li>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      />
                    </svg>
                    <NavLink to="/" className="flex-1 ms-3 whitespace-nowrap">
                      Logout
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`${
              isMenuOpen
                ? "fixed z-30 left-0 top-0 bg-gray-400 h-screen w-screen bg-opacity-20"
                : ""
            } md:hidden`}
            onClick={() => setIsMenuOpen(false)}
          ></div>
        </div>

        <div className="flex-1">
          <div className="flex w-full items-start justify-start flex-col">
            {/* Navigation Bar Code */}
            <nav className="bg-white sticky z-20 top-0 start-0 w-full border-b-2 border-gray-200 ">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:justify-end mx-auto p-4">
                <button
                  className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>

                <div className="relative group cursor-pointer">
                  <div className="inline-flex justify-center items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full inline-flex items-center justify-center">
                      <span className="font-medium text-gray-600 group-hover:text-gray-700">
                        KS
                      </span>
                    </div>
                    <span className="ml-4 font-semibold hidden md:block">
                      Khabilan
                    </span>
                    <MdOutlineExpandMore className="w-6 h-6 hidden md:block" />
                  </div>

                  <div className="hidden group-hover:block absolute top-0 right-0 h-12 w-40"></div>
                  <div
                    id="dropdown"
                    className="hidden group-hover:block absolute top-0 right-0 mt-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <NavLink
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/"
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>

            {/* Content */}
            {selectedMenu == 1 ? <Dashboard /> : null}
            {selectedMenu == 2 ? (
              <AdsBanner openAddBanner={openAddBanner} />
            ) : null}
          </div>
        </div>
      </div>

      {isAddBannerOpen ? (
        <AddNewBanner closeAdBanner={closeAdBanner} showToast={showToast} />
      ) : null}
    </>
  );
};
