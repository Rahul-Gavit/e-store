import React from "react";
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ClockIcon,
  CameraIcon,
  TvIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

const iconMap = {
  phone: DevicePhoneMobileIcon,
  computer: ComputerDesktopIcon,
  camera: CameraIcon,
  clock: ClockIcon,
  tv: TvIcon,
  home: HomeIcon,
};

const BrowseCategory = ({ category, categoryName }) => {
  const IconComponent = iconMap[category];

  if (!IconComponent) {
    return null; // or display a default icon
  }

  return (
    <div className="my-2">
      <div className="h-24 w-32 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-red-400 cursor-pointer hover:bg-red-500 text-white flex flex-col items-center justify-center">
        <IconComponent className="h-12 w-12" />
        <p className="text-sm mt-2 font-medium">{categoryName}</p>
      </div>
    </div>
  );
};

export default BrowseCategory;
