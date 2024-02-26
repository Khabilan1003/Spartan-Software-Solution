import { IoMdAdd } from "react-icons/io";
import { BannersList } from "../components/banners_list";
import { BannersFilter } from "../components/banner_filters";
import { BannerProvider } from "../provider/banner_provider";
export const AdsBanner = ({ openAddBanner }) => {
  return (
    <BannerProvider>
      <div className="px-4 w-full">
        {/* Search Bar and Add Banner */}
        <div className="flex justify-between items-center py-2">
          <div className="flex justify-start items-center">
            <label for="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block lg:w-96 md:w-56  ps-10 p-2.5"
                placeholder="Search..."
              />
              <button
                type="button"
                className="absolute inset-y-0 end-0 flex items-center pe-3"
              ></button>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="ml-2 hidden md:inline">Search</span>
            </button>
          </div>

          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-start items-center"
            onClick={openAddBanner}
          >
            <IoMdAdd className="h-5 w-5" />
            <span className="ml-1 text-base">Add Banner</span>
          </button>
        </div>

        {/* Banners Filter */}
        <BannersFilter />

        {/* Banner Grid View List */}
        <BannersList />
      </div>
    </BannerProvider>
  );
};
