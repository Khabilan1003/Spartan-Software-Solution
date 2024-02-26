import React, { useState, useEffect } from "react";
import axios from "axios";

export const BannerContext = React.createContext();

export const BannerProvider = ({ children }) => {
  // Constants
  const bannerTypes = ["Top", "Bottom"];
  const bannerPriorityTypes = ["High", "Medium", "Low"];
  const bannerStatusTypes = ["Ongoing Ads", "Completed Ads", "Upcoming Ads"];

  const sortTypes = ["Most Recent", "Oldest"];

  //State Variables
  const [loading, setLoading] = useState(false);
  const [selectedSortType, setSelectedSortType] = useState(sortTypes[0]);
  const [selectedBannerTypes, setSelectedBannerTypes] = useState([]);
  const [selectedPriorityTypes, setSelectedPriorityTypes] = useState([]);
  const [selectedStatusTypes, setSelectedStatusTypes] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getBannerData = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/banners?sort=${selectedSortType}`;

        if (selectedStatusTypes.length !== 0)
          url += `&status=${selectedStatusTypes.toString()}`;
        if (selectedBannerTypes.length !== 0)
          url += `&bannerType=${selectedBannerTypes.toString()}`;
        if (selectedPriorityTypes.length !== 0)
          url += `&priority=${selectedPriorityTypes.toString()}`;

        const result = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        setBanners(result.data);
      } catch (error) {
        console.log(`Banners GET Method Exception : ${error}`);
      }
      setLoading(false);
    };

    getBannerData();
  }, [
    selectedSortType,
    selectedBannerTypes,
    selectedPriorityTypes,
    selectedStatusTypes,
  ]);

  //Toggle Functions
  const toggleSortType = (option) => setSelectedSortType(option);
  const toggleBannerTypes = (option) => {
    const index = selectedBannerTypes.findIndex((opt) => option === opt);

    if (index === -1) {
      setSelectedBannerTypes((prevArray) => [...prevArray, option]);
    } else {
      setSelectedBannerTypes((prevArray) => {
        const newArray = [...prevArray];
        newArray.splice(index, 1);
        return newArray;
      });
    }
  };
  const togglePriorityTypes = (option) => {
    const index = selectedPriorityTypes.findIndex((opt) => option === opt);

    if (index === -1) {
      setSelectedPriorityTypes((prevArray) => [...prevArray, option]);
    } else {
      setSelectedPriorityTypes((prevArray) => {
        const newArray = [...prevArray];
        newArray.splice(index, 1);
        return newArray;
      });
    }
  };
  const toggleStatusTypes = (option) => {
    const index = selectedStatusTypes.findIndex((opt) => option === opt);

    if (index === -1) {
      setSelectedStatusTypes((prevArray) => [...prevArray, option]);
    } else {
      setSelectedStatusTypes((prevArray) => {
        const newArray = [...prevArray];
        newArray.splice(index, 1);
        return newArray;
      });
    }
  };

  const filterMap = {
    "Ad Type": {
      type: bannerTypes,
      selected: selectedBannerTypes,
      toggler: toggleBannerTypes,
    },
    "Ad Priority": {
      type: bannerPriorityTypes,
      selected: selectedPriorityTypes,
      toggler: togglePriorityTypes,
    },
    "Ad Status": {
      type: bannerStatusTypes,
      selected: selectedStatusTypes,
      toggler: toggleStatusTypes,
    },
  };

  const sortMap = {
    type: sortTypes,
    selected: selectedSortType,
    toggler: toggleSortType,
  };

  // Combine the state values and the toggleMethod inside a map
  const contextValue = {
    loading,
    filterMap,
    sortMap,
    banners,
  };

  return (
    <BannerContext.Provider value={contextValue}>
      {children}
    </BannerContext.Provider>
  );
};
