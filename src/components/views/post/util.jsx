/**
 * Exact produduct specification extacts the product specification details provided by the user
 * @param {*} response Response is the post we get from the backend
 * @returns Returns an extracted product specification.
 */
export function extractProductSpecification(response) {
  const categories = [
    { category: "Vehicles", subcategory: "Cars" },
    { category: "Vehicles", subcategory: "Buses" },
    { category: "Vehicles", subcategory: "Trucks_and_trailers" },
    { category: "Vehicles", subcategory: "Vehicle_parts_and_assessories" },
    { category: "Vehicles", subcategory: "Motocycles_and_bicycles" },
    { category: "Electronics", subcategory: "Computers_and_laptops" },
    { category: "Electronics", subcategory: "Audio_and_music_equipments" },
    { category: "Electronics", subcategory: "Computer_accessories" },
    { category: "Electronics", subcategory: "Tv_and_dvd_equipment" },
    { category: "Electronics", subcategory: "Electronic_supplies" },
    { category: "Health_and_beauty", subcategory: "Skincare" },
    { category: "Health_and_beauty", subcategory: "Hair_products" },
    { category: "Health_and_beauty", subcategory: "Fragrances" },
    { category: "Health_and_beauty", subcategory: "Vitamins_and_supplements" },
    {
      category: "Mobile_phones_and_tablets",
      subcategory: "Phones_and_tablets",
    },
    {
      category: "Mobile_phones_and_tablets",
      subcategory: "Accessories_for_mobile_phones_and_tablets",
    },
    { category: "Properties", subcategory: "Houses_and_apartments_for_rent" },
    { category: "Properties", subcategory: "Houses_and_apartments_for_sale" },
    { category: "Properties", subcategory: "Land_and_plots_for_sale" },
    { category: "Fashion", subcategory: "Bags" },
    { category: "Fashion", subcategory: "Clothing_and_clothing_accessories" },
    { category: "Fashion", subcategory: "Watches" },
    { category: "Fashion", subcategory: "Shoes" },
  ];
  for (const { category, subcategory } of categories) {
    if (response.ProductSpecification?.[category]?.[subcategory]) {
      return { ...response.ProductSpecification[category][subcategory] };
    }
  }
  return null;
}
