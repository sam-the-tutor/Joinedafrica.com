function filterSubcategory(post, subcategoryName, value, title) {
  const { productSpecification } = post;
  console.log(value);
  console.log(post);
  console.log(subcategoryName);
  console.log(title);
  if (subcategoryName === "Cars") {
    if (title == "Model" && productSpecification.Vehicles.Cars.Model != value)
      return false;
    if (title == "Brand" && productSpecification.Vehicles.Cars.Brand != value)
      return false;
    if (
      title == "Condition" &&
      productSpecification.Vehicles.Cars.Condition != value
    )
      return false;
    if (
      title == "Year_of_manufacture" &&
      productSpecification.Vehicles.Cars.Year_of_manufacture != value
    )
      return false;
    if (
      title == "Transmission" &&
      productSpecification.Vehicles.Cars.Transmission != value
    )
      return false;
    if (
      title == "Is_Registered" &&
      productSpecification.Vehicles.Cars.Is_Registered != value
    )
      return false;
    if (title == "Colour" && productSpecification.Vehicles.Cars.Colour != value)
      return false;
    return true;
  }
  if (subcategoryName === "Buses") {
    if (userInput.Model && post.Vehicles.Buses.Model != userInput.Model)
      return false;
    if (userInput.Brand && post.Vehicles.Buses.Brand != userInput.Brand)
      return false;
    if (
      userInput.Condition &&
      post.Vehicles.Buses.Condition != userInput.Condition
    )
      return false;
    if (
      userInput.Year_of_manufacture &&
      post.Vehicles.Buses.Year_of_manufacture != userInput.Year_of_manufacture
    )
      return false;
    if (
      userInput.Transmission &&
      post.Vehicles.Buses.Transmission != userInput.Transmission
    )
      return false;
    if (
      userInput.Is_Registered &&
      post.Vehicles.Buses.Is_Registered != userInput.Is_Registered
    )
      return false;
    if (userInput.Colour && post.Vehicles.Buses.Colour != userInput.Colour)
      return false;
    return true;
  }
  if (subcategoryName === "Trucks and trailers") {
    if (
      userInput.Model &&
      post.Vehicles.Trucks_and_trailers.Model != userInput.Model
    )
      return false;
    if (
      userInput.Brand &&
      post.Vehicles.Trucks_and_trailers.Brand != userInput.Brand
    )
      return false;
    if (
      userInput.Condition &&
      post.Vehicles.Trucks_and_trailers.Condition != userInput.Condition
    )
      return false;
    if (
      userInput.Year_of_manufacture &&
      post.Vehicles.Trucks_and_trailers.Year_of_manufacture !=
        userInput.Year_of_manufacture
    )
      return false;
    if (
      userInput.Transmission &&
      post.Vehicles.Trucks_and_trailers.Transmission != userInput.Transmission
    )
      return false;
    if (
      userInput.Is_Registered &&
      post.Vehicles.Trucks_and_trailers.Is_Registered != userInput.Is_Registered
    )
      if (
        userInput.Type &&
        post.Vehicles.Trucks_and_trailers.Type != userInput.Type
      )
        return false;
    if (
      userInput.Colour &&
      post.Vehicles.Trucks_and_trailers.Colour != userInput.Colour
    )
      return false;
    return true;
  }
  if (subcategoryName === "Vehicle parts and assessories") {
    if (
      userInput.Condition &&
      post.Vehicles.Vehicle_parts_and_assessories.Condition !=
        userInput.Condition
    )
      return false;
    if (
      userInput.Brand &&
      post.Vehicles.Vehicle_parts_and_assessories.Brand != userInput.Brand
    )
      return false;
    if (
      userInput.Type &&
      post.Vehicles.Vehicle_parts_and_assessories.Type != userInput.Type
    )
      return false;
    return true;
  }
  if (subcategoryName === "Motocycles and bicycles") {
    if (
      userInput.Model &&
      post.Vehicles.Motocycles_and_bicycles.Model != userInput.Model
    )
      return false;
    if (
      userInput.Brand &&
      post.Vehicles.Motocycles_and_bicycles.Brand != userInput.Brand
    )
      return false;
    if (
      userInput.Condition &&
      post.Vehicles.Motocycles_and_bicycles.Condition != userInput.Condition
    )
      return false;
    if (
      userInput.Year_of_manufacture &&
      post.Vehicles.Motocycles_and_bicycles.Year_of_manufacture !=
        userInput.Year_of_manufacture
    )
      return false;
    if (
      userInput.Transmission &&
      post.Vehicles.Motocycles_and_bicycles.Transmission !=
        userInput.Transmission
    )
      return false;
    if (
      userInput.Type &&
      post.Vehicles.Motocycles_and_bicycles.Type != userInput.Type
    )
      return false;
    if (
      userInput.Colour &&
      post.Vehicles.Motocycles_and_bicycles.Colour != userInput.Colour
    )
      return false;
    return true;
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
export default filterSubcategory;
