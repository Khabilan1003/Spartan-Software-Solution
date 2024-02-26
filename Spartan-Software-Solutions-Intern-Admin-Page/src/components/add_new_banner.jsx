import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";

export const AddNewBanner = ({ closeAdBanner, showToast }) => {
  // Form Data State Manangement
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("");
  const [bannerType, setBannerType] = useState("");
  // Banner Image
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Files Selected");
  const [base64Image, setBase64Image] = useState(null);

  // State of the form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  // State Variable to check whether the start date is set
  const [isStartDateSet, setIsStartDateSet] = useState(false);

  async function submitForm() {
    setIsSubmitting(true);
    if (
      !(title && url && startDate && endDate && priority && bannerType && image)
    ) {
      setIsFormValid(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/banners",
        {
          title,
          url,
          bannerImage: base64Image,
          priority,
          bannerType,
          startDate,
          endDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        showToast();
        closeAdBanner();
      }
    } catch (exception) {
      console.log("Add Banner Error : ", exception);
    }

    setIsSubmitting(false);
  }

  const handleImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result; // The Base64 string representation of the image
      setBase64Image(base64String);
      setImage(file);
      setFileName(file.name);
    };

    reader.onerror = (error) => {
      console.error("FileReader error:", error);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setBase64Image(null);
      setImage(null);
      setFileName("");
    }
  };

  return (
    <>
      {/* Backdrop */}.
      <div className="w-screen h-screen fixed left-0 top-0 bg-slate-300 z-50 opacity-40"></div>
      {/* Form */}
      <div className="w-screen h-screen fixed left-0 top-0 z-50">
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="w-5/6 md:w-2/3 lg:w-1/2 h-3/4 bg-white rounded-lg shadow p-4">
            {/* Title of the Form */}
            <div className="flex justify-between items-center border-b-2 pb-2">
              <span className="text-gray-800 capitalize font-semibold text-lg">
                New Banner
              </span>
              <IoMdClose
                className="w-8 h-8 rounded-md hover:bg-gray-100 p-1 text-gray-800"
                onClick={closeAdBanner}
              />
            </div>

            {/* Form */}
            <div className="pb-12 h-full">
              <div className=" overflow-y-scroll h-full">
                {/* Title */}
                <div className="sm:col-span-3 mt-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      type="text"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                {/* Banner Cover Photo */}
                <div className="col-span-full mt-4">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Banner photo
                  </label>
                  <label htmlfor="file-upload">
                    <img
                      src={base64Image}
                      className={`${
                        image == null && "hidden"
                      } w-full h-44 rounded-lg`}
                    />
                    <div
                      className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6 ${
                        image != null && "hidden"
                      } `}
                    >
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <div
                          for="file-upload"
                          className="mt-1 flex text-sm leading-6 text-gray-600"
                        >
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImage}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* URL */}
                <div className="sm:col-span-3 mt-4">
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    URL
                  </label>
                  <div className="mt-2">
                    <input
                      id="url"
                      type="url"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                {/* Dropdowns */}
                <div className="md:flex md:space-x-8 justify-center items-center">
                  {/* Priority Dropdown */}
                  <div className="flex-1 sm:col-span-3 mt-4">
                    <label
                      htmlFor="priority"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Priority
                    </label>
                    <div className="mt-2">
                      <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Priority Type...</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="high">Low</option>
                      </select>
                    </div>
                  </div>
                  {/* Display Type */}
                  <div className="flex-1 sm:col-span-3 mt-4">
                    <label
                      htmlFor="displayType"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Display Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="displayType"
                        value={bannerType}
                        onChange={(e) => setBannerType(e.target.value)}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Banner Type...</option>
                        <option value="top">Top Banner</option>
                        <option value="bottom">Bottom Banner</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  date-rangepicker
                  className="flex-col flex md:flex-row items-center md:space-x-8 space-x-0"
                >
                  <div className="flex-1 w-full">
                    <label
                      htmlFor="startDate"
                      className="mt-4  block text-sm font-medium leading-6 text-gray-900"
                    >
                      Start Date
                    </label>
                    <div className="relative flex-1 mt-2">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        id="startDate"
                        type="date"
                        className="border shadow-sm text-gray-900 text-sm rounded-lg block w-full ps-10 p-2"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          if (e.target.value) {
                            setIsStartDateSet(true);
                          } else {
                            setIsStartDateSet(false);
                          }
                          setEndDate("");
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <label
                      htmlFor="endDate"
                      className="mt-4  block text-sm font-medium leading-6 text-gray-900"
                    >
                      End Date
                    </label>
                    <div className="relative flex-1 mt-2">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        id="endDate"
                        type="date"
                        className="border shadow-sm text-gray-900 text-sm rounded-lg block w-full ps-10 p-2"
                        onChange={(e) => setEndDate(e.target.value)}
                        disabled={!isStartDateSet}
                        min={startDate}
                        value={endDate}
                      />
                    </div>
                  </div>
                </div>

                <p
                  className={`text-red-500 font-semibold italic text-center mt-2 ${
                    isFormValid && "hidden"
                  }`}
                >
                  Enter all the fields to create new Banner{" "}
                </p>

                <div className="mt-6 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    onClick={!isSubmitting && closeAdBanner}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    onClick={!isSubmitting && submitForm}
                  >
                    {isSubmitting && (
                      <Oval
                        height={18}
                        strokeWidth={8}
                        color="#ffffff"
                        secondaryColor="#1d4ed8"
                      />
                    )}
                    {!isSubmitting && "Add Banner"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
