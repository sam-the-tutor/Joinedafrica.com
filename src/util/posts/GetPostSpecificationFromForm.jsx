/**
 * Create product specification based on what category and subcategory the users chooses.
 * @returns the specification of a given category and subcategory the user chooses.
 */

export default function getPostSpecificationFromForm(
  subcategoryName,
  model,
  brand,
  condition,
  yearOfManufacture,
  transmission,
  type,
  colour,
  processor,
  ram,
  storageCapacity,
  operatingSystem,
  storageType,
  gender,
  formation,
  bedrooms,
  bathrooms,
  hasParkingSpace,
  numberOfPlots,
  displayType,
  style,
  display,
  isRegistered,
  isFurnished
) {
  if (subcategoryName === "Cars") {
    return {
      Vehicles: {
        Cars: {
          Model: model,
          Brand: brand,
          Condition: condition,
          Year_of_manufacture: yearOfManufacture,
          Transmission: transmission,
          Is_Registered: isRegistered,
          Colour: colour,
        },
      },
    };
  }
  if (subcategoryName === "Buses") {
    return {
      Vehicles: {
        Buses: {
          Model: model,
          Brand: brand,
          Condition: condition,
          Year_of_manufacture: yearOfManufacture,
          Transmission: transmission,
          Is_Registered: isRegistered,
          Colour: colour,
        },
      },
    };
  }
  if (subcategoryName === "Trucks and trailers") {
    return {
      Vehicles: {
        Trucks_and_trailers: {
          Type: type,
          Model: model,
          Brand: brand,
          Condition: condition,
          Year_of_manufacture: yearOfManufacture,
          Transmission: transmission,
          Is_Registered: isRegistered,
          Colour: colour,
        },
      },
    };
  }
  if (subcategoryName === "Vehicle parts and assessories") {
    return {
      Vehicles: {
        Vehicle_parts_and_assessories: {
          Type: type,
          Brand: brand,
          Condition: condition,
        },
      },
    };
  }
  if (subcategoryName === "Motocycles and bicycles") {
    return {
      Vehicles: {
        Motocycles_and_bicycles: {
          Model: model,
          Brand: brand,
          Condition: condition,
          Year_of_manufacture: yearOfManufacture,
          Transmission: transmission,
          Type: type,
          Colour: colour,
        },
      },
    };
  }
  if (subcategoryName === "Computers and laptops") {
    return {
      Electronics: {
        Computers_and_laptops: {
          Model: model,
          Brand: brand,
          Condition: condition,
          Processor: processor,
          Type: type,
          Storage_Type: storageType,
          RAM: ram,
          Storage_Capacity: storageCapacity,
          Operating_System: operatingSystem,
        },
      },
    };
  }
  if (subcategoryName === "Audio and music equipments") {
    return {
      Electronics: {
        Audio_and_music_equipments: {
          Condition: condition,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Computer accessories") {
    return {
      Electronics: {
        Computer_accessories: {
          Condition: condition,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Tv and dvd equipment") {
    return {
      Electronics: {
        Tv_and_dvd_equipment: {
          Brand: brand,
          Type: type,
          Condition: condition,
        },
      },
    };
  }
  if (subcategoryName === "Skincare") {
    return {
      Health_and_beauty: {
        Skincare: {
          Condition: condition,
          Gender: gender,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Hair products") {
    return {
      Health_and_beauty: {
        Hair_products: {
          Condition: condition,
          Gender: gender,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Fragrances") {
    return {
      Health_and_beauty: {
        Fragrances: {
          Gender: gender,
          Condition: condition,
          Formation: formation,
        },
      },
    };
  }
  if (subcategoryName === "Vitamins and supplements") {
    return {
      Health_and_beauty: {
        Vitamins_and_supplements: {
          Formation: formation,
          Condition: condition,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Phones and tablets") {
    return {
      Mobile_phones_and_tablets: {
        Phones_and_tablets: {
          Model: model,
          Brand: brand,
          Condition: condition,
          RAM: ram,
          Display_Type: displayType,
          Storage_Capacity: storageCapacity,
          Colour: colour,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Accessories for mobile phones and tablets") {
    return {
      Mobile_phones_and_tablets: {
        Accessories_for_mobile_phones_and_tablets: {
          Condition: condition,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Houses and apartments for rent") {
    return {
      Properties: {
        Houses_and_apartments_for_rent: {
          Condition: condition,
          Bedrooms: bedrooms,
          Bathrooms: bathrooms,
          Is_Furnished: isFurnished,
          Has_Parking_Space: hasParkingSpace,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Houses and apartments for sale") {
    return {
      Properties: {
        Houses_and_apartments_for_sale: {
          Is_Furnished: isFurnished,
          Condition: condition,
          Bedrooms: bedrooms,
          Bathrooms: bathrooms,
          Type: type,
          Has_Parking_Space: hasParkingSpace,
        },
      },
    };
  }
  if (subcategoryName === "Land and plots for sale") {
    return {
      Properties: {
        Land_and_plots_for_sale: {
          Type: type,
          Number_of_Plots: numberOfPlots,
        },
      },
    };
  }
  if (subcategoryName === "Bags") {
    return {
      Fashion: {
        Bags: {
          Condition: condition,
          Colour: colour,
          Gender: gender,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Clothing and clothing accessories") {
    return {
      Fashion: {
        Clothing_and_clothing_accessories: {
          Condition: condition,
          Colour: colour,
          Gender: gender,
          Type: type,
        },
      },
    };
  }
  if (subcategoryName === "Watches") {
    return {
      Fashion: {
        Watches: {
          Gender: gender,
          Type: type,
          Display: display,
          Style: style,
          Brand: brand,
          Condition: condition,
          Colour: colour,
        },
      },
    };
  }
  if (subcategoryName === "Shoes") {
    return {
      Fashion: {
        Shoes: {
          Style: style,
          Type: type,
          Brand: brand,
          Condition: condition,
          Gender: gender,
          Colour: colour,
        },
      },
    };
  }
}
