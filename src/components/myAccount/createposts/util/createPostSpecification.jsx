import { TextField } from "@mui/material";
import { MultiSelect } from "../../../../util/reuseableComponents/MultiSelect";
import { getFilteringInformation } from "./postFiltering";
/**
 * Create product specification based on what category and subcategory the users chooses.
 * @returns the specification of a given category and subcategory the user chooses.
 */

// export function CreatePostSpecificationForm(state, setState) {
//   const { register, handleSubmit } = useForm();
//   const filteringInformation = getFilteringInformation(
//     state.selectedSubcategory
//   );

//   if (
//     state.selectedSubcategory == "Cars" ||
//     state.selectedSubcategory == "Buses"
//   ) {
//     return (
//       <>
//         {/* Hyundai accord. Hyundai being the brand and accord being the model */}
//         <TextField
//           required
//           label="Model"
//           variant="outlined"
//           {...register("setModel")}
//           onChange={(e) => setState("setModel", { model: e.target.value })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           {...register("Condition")}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           {...register("Brand")}
//           clickedValue={(brand) => setState("setBrand", brand)}
//         />
//         <MultiSelect
//           name="Year of manufacture"
//           listOfElements={filteringInformation.Year_of_manufacture}
//           {...register("Year of manufacture")}
//           clickedValue={(year) =>
//             setState("setYearOfManufacture", { yearOfManufacture: year })
//           }
//         />
//         <MultiSelect
//           name="Transmission"
//           listOfElements={filteringInformation.Transmission}
//           {...register("Transmission")}
//           clickedValue={(transmission) =>
//             setState("setTransmission", { transmission })
//           }
//         />
//         <MultiSelect
//           name="Is Registered?"
//           {...register("Is Registered?")}
//           listOfElements={filteringInformation.Is_Registered}
//           clickedValue={(isRegistered) =>
//             setState("setIsRegistered", { isRegistered })
//           }
//         />
//         <MultiSelect
//           name="Colour"
//           {...register("Colour")}
//           listOfElements={filteringInformation.Colour}
//           clickedValue={(colour) => setState("setColour", { colour })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Trucks and trailers") {
//     return (
//       <>
//         <TextField
//           required
//           label="Model"
//           variant="outlined"
//           onChange={(e) => setState("setModel", { model: e.target.value })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           clickedValue={(brand) => setState("setBrand", { brand })}
//         />
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Year of manufacture"
//           listOfElements={filteringInformation.Year_of_manufacture}
//           clickedValue={(year) =>
//             setState("setYearOfManufacture", { yearOfManufacture: year })
//           }
//         />
//         <MultiSelect
//           name="Transmission"
//           listOfElements={filteringInformation.Transmission}
//           clickedValue={(transmission) =>
//             setState("setTransmission", { transmission })
//           }
//         />
//         <MultiSelect
//           name="Is Registered?"
//           listOfElements={filteringInformation.Is_Registered}
//           clickedValue={(isRegistered) =>
//             setState("setIsRegistered", { isRegistered })
//           }
//         />
//         <MultiSelect
//           name="Colour"
//           listOfElements={filteringInformation.Colour}
//           clickedValue={(colour) => setState("setColour", { colour })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Vehicle parts and assessories") {
//     return (
//       <>
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           clickedValue={(brand) => setState("setBrand", { brand })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Motocycles and bicycles") {
//     return (
//       <>
//         <TextField
//           required
//           label="Model"
//           variant="outlined"
//           onChange={(e) => setState("setModel", { model: e.target.value })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           clickedValue={(brand) => setState("setBrand", { brand })}
//         />
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Year of manufacture"
//           listOfElements={filteringInformation.Year_of_manufacture}
//           clickedValue={(year) =>
//             setState("setYearOfManufacture", { yearOfManufacture: year })
//           }
//         />
//         <MultiSelect
//           name="Transmission"
//           listOfElements={filteringInformation.Transmission}
//           clickedValue={(transmission) =>
//             setState("setTransmission", { transmission })
//           }
//         />
//         <MultiSelect
//           name="Colour"
//           listOfElements={filteringInformation.Colour}
//           clickedValue={(colour) => setState("setColour", { colour })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Computers and laptops") {
//     return (
//       <>
//         <TextField
//           required
//           label="Model"
//           variant="outlined"
//           onChange={(e) => setState("setModel", { model: e.target.value })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           clickedValue={(brand) => setState("setBrand", { brand })}
//         />
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Opearting System"
//           listOfElements={filteringInformation.Operating_System}
//           clickedValue={(operatingSystem) =>
//             setState("setOperatingSystem", { operatingSystem })
//           }
//         />
//         <MultiSelect
//           name="Processor"
//           listOfElements={filteringInformation.Processor}
//           clickedValue={(processor) => setState("setProcessor", { processor })}
//         />
//         <MultiSelect
//           name="Storage_Capacity"
//           listOfElements={filteringInformation.Storage_Capacity}
//           clickedValue={(storageCapacity) =>
//             setState("setStorageCapacity", { storageCapacity })
//           }
//         />
//         <MultiSelect
//           name="Storage_Type"
//           listOfElements={filteringInformation.Storage_Type}
//           clickedValue={(storageType) =>
//             setState("setStorageType", { storageType })
//           }
//         />
//         <MultiSelect
//           name="RAM"
//           listOfElements={filteringInformation.RAM}
//           clickedValue={(ram) => setState("setRAM", { ram })}
//         />
//       </>
//     );
//   }
//   if (
//     state.selectedSubcategory == "Audio and music equipments" ||
//     state.selectedSubcategory == "Computer accessories"
//   ) {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Tv and dvd equipment") {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           clickedValue={(brand) => setState("setBrand", { brand })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Electronic supplies") {
//     return (
//       <>
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Skincare") {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Gender"
//           listOfElements={filteringInformation.Gender}
//           clickedValue={(gender) => setState("setGender", { gender })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Hair products") {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Gender"
//           listOfElements={filteringInformation.Gender}
//           clickedValue={(gender) => setState("setGender", { gender })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Fragrances") {
//     return (
//       <>
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Formation"
//           listOfElements={filteringInformation.Formation}
//           clickedValue={(formation) => setState("setFormation", { formation })}
//         />
//         <MultiSelect
//           name="Gender"
//           listOfElements={filteringInformation.Gender}
//           clickedValue={(gender) => setState("setGender", { gender })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Vitamins and supplements") {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Formulation"
//           listOfElements={filteringInformation.Formulation}
//           clickedValue={(Formulation) =>
//             setState("setFormulation", { Formulation })
//           }
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Phones and tablets") {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Storage Capacity"
//           listOfElements={filteringInformation.Storage_Capacity}
//           clickedValue={(storageCapacity) =>
//             setState("setStorageCapacity", { storageCapacity })
//           }
//         />
//         <MultiSelect
//           name="Colour"
//           listOfElements={filteringInformation.Colour}
//           clickedValue={(colour) => setState("setColour", { colour })}
//         />
//         <MultiSelect
//           name="Display Type"
//           listOfElements={filteringInformation.Display_Type}
//           clickedValue={(displayType) =>
//             setState("setDisplayType", { displayType })
//           }
//         />
//         <MultiSelect
//           name="RAM"
//           listOfElements={filteringInformation.RAM}
//           clickedValue={(ram) => setState("setRAM", { ram })}
//         />

//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           clickedValue={(brand) => setState("setBrand", { brand })}
//         />
//       </>
//     );
//   }
//   if (
//     state.selectedSubcategory == "Accessories for mobile phones and tablets"
//   ) {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//       </>
//     );
//   }
//   if (
//     state.selectedSubcategory == "Houses and apartments for rent" ||
//     state.selectedSubcategory == "Houses and apartments for sale"
//   ) {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Has parking space"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(hasParkingSpace) =>
//             setState("setHasParkingSpace", { hasParkingSpace })
//           }
//         />
//         <MultiSelect
//           name="Bathrooms"
//           listOfElements={filteringInformation.Bathrooms}
//           clickedValue={(bathrooms) => setState("setBathrooms", { bathrooms })}
//         />
//         <MultiSelect
//           name="Badrooms"
//           listOfElements={filteringInformation.Bedrooms}
//           clickedValue={(bedrooms) => setState("setBedrooms", { bedrooms })}
//         />
//         <MultiSelect
//           name="Is Furnished"
//           listOfElements={filteringInformation.Is_Furnished}
//           clickedValue={(isFurnished) =>
//             setState("setIsFurnished", { isFurnished })
//           }
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Land and plots for sale") {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Number of plots"
//           listOfElements={filteringInformation.Number_of_Plots}
//           clickedValue={(plots) =>
//             setState("setNumberOfPlots", { numberOfPlots: plots })
//           }
//         />
//       </>
//     );
//   }
//   if (
//     state.selectedSubcategory == "Bags" ||
//     state.selectedSubcategory == "Clothing and clothing accessories"
//   ) {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Gender"
//           listOfElements={filteringInformation.Gender}
//           clickedValue={(gender) => setState("setGender", { gender })}
//         />
//         <MultiSelect
//           name="Colour"
//           listOfElements={filteringInformation.Colour}
//           clickedValue={(colour) => setState("setColour", { colour })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Watches") {
//     return (
//       <>
//         <MultiSelect
//           name="Condition"
//           listOfElements={filteringInformation.Condition}
//           clickedValue={(condition) => setState("setCondition", { condition })}
//         />
//         <MultiSelect
//           name="Style"
//           listOfElements={filteringInformation.Style}
//           clickedValue={(style) => setState("setStyle", { style })}
//         />
//         <MultiSelect
//           name="Display"
//           listOfElements={filteringInformation.Display}
//           clickedValue={(display) => setState("setDisplay", { display })}
//         />
//         <MultiSelect
//           name="Gender"
//           listOfElements={filteringInformation.Gender}
//           clickedValue={(gender) => setState("setGender", { gender })}
//         />
//         <MultiSelect
//           name="Colour"
//           listOfElements={filteringInformation.Colour}
//           clickedValue={(colour) => setState("setColour", { colour })}
//         />
//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           clickedValue={(brand) => setState("setBrand", { brand })}
//         />
//       </>
//     );
//   }
//   if (state.selectedSubcategory == "Shoes") {
//     return (
//       <>
//         <MultiSelect
//           name="Type"
//           listOfElements={filteringInformation.Type}
//           clickedValue={(type) => setState("setType", { type })}
//         />
//         <MultiSelect
//           name="Style"
//           listOfElements={filteringInformation.Style}
//           clickedValue={(style) => setState("setStyle", { style })}
//         />
//         <MultiSelect
//           name="Gender"
//           listOfElements={filteringInformation.Gender}
//           clickedValue={(gender) => setState("setGender", { gender })}
//         />
//         <MultiSelect
//           name="Colour"
//           listOfElements={filteringInformation.Colour}
//           clickedValue={(colour) => setState("setColour", { colour })}
//         />
//         <MultiSelect
//           name="Brand"
//           listOfElements={filteringInformation.Brand}
//           clickedValue={(brand) => setState("setBrand", { brand })}
//         />
//       </>
//     );
//   }
// }

export function CreatePostSpecificationForm({ subcategory, setFormValues }) {
  const fields = getFieldsOfSubcategory(subcategory);

  return fields.map((field, index) => {
    if (field.component === "Typography") {
      return (
        <TextField label={field.name} key={index} required variant="outlined" />
      );
    }
    if (field.component === "MultiSelect") {
      return (
        <MultiSelect
          key={index}
          name={field.name.replaceAll("_", " ")}
          listOfElements={getFilteringInformation(subcategory)[field.name]}
          clickedValue={(value) =>
            setFormValues((previousFormValues) => ({
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
  };
  return specifiationForm[subcategory].fields;
}
