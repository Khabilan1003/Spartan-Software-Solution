import { FaClock } from "react-icons/fa6";
import { BannerContext } from "../provider/banner_provider";
import { useContext } from "react";
export const BannersList = () => {
  const { banners } = useContext(BannerContext);
  return (
    <div className="mt-3 mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {banners.map((banner) => (
        <BannerCard banner={banner} />
      ))}
    </div>
  );
};

const BannerCard = ({ banner }) => {
  // Date Handling Functions
  const isDateBetween = (startDate, endDate, targetDate) => {
    return startDate <= targetDate && targetDate <= endDate;
  };
  const isDateBeforeStartDate = (startDate, targetDate) => {
    return targetDate < startDate;
  };
  const isDateAfterEndDate = (endDate, targetDate) => {
    return endDate < targetDate;
  };
  const getDaysDifference = (startDate, endDate) => {
    // Convert both dates to milliseconds
    const startMilliseconds = startDate.getTime();
    const endMilliseconds = endDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMilliseconds = Math.abs(
      endMilliseconds - startMilliseconds
    );

    // Convert the difference back to days
    const differenceDays = Math.ceil(
      differenceMilliseconds / (1000 * 60 * 60 * 24)
    );

    return differenceDays;
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
      <a className="relative" href="#">
        <img
          className="rounded-t-lg h-32 w-full object-fill"
          src={banner.bannerImage}
          alt=""
        />
        {isDateBetween(
          new Date(banner.startDate),
          new Date(banner.endDate),
          new Date()
        ) && (
          <div className="absolute rounded-md bg-green-400 opacity-95 top-2 right-2 px-2 py-1">
            <span className="flex items-center text-white opacity-100 font-semibold">
              <FaClock className="mr-1.5" />
              {getDaysDifference(new Date(), new Date(banner.endDate))} days
              more
            </span>
          </div>
        )}

        {isDateBeforeStartDate(new Date(banner.startDate), new Date()) && (
          <div className="absolute rounded-md bg-orange-400 top-2 right-2 px-2 py-1">
            <span className="flex items-center text-white opacity-100 font-semibold">
              <FaClock className="mr-1.5" />
              {getDaysDifference(new Date(banner.startDate), new Date())} days
              after
            </span>
          </div>
        )}

        {isDateAfterEndDate(new Date(banner.endDate), new Date()) && (
          <div className="absolute rounded-md bg-red-400 top-2 right-2 px-2 py-1">
            <span className="flex items-center text-white opacity-100 font-semibold">
              <FaClock className="mr-1.5" />
              {getDaysDifference(new Date(), new Date(banner.endDate))} days
              before
            </span>
          </div>
        )}
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 overflow-x-hidden">
            {banner.title}{" "}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">{banner.url}</p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Update
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
