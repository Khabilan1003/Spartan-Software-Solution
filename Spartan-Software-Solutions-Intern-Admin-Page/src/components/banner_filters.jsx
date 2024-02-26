import { DropdownCheckbox } from "./dropdown_checkbox";
import { Dropdown } from "./dropdown";
import { FilterMenu } from "./filter_menu";
import { useContext, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { BannerContext } from "../provider/banner_provider";

export const BannersFilter = () => {
  const { sortMap, filterMap } = useContext(BannerContext);

  // Filter State and Methods
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilterMenu = () => {
    setIsFilterOpen((val) => !val);
  };

  return (
    <>
      <FilterMenu
        isOpen={isFilterOpen}
        filterMap={filterMap}
        toggleFilterMenu={toggleFilterMenu}
      />

      <div className="flex items-center justify-between  border-b py-1">
        <Dropdown mappings={sortMap} />

        <div className="hidden md:flex space-x-4">
          {Object.keys(filterMap).map((key) => (
            <DropdownCheckbox mappings={filterMap[key]} title={key} />
          ))}
        </div>

        <div className="md:hidden">
          <FaFilter onClick={toggleFilterMenu} className="opacity-80" />
        </div>
      </div>
    </>
  );
};
