export const FilterMenu = ({ isOpen, filterMap, toggleFilterMenu }) => {
  return (
    <div className={`relative z-40 md:hidden`} role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-20 z-40 transition-all delay-300 ease-in-out ${
          !isOpen && "hidden"
        }`}
        onClick={toggleFilterMenu}
      ></div>

      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 z-40 ml-auto flex h-full w-64 flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition-transform`}
      >
        {/* <!-- Filtes Title --> */}
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            onClick={toggleFilterMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* <!-- Filters --> */}
        <form className="mt-4 border-t border-gray-200">
          {Object.keys(filterMap).map((key) => (
            <FilterOptions mappings={filterMap[key]} title={key} />
          ))}
        </form>
      </div>
    </div>
  );
};

const FilterOptions = ({ mappings, title }) => {
  const { type, selected, toggler } = mappings;
  return (
    <div className="border-t border-gray-200 px-4 py-6">
      <h3 className="-mx-2 -my-3 flow-root">
        {/* <!-- Expand/collapse section button --> */}
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
        >
          <span className="font-medium text-gray-900">{title}</span>
        </button>
      </h3>

      {/* Filter section, show/hide based on section state.*/}
      <div className="pt-6" id="filter-section-mobile-0">
        <div className="space-y-4">
          {type.map((option) => (
            <div className="flex items-center">
              <input
                id={option}
                type="checkbox"
                checked={selected.includes(option) ? true : false}
                onChange={() => toggler(option)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label for={option} className="ml-3 min-w-0 flex-1 text-gray-500">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
