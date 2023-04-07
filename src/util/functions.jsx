import React from "react";
import { AES, enc } from "crypto-js";

/**
 * Exact produduct specification extacts the product specification details provided by the user
 * @param {*} response Response is the post we get from the backend
 * @returns Returns an extracted product specification.
 */
export function extractProductSpecification(response) {
  if (response.subcategory === "Cars") {
    return {
      ...response.productSpecification.Vehicles.Cars,
    };
  }
  if (response.subcategory === "Buses") {
    return {
      ...response.productSpecification.Vehicles.Buses,
    };
  }
  if (response.subcategory === "Trucks and trailers") {
    return {
      ...response.productSpecification.Vehicles.Trucks_and_trailers,
    };
  }
  if (response.subcategory === "Vehicle parts and assessories") {
    return {
      ...response.productSpecification.Vehicles.Vehicle_parts_and_assessories,
    };
  }
  if (response.subcategory === "Motocycles and bicycles") {
    return {
      ...response.productSpecification.Vehicles.Motocycles_and_bicycles,
    };
  }
  if (response.subcategory === "Computers and laptops") {
    return {
      ...response.productSpecification.Electronics.Computers_and_laptops,
    };
  }
  if (response.subcategory === "Audio and music equipments") {
    return {
      ...response.productSpecification.Electronics.Audio_and_music_equipments,
    };
  }
  if (response.subcategory === "Computer accessories") {
    return {
      ...response.productSpecification.Electronics.Computer_accessories,
    };
  }
  if (response.subcategory === "Tv and dvd equipment") {
    return {
      ...response.productSpecification.Electronics.Tv_and_dvd_equipment,
    };
  }
  if (response.subcategory === "Skincare") {
    return {
      ...response.productSpecification.Health_and_beauty.Skincare,
    };
  }
  if (response.subcategory === "Hair products") {
    return {
      ...response.productSpecification.Health_and_beauty.Hair_products,
    };
  }
  if (response.subcategory === "Fragrances") {
    return {
      ...response.productSpecification.Health_and_beauty.Fragrances,
    };
  }
  if (response.subcategory === "Vitamins and supplements") {
    return {
      ...response.productSpecification.Health_and_beauty
        .Vitamins_and_supplements,
    };
  }
  if (response.subcategory === "Phones and tablets") {
    return {
      ...response.productSpecification.Mobile_phones_and_tablets
        .Phones_and_tablets,
    };
  }
  if (response.subcategory === "Accessories for mobile phones and tablets") {
    return {
      ...response.productSpecification.Mobile_phones_and_tablets
        .Accessories_for_mobile_phones_and_tablets,
    };
  }
  if (response.subcategory === "Houses and apartments for rent") {
    return {
      ...response.productSpecification.Properties
        .Houses_and_apartments_for_rent,
    };
  }
  if (response.subcategory === "Houses and apartments for sale") {
    return {
      ...response.productSpecification.Properties
        .Houses_and_apartments_for_sale,
    };
  }
  if (response.subcategory === "Land and plots for sale") {
    return {
      ...response.productSpecification.Properties.Land_and_plots_for_sale,
    };
  }
  if (response.subcategory === "Bags") {
    return {
      ...response.productSpecification.Fashion.Bags,
    };
  }
  if (response.subcategory === "Clothing and clothing accessories") {
    return {
      ...response.productSpecification.Fashion
        .Clothing_and_clothing_accessories,
    };
  }
  if (response.subcategory === "Watches") {
    return {
      ...response.productSpecification.Fashion.Watches,
    };
  }
  if (response.subcategory === "Shoes") {
    return {
      ...response.productSpecification.Fashion.Shoes,
    };
  }
}
export function setSessionStorage(key, value, isConfidential) {
  if (isConfidential) {
    sessionStorage.setItem(
      key,
      AES.encrypt(
        value,
        "Joined_Africa_is_the_number_one_online_marketplace_in_the_world"
      ).toString()
    );
  } else {
    sessionStorage.setItem(key, value);
  }
}
export function getFromSessionStorage(key, isConfidential) {
  if (isConfidential) {
    return AES.decrypt(
      sessionStorage.getItem(key),
      "Joined_Africa_is_the_number_one_online_marketplace_in_the_world"
    ).toString(enc.Utf8);
  } else {
    return sessionStorage.getItem(key);
  }
}
export function getUniqueId() {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
}

export function createObjectURLFromArrayOfBytes(file) {
  return URL.createObjectURL(new Blob([file], { type: "image/png" }));
}
