import { useEffect, useState, useRef } from "react";
import { MdExpandMore } from "react-icons/md";

export const DropdownCheckbox = ({ mappings, title }) => {
  const { type, selected, toggler } = mappings;
  console.log(selected);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        <span className="text-base font-medium text-gray-600">{title}</span>
        <MdExpandMore className="mt-0.5" />
      </button>
      <div
        className={`${
          !isOpen && "hidden"
        } py-2 absolute rounded-md bg-white w-36 shadow-md top-8 right-2 z-40 border border-gray-200 flex flex-col items-start`}
      >
        {type.map((option, index) => (
          <div
            class="flex items-center ps-3 hover:bg-gray-50 w-full"
            key={option}
          >
            <input
              id={option}
              type="checkbox"
              checked={selected.includes(option) ? true : false}
              onChange={() => toggler(option)}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label
              for={option}
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
