import { useEffect, useState, useRef } from "react";
import { MdExpandMore } from "react-icons/md";

export const Dropdown = ({ mappings }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { type, selected, toggler } = mappings;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 rounded-md p-1"
        onClick={toggleDropdown}
      >
        <span className="text-base font-medium text-gray-600">{selected}</span>
        <MdExpandMore className="mt-0.5" />
      </button>

      <div
        className={`${
          !isOpen && "hidden"
        } py-2 absolute rounded-md bg-white w-36 shadow-md top-8 left-2 z-40 border border-gray-200 flex flex-col items-start`}
      >
        {type.map((option, index) => (
          <button
            className={`${
              selectedOption === index ? "text-gray-900" : "text-gray-500"
            } px-2 py-1 whitespace-normal overflow-hidden hover:bg-gray-50 w-full text-start`}
            onClick={() => {
              toggler(option);
              setIsOpen(false);
            }}
          >
            <span className="w-full py-3 ms-2 text-sm font-medium ">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
