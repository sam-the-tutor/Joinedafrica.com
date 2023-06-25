import { TextField } from "@mui/material";
import { MultiSelect } from "../../../../util/reuseableComponents/MultiSelect";
import { getFilteringInformation } from "./postFiltering";

/**
 * Create product specification based on what subcategory the users chooses.
 */

export function CreatePostSpecificationForm({
  subcategory,
  setProductSpecification,
}) {
  const fields = getFieldsOfSubcategory(subcategory.replaceAll(" ", "_"));

  return fields.map((field, index) => {
    if (field.component === "Typography") {
      return (
        <TextField
          label={field.name}
          key={index}
          required
          variant="outlined"
          onChange={(e) => (e) =>
            setProductSpecification((previousFormValues) => ({
              ...previousFormValues,
              [field.name]: e.target.value,
            }))}
        />
      );
    }
    if (field.component === "MultiSelect") {
      return (
        <MultiSelect
          key={index}
          name={field.name.replaceAll("_", " ")}
          listOfElements={getFilteringInformation(subcategory)[field.name]}
          clickedValue={(value) =>
            setProductSpecification((previousFormValues) => ({
              ...previousFormValues,
              [field.name]: value,
            }))
          }
        />
      );
    }
    return null;
  });
}

function getFieldsOfSubcategory(subcategory) {
  const specifiationForm = {
    Cars: {
      fields: [
        {
          component: "Typography",
          name: "Model",
        },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Brand" },
        { component: "MultiSelect", name: "Year_of_manufacture" },
        { component: "MultiSelect", name: "Transmission" },
        { component: "MultiSelect", name: "Is_registered" },
        { component: "MultiSelect", name: "Colour" },
      ],
    },
    Buses: {
      fields: [
        {
          component: "Typography",
          name: "Model",
        },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Brand" },
        { component: "MultiSelect", name: "Year_of_manufacture" },
        { component: "MultiSelect", name: "Transmission" },
        { component: "MultiSelect", name: "Is_registered" },
        { component: "MultiSelect", name: "Colour" },
      ],
    },
    Vehicle_parts_and_accessories: {
      fields: [
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Brand" },
      ],
    },
    Trucks_and_trailers: {
      fields: [
        {
          component: "Typography",
          name: "Model",
        },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Brand" },
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Year_of_manufacture" },
        { component: "MultiSelect", name: "Transmission" },
        { component: "MultiSelect", name: "Colour" },
        { component: "MultiSelect", name: "Is_registered" },
      ],
    },
    Motocycles_and_bicycles: {
      fields: [
        {
          component: "Typography",
          name: "Model",
        },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Brand" },
        { component: "MultiSelect", name: "Year_of_manufacture" },
        { component: "MultiSelect", name: "Transmission" },
        { component: "MultiSelect", name: "Colour" },
      ],
    },
    Computers_and_laptops: {
      fields: [
        {
          component: "Typography",
          name: "Model",
        },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Brand" },
        { component: "MultiSelect", name: "Operating_system" },
        { component: "MultiSelect", name: "Processor" },
        { component: "MultiSelect", name: "Storage_capacity" },
        { component: "MultiSelect", name: "Storage_type" },
        { component: "MultiSelect", name: "Ram" },
      ],
    },
    Audio_and_music_equipments: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
      ],
    },
    Computer_accessories: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
      ],
    },
    Tv_and_dvd_equipments: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Brand" },
      ],
    },
    Electronic_supplies: {
      fields: [{ component: "MultiSelect", name: "Condition" }],
    },
    Skincare: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Gender" },
      ],
    },
    Hair_products: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Gender" },
      ],
    },
    Fragrances: {
      fields: [
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Formation" },
        { component: "MultiSelect", name: "Gender" },
      ],
    },
    Vitamins_and_supplements: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Formulation" },
        { component: "MultiSelect", name: "Condition" },
      ],
    },
    Phones_and_tablets: {
      fields: [
        {
          component: "Typography",
          name: "Model",
        },
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Storage_capacity" },
        { component: "MultiSelect", name: "Colour" },
        { component: "MultiSelect", name: "Display_type" },
        { component: "MultiSelect", name: "Ram" },
        { component: "MultiSelect", name: "Brand" },
      ],
    },
    Accessories_for_mobile_phones_and_tablets: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
      ],
    },
    Houses_and_apartments_for_rent: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Has_parking_space" },
        { component: "MultiSelect", name: "Bathrooms" },
        { component: "MultiSelect", name: "Bedrooms" },
        { component: "MultiSelect", name: "Is_furnished" },
      ],
    },
    Houses_and_apartments_for_sale: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Has_parking_space" },
        { component: "MultiSelect", name: "Bathrooms" },
        { component: "MultiSelect", name: "Bedrooms" },
        { component: "MultiSelect", name: "Is_furnished" },
      ],
    },
    Land_and_plots_for_sale: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Number_of_plots" },
      ],
    },
    Bags: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Gender" },
        { component: "MultiSelect", name: "Colour" },
      ],
    },
    Clothing_and_clothing_accessories: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Gender" },
        { component: "MultiSelect", name: "Colour" },
      ],
    },
    Watches: {
      fields: [
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Style" },
        { component: "MultiSelect", name: "Display" },
        { component: "MultiSelect", name: "Gender" },
        { component: "MultiSelect", name: "Colour" },
        { component: "MultiSelect", name: "Brand" },
      ],
    },
    Shoes: {
      fields: [
        { component: "MultiSelect", name: "Type" },
        { component: "MultiSelect", name: "Condition" },
        { component: "MultiSelect", name: "Style" },
        { component: "MultiSelect", name: "Gender" },
        { component: "MultiSelect", name: "Colour" },
        { component: "MultiSelect", name: "Brand" },
      ],
    },
  };
  return specifiationForm[subcategory].fields;
}
