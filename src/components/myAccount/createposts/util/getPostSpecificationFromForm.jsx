/**
 * Create product specification based on what category and subcategory the users chooses.
 * @returns the specification of a given category and subcategory the user chooses.
 */

export default function getPostSpecificationFromForm(state) {
  const subcategoryName = state.selectedSubcategory;
  if (subcategoryName === "Cars") {
    return {
      Vehicles: {
        Cars: {
          Model: state.model,
          Brand: state.brand,
          Condition: state.condition,
          Year_of_manufacture: state.yearOfManufacture,
          Transmission: state.transmission,
          Is_Registered: state.isRegistered,
          Colour: state.colour,
        },
      },
    };
  }
  if (subcategoryName === "Buses") {
    return {
      Vehicles: {
        Buses: {
          Model: state.model,
          Brand: state.brand,
          Condition: state.condition,
          Year_of_manufacture: state.yearOfManufacture,
          Transmission: state.transmission,
          Is_Registered: state.isRegistered,
          Colour: state.colour,
        },
      },
    };
  }
  if (subcategoryName === "Trucks and trailers") {
    return {
      Vehicles: {
        Trucks_and_trailers: {
          Type: state.type,
          Model: state.model,
          Brand: state.brand,
          Condition: state.condition,
          Year_of_manufacture: state.yearOfManufacture,
          Transmission: state.transmission,
          Is_Registered: state.isRegistered,
          Colour: state.colour,
        },
      },
    };
  }
  if (subcategoryName === "Vehicle parts and assessories") {
    return {
      Vehicles: {
        Vehicle_parts_and_assessories: {
          Type: state.type,
          Brand: state.brand,
          Condition: state.condition,
        },
      },
    };
  }
  if (subcategoryName === "Motocycles and bicycles") {
    return {
      Vehicles: {
        Motocycles_and_bicycles: {
          Model: state.model,
          Brand: state.brand,
          Condition: state.condition,
          Year_of_manufacture: state.yearOfManufacture,
          Transmission: state.transmission,
          Type: state.type,
          Colour: state.colour,
        },
      },
    };
  }
  if (subcategoryName === "Computers and laptops") {
    return {
      Electronics: {
        Computers_and_laptops: {
          Model: state.model,
          Brand: state.brand,
          Condition: state.condition,
          Processor: state.processor,
          Type: state.type,
          Storage_Type: state.storageType,
          RAM: state.ram,
          Storage_Capacity: state.storageCapacity,
          Operating_System: state.operatingSystem,
        },
      },
    };
  }
  if (subcategoryName === "Audio and music equipments") {
    return {
      Electronics: {
        Audio_and_music_equipments: {
          Condition: state.condition,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Computer accessories") {
    return {
      Electronics: {
        Computer_accessories: {
          Condition: state.condition,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Tv and dvd equipment") {
    return {
      Electronics: {
        Tv_and_dvd_equipment: {
          Brand: state.brand,
          Type: state.type,
          Condition: state.condition,
        },
      },
    };
  }
  if (subcategoryName === "Skincare") {
    return {
      Health_and_beauty: {
        Skincare: {
          Condition: state.condition,
          Gender: state.gender,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Hair products") {
    return {
      Health_and_beauty: {
        Hair_products: {
          Condition: state.condition,
          Gender: state.gender,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Fragrances") {
    return {
      Health_and_beauty: {
        Fragrances: {
          Gender: state.gender,
          Condition: state.condition,
          Formation: state.formation,
        },
      },
    };
  }
  if (subcategoryName === "Vitamins and supplements") {
    return {
      Health_and_beauty: {
        Vitamins_and_supplements: {
          Formulation: state.formulation,
          Condition: state.condition,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Phones and tablets") {
    return {
      Mobile_phones_and_tablets: {
        Phones_and_tablets: {
          Model: state.model,
          Brand: state.brand,
          Condition: state.condition,
          RAM: state.ram,
          Display_Type: state.displayType,
          Storage_Capacity: state.storageCapacity,
          Colour: state.colour,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Accessories for mobile phones and tablets") {
    return {
      Mobile_phones_and_tablets: {
        Accessories_for_mobile_phones_and_tablets: {
          Condition: state.condition,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Houses and apartments for rent") {
    return {
      Properties: {
        Houses_and_apartments_for_rent: {
          Condition: state.condition,
          Bedrooms: state.bedrooms,
          Bathrooms: state.bathrooms,
          Is_Furnished: state.isFurnished,
          Has_Parking_Space: state.hasParkingSpace,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Houses and apartments for sale") {
    return {
      Properties: {
        Houses_and_apartments_for_sale: {
          Is_Furnished: state.isFurnished,
          Condition: state.condition,
          Bedrooms: state.bedrooms,
          Bathrooms: state.bathrooms,
          Type: state.type,
          Has_Parking_Space: state.hasParkingSpace,
        },
      },
    };
  }
  if (subcategoryName === "Land and plots for sale") {
    return {
      Properties: {
        Land_and_plots_for_sale: {
          Type: state.type,
          Number_of_Plots: state.numberOfPlots,
        },
      },
    };
  }
  if (subcategoryName === "Bags") {
    return {
      Fashion: {
        Bags: {
          Condition: state.condition,
          Colour: state.colour,
          Gender: state.gender,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Clothing and clothing accessories") {
    return {
      Fashion: {
        Clothing_and_clothing_accessories: {
          Condition: state.condition,
          Colour: state.colour,
          Gender: state.gender,
          Type: state.type,
        },
      },
    };
  }
  if (subcategoryName === "Watches") {
    return {
      Fashion: {
        Watches: {
          Gender: state.gender,
          Type: state.type,
          Display: state.display,
          Style: state.style,
          Brand: state.brand,
          Condition: state.condition,
          Colour: state.colour,
        },
      },
    };
  }
  if (subcategoryName === "Shoes") {
    return {
      Fashion: {
        Shoes: {
          Style: state.style,
          Type: state.type,
          Brand: state.brand,
          Condition: state.condition,
          Gender: state.gender,
          Colour: state.colour,
        },
      },
    };
  }
}
