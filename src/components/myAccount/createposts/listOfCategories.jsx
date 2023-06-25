import CableIcon from "@mui/icons-material/Cable";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import React from "react";

export const categories = [
  {
    name: "Vehicles",
    icon: <DirectionsCarIcon />,
    subcategory: [
      "Cars",
      "Buses",
      "Trucks and trailers",
      "Vehicle parts and accessories",
      "Motocycles and bicycles",
    ],
  },
  {
    name: "Electronics",
    icon: <CableIcon />,
    subcategory: [
      "Computers and laptops",
      "Electronic supplies",
      "Audio and music equipments",
      "Computer accessories",
      "Tv and dvd equipments",
    ],
  },
  {
    name: "Health and beauty",
    icon: <FavoriteBorderIcon />,
    subcategory: [
      "Skincare",
      "Hair products",
      "Fragrances",
      "Vitamins and supplements",
    ],
  },
  {
    name: "Mobile phones and tablets",
    icon: <PhoneAndroidIcon />,
    subcategory: [
      "Phones and tablets",
      "Accessories for mobile phones and tablets",
    ],
  },
  {
    name: "Properties",
    icon: <HomeIcon />,
    subcategory: [
      "Houses and apartments for rent",
      "Houses and apartments for sale",
      "Land and plots for sale",
    ],
  },

  {
    name: "Fashion",
    icon: <CheckroomIcon />,
    subcategory: [
      "Bags",
      "Clothing and clothing accessories",
      "Watches",
      "Shoes",
    ],
  },
];
export function getCategoryNames() {
  const result = [];
  categories.forEach((category) => result.push(category.name));
  return result;
}

export function getSubcategory(categoryName) {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].name === categoryName) return categories[i].subcategory;
  }
  return [];
}

export function getCities() {
  return ["Abuja", "Lagos", "Port Harcourt"];
}
