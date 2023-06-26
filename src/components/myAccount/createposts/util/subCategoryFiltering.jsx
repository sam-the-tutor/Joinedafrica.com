/**
 * FitlerSubcategory filters the posts in a subcategory of postings, given the value the user selects and the title.
 */
function filterSubcategory(post, subcategoryName, value, title) {
  const { ProductSpecification, Category, Subcategory } = post;
  return (
    ProductSpecification[Category.replaceAll(" ", "_")][
      Subcategory.replaceAll(" ", "_")
    ]?.[title] === value
  );
  // if (subcategoryName === "Cars") {
  //   if (title == "Model" && productSpecification.Vehicles.Cars.Model != value)
  //     return false;
  //   if (title == "Brand" && productSpecification.Vehicles.Cars.Brand != value)
  //     return false;
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Vehicles.Cars.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Year_of_manufacture" &&
  //     productSpecification.Vehicles.Cars.Year_of_manufacture != value
  //   )
  //     return false;
  //   if (
  //     title == "Transmission" &&
  //     productSpecification.Vehicles.Cars.Transmission != value
  //   )
  //     return false;
  //   if (
  //     title == "Is_Registered" &&
  //     productSpecification.Vehicles.Cars.Is_Registered != value
  //   )
  //     return false;
  //   if (title == "Colour" && productSpecification.Vehicles.Cars.Colour != value)
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Buses") {
  //   if (title == "Model" && productSpecification.Vehicles.Buses.Model != value)
  //     return false;
  //   if (title == "Brand" && productSpecification.Vehicles.Buses.Brand != value)
  //     return false;
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Vehicles.Buses.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Year_of_manufacture" &&
  //     productSpecification.Vehicles.Buses.Year_of_manufacture != value
  //   )
  //     return false;
  //   if (
  //     title == "Transmission" &&
  //     productSpecification.Vehicles.Buses.Transmission != value
  //   )
  //     return false;
  //   if (
  //     title == "Is_Registered" &&
  //     productSpecification.Vehicles.Buses.Is_Registered != value
  //   )
  //     return false;
  //   if (
  //     title == "Colour" &&
  //     productSpecification.Vehicles.Buses.Colour != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Trucks and trailers") {
  //   if (
  //     title == "Model" &&
  //     productSpecification.Vehicles.Trucks_and_trailers.Model != value
  //   )
  //     return false;
  //   if (
  //     title == "Brand" &&
  //     productSpecification.Vehicles.Trucks_and_trailers.Brand != value
  //   )
  //     return false;
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Vehicles.Trucks_and_trailers.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Year_of_manufacture" &&
  //     productSpecification.Vehicles.Trucks_and_trailers.Year_of_manufacture !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Transmission" &&
  //     productSpecification.Vehicles.Trucks_and_trailers.Transmission != value
  //   )
  //     return false;
  //   if (
  //     title == "Is_Registered" &&
  //     productSpecification.Vehicles.Trucks_and_trailers.Is_Registered != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Vehicles.Trucks_and_trailers.Type != value
  //   )
  //     return false;
  //   if (
  //     title == "Colour" &&
  //     productSpecification.Vehicles.Trucks_and_trailers.Colour != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Vehicle parts and assessories") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Vehicles.Vehicle_parts_and_assessories.Condition !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Brand" &&
  //     productSpecification.Vehicles.Vehicle_parts_and_assessories.Brand != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Vehicles.Vehicle_parts_and_assessories.Type != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Motocycles and bicycles") {
  //   if (
  //     title == "Model" &&
  //     productSpecification.Vehicles.Motocycles_and_bicycles.Model != value
  //   )
  //     return false;
  //   if (
  //     title == "Brand" &&
  //     productSpecification.Vehicles.Motocycles_and_bicycles.Brand != value
  //   )
  //     return false;
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Vehicles.Motocycles_and_bicycles.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Year_of_manufacture" &&
  //     productSpecification.Vehicles.Motocycles_and_bicycles
  //       .Year_of_manufacture != value
  //   )
  //     return false;
  //   if (
  //     title == "Transmission" &&
  //     productSpecification.Vehicles.Motocycles_and_bicycles.Transmission !=
  //       value
  //   )
  //     return false;
  //   if (title == "Type" && post.Vehicles.Motocycles_and_bicycles.Type != value)
  //     return false;
  //   if (
  //     title == "Colour" &&
  //     productSpecification.Vehicles.Motocycles_and_bicycles.Colour != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Computers and laptops") {
  //   if (
  //     title == "Model" &&
  //     productSpecification.Electronics.Computers_and_laptops.Model != value
  //   )
  //     return false;
  //   if (
  //     title == "Brand" &&
  //     productSpecification.Electronics.Computers_and_laptops.Brand != value
  //   )
  //     return false;
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Electronics.Computers_and_laptops.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Processor" &&
  //     productSpecification.Electronics.Computers_and_laptops.Processor != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Electronics.Computers_and_laptops.Type != value
  //   )
  //     return false;
  //   if (
  //     title == "Storage_Type" &&
  //     productSpecification.Electronics.Computers_and_laptops.Storage_Type !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "RAM" &&
  //     productSpecification.Electronics.Computers_and_laptops.RAM != value
  //   )
  //     return false;
  //   if (
  //     title == "Storage_Capacity" &&
  //     productSpecification.Electronics.Computers_and_laptops.Storage_Capacity !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Operating_System" &&
  //     productSpecification.Electronics.Computers_and_laptops.Operating_System !=
  //       value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Audio and music equipments") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Electronics.Audio_and_music_equipments.Condition !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Electronics.Audio_and_music_equipments.Type != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Computer accessories") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Electronics.Computer_accessories.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Electronics.Computer_accessories.Type != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Tv and dvd equipment") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Electronics.Tv_and_dvd_equipment.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Brand" &&
  //     productSpecification.Electronics.Tv_and_dvd_equipment.Brand != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Electronics.Tv_and_dvd_equipment.Type != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Skincare") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Health_and_beauty.Skincare.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Gender" &&
  //     productSpecification.Health_and_beauty.Skincare.Gender != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Health_and_beauty.Skincare.Type != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Hair products") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Health_and_beauty.Hair_products.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Gender" &&
  //     productSpecification.Health_and_beauty.Hair_products.Gender != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Health_and_beauty.Hair_products.Type != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Fragrances") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Health_and_beauty.Fragrances.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Gender" &&
  //     productSpecification.Health_and_beauty.Fragrances.Gender != value
  //   )
  //     return false;
  //   if (
  //     title == "Formation" &&
  //     productSpecification.Health_and_beauty.Fragrances.Formation != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Vitamins and supplements") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Health_and_beauty.Vitamins_and_supplements
  //       .Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Health_and_beauty.Vitamins_and_supplements.Type !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Formation" &&
  //     productSpecification.Health_and_beauty.Vitamins_and_supplements
  //       .Formation != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Phones and tablets") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Mobile_phones_and_tablets.Phones_and_tablets
  //       .Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Mobile_phones_and_tablets.Phones_and_tablets.Type !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Brand" &&
  //     productSpecification.Mobile_phones_and_tablets.Phones_and_tablets.Brand !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Display_Type" &&
  //     productSpecification.Mobile_phones_and_tablets.Phones_and_tablets
  //       .Display_Type != value
  //   )
  //     return false;
  //   if (
  //     title == "RAM" &&
  //     productSpecification.Mobile_phones_and_tablets.Phones_and_tablets.RAM !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Colour" &&
  //     productSpecification.Mobile_phones_and_tablets.Phones_and_tablets
  //       .Colour != value
  //   )
  //     return false;
  //   if (
  //     title == "Storage_Capacity" &&
  //     productSpecification.Mobile_phones_and_tablets.Phones_and_tablets
  //       .Storage_Capacity != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Accessories for mobile phones and tablets") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Mobile_phones_and_tablets
  //       .Accessories_for_mobile_phones_and_tablets.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Mobile_phones_and_tablets
  //       .Accessories_for_mobile_phones_and_tablets.Type != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Houses and apartments for rent") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Properties.Houses_and_apartments_for_rent
  //       .Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Properties.Houses_and_apartments_for_rent.Type !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Bedrooms" &&
  //     productSpecification.Properties.Houses_and_apartments_for_rent.Bedrooms !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Bathrooms" &&
  //     productSpecification.Properties.Houses_and_apartments_for_rent
  //       .Bathrooms != value
  //   )
  //     return false;
  //   if (
  //     title == "Is_Furnished" &&
  //     productSpecification.Properties.Houses_and_apartments_for_rent
  //       .Is_Furnished != value
  //   )
  //     return false;
  //   if (
  //     title == "Has_Parking_Space" &&
  //     productSpecification.Properties.Houses_and_apartments_for_rent
  //       .Has_Parking_Space != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Houses and apartments for sale") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Properties.Houses_and_apartments_for_sale
  //       .Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Properties.Houses_and_apartments_for_sale.Type !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Bedrooms" &&
  //     productSpecification.Properties.Houses_and_apartments_for_sale.Bedrooms !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Bathrooms" &&
  //     productSpecification.Properties.Houses_and_apartments_for_sale
  //       .Bathrooms != value
  //   )
  //     return false;
  //   if (
  //     title == "Is_Furnished" &&
  //     productSpecification.Properties.Houses_and_apartments_for_sale
  //       .Is_Furnished != value
  //   )
  //     return false;
  //   if (
  //     title == "Has_Parking_Space" &&
  //     productSpecification.Properties.Houses_and_apartments_for_sale
  //       .Has_Parking_Space != value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Land and plots for sale") {
  //   if (
  //     title == "Type" &&
  //     productSpecification.Properties.Land_and_plots_for_sale.Type != value
  //   )
  //     return false;
  //   if (
  //     title == "Number_of_Plots" &&
  //     productSpecification.Properties.Land_and_plots_for_sale.Number_of_Plots !=
  //       value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Bags") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Fashion.Bags.Condition != value
  //   )
  //     return false;
  //   if (title == "Colour" && productSpecification.Fashion.Bags.Colour != value)
  //     return false;
  //   if (title == "Type" && productSpecification.Fashion.Bags.Type != value)
  //     return false;
  //   if (title == "Gender" && productSpecification.Fashion.Bags.Gender != value)
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Clothing and clothing accessories") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Fashion.Clothing_and_clothing_accessories
  //       .Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Colour" &&
  //     productSpecification.Fashion.Clothing_and_clothing_accessories.Colour !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Type" &&
  //     productSpecification.Fashion.Clothing_and_clothing_accessories.Type !=
  //       value
  //   )
  //     return false;
  //   if (
  //     title == "Gender" &&
  //     productSpecification.Fashion.Clothing_and_clothing_accessories.Gender !=
  //       value
  //   )
  //     return false;
  //   return true;
  // }
  // if (subcategoryName === "Watches") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Fashion.Watches.Condition != value
  //   )
  //     return false;
  //   if (
  //     title == "Colour" &&
  //     productSpecification.Fashion.Watches.Colour != value
  //   )
  //     return false;
  //   if (title == "Type" && productSpecification.Fashion.Watches.Type != value)
  //     return false;
  //   if (title == "Brand" && productSpecification.Fashion.Watches.Brand != value)
  //     return false;
  //   if (title == "Style" && productSpecification.Fashion.Watches.Style != value)
  //     return false;
  //   if (
  //     title == "Display" &&
  //     productSpecification.Fashion.Watches.Display != value
  //   )
  //     return false;
  //   if (title == "Gender" && post.Fashion.Watches.Gender != value) return false;
  //   return true;
  // }
  // if (subcategoryName === "Shoes") {
  //   if (
  //     title == "Condition" &&
  //     productSpecification.Fashion.Shoes.Condition != value
  //   )
  //     return false;
  //   if (title == "Colour" && productSpecification.Fashion.Shoes.Colour != value)
  //     return false;
  //   if (title == "Type" && productSpecification.Fashion.Shoes.Type != value)
  //     return false;
  //   if (title == "Brand" && productSpecification.Fashion.Shoes.Brand != value)
  //     return false;
  //   if (title == "Style" && productSpecification.Fashion.Shoes.Style != value)
  //     return false;
  //   if (title == "Gender" && productSpecification.Fashion.Shoes.Gender != value)
  //     return false;
  //   return true;
  // }
}
export default filterSubcategory;
