import React from "react";
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ClockIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";

const iconMap = {
  phone: DevicePhoneMobileIcon,
  computer: ComputerDesktopIcon,
  camera: CameraIcon,
  clock: ClockIcon,
};

const BrowseCategory = ({ category, categoryName }) => {
  const IconComponent = iconMap[category];

  if (!IconComponent) {
    return null; // or display a default icon
  }

  return (
    <div className="my-2">
      <div className="h-24 w-32 border border-gray-300 rounded-sm flex flex-col items-center justify-center">
        <IconComponent className="h-12 w-12" />
        <p>{categoryName}</p>
      </div>
    </div>
  );
};

export default BrowseCategory;
