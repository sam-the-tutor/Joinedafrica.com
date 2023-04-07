import React from "react";
import { MultiSelect } from "../reuseableComponents/MultiSelect";
import { getFilteringInformation } from "./PostFiltering";
import { TextField } from "@mui/material";

  /**
   * Create product specification based on what category and subcategory the users chooses.
   * @returns the specification of a given category and subcategory the user chooses.
   */
  
export function CreatePostSpecificationForm(
  subcategoryName,
  setYearOfManufacture,
  setModel,
  setGender,
  setIsFurnished,
  setHasParkingSpace,
  setNumberOfPlots,
  setColour,
  setCondition,
  setIsRegistered,
  setTransmission,
  setType,
  setOperatingSystem,
  setProcessor,
  setDisplay,
  setStyle,
  setBedrooms,
  setStorageCapacity,
  setStorageType,
  setRAM,
  setBrand,
  setBathrooms,
  setFormation,
  setDisplayType
) {
  const filteringInformation = getFilteringInformation(subcategoryName);

  if (subcategoryName == "Cars" || subcategoryName == "Buses") {
    return (
      <>
        {/* Hyundai accord. Hyundai being the brand and accord being the model */}
        <TextField
          required
          label="Model"
          variant="outlined"
          onChange={(e) => setModel(e.target.value)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
        <MultiSelect
          name="Year of manufacture"
          listOfElements={filteringInformation.Year_of_manufacture}
          clickedValue={(year) => setYearOfManufacture(year)}
        />
        <MultiSelect
          name="Transmission"
          listOfElements={filteringInformation.Transmission}
          clickedValue={(transmission) => setTransmission(transmission)}
        />
        <MultiSelect
          name="Is Registered?"
          listOfElements={filteringInformation.Is_Registered}
          clickedValue={(is_registered) => setIsRegistered(is_registered)}
        />
        <MultiSelect
          name="Colour"
          listOfElements={filteringInformation.Colour}
          clickedValue={(colour) => setColour(colour)}
        />
      </>
    );
  }
  if (subcategoryName == "Trucks and trailers") {
    return (
      <>
        <TextField
          required
          label="Model"
          variant="outlined"
          onChange={(e) => setModel(e.target.value)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Year of manufacture"
          listOfElements={filteringInformation.Year_of_manufacture}
          clickedValue={(year) => setYearOfManufacture(year)}
        />
        <MultiSelect
          name="Transmission"
          listOfElements={filteringInformation.Transmission}
          clickedValue={(transmission) => setTransmission(transmission)}
        />
        <MultiSelect
          name="Is Registered?"
          listOfElements={filteringInformation.Is_Registered}
          clickedValue={(is_registered) => setIsRegistered(is_registered)}
        />
        <MultiSelect
          name="Colour"
          listOfElements={filteringInformation.Colour}
          clickedValue={(colour) => setColour(colour)}
        />
      </>
    );
  }
  if (subcategoryName == "Vehicle parts and assessories") {
    return (
      <>
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
      </>
    );
  }
  if (subcategoryName == "Motocycles and bicycles") {
    return (
      <>
        <TextField
          required
          label="Model"
          variant="outlined"
          onChange={(e) => setModel(e.target.value)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Year of manufacture"
          listOfElements={filteringInformation.Year_of_manufacture}
          clickedValue={(year) => setYearOfManufacture(year)}
        />
        <MultiSelect
          name="Transmission"
          listOfElements={filteringInformation.Transmission}
          clickedValue={(transmission) => setTransmission(transmission)}
        />
        <MultiSelect
          name="Colour"
          listOfElements={filteringInformation.Colour}
          clickedValue={(colour) => setColour(colour)}
        />
      </>
    );
  }
  if (subcategoryName == "Computers and laptops") {
    return (
      <>
        <TextField
          required
          label="Model"
          variant="outlined"
          onChange={(e) => setModel(e.target.value)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Opearting System"
          listOfElements={filteringInformation.Operating_System}
          clickedValue={(operatingSystem) =>
            setOperatingSystem(operatingSystem)
          }
        />
        <MultiSelect
          name="Processor"
          listOfElements={filteringInformation.Processor}
          clickedValue={(processor) => setProcessor(processor)}
        />
        <MultiSelect
          name="Storage_Capacity"
          listOfElements={filteringInformation.Storage_Capacity}
          clickedValue={(storageCapacity) =>
            setStorageCapacity(storageCapacity)
          }
        />
        <MultiSelect
          name="Storage_Type"
          listOfElements={filteringInformation.Storage_Type}
          clickedValue={(storageType) => setStorageType(storageType)}
        />
        <MultiSelect
          name="RAM"
          listOfElements={filteringInformation.RAM}
          clickedValue={(ram) => setRAM(ram)}
        />
      </>
    );
  }
  if (
    subcategoryName == "Audio and music equipments" ||
    subcategoryName == "Computer accessories"
  ) {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
      </>
    );
  }
  if (subcategoryName == "Tv and dvd equipment") {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
      </>
    );
  }
  if (subcategoryName == "Electronic supplies") {
    return (
      <>
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
      </>
    );
  }
  if (subcategoryName == "Skincare") {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Gender"
          listOfElements={filteringInformation.Gender}
          clickedValue={(gender) => setGender(gender)}
        />
      </>
    );
  }
  if (subcategoryName == "Hair products") {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Gender"
          listOfElements={filteringInformation.Gender}
          clickedValue={(gender) => setGender(gender)}
        />
      </>
    );
  }
  if (subcategoryName == "Fragrances") {
    return (
      <>
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Formation"
          listOfElements={filteringInformation.Formation}
          clickedValue={(formation) => setFormation(formation)}
        />
        <MultiSelect
          name="Gender"
          listOfElements={filteringInformation.Gender}
          clickedValue={(gender) => setGender(gender)}
        />
      </>
    );
  }
  if (subcategoryName == "Vitamins and supplements") {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Formation"
          listOfElements={filteringInformation.Formation}
          clickedValue={(formation) => setFormation(formation)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
      </>
    );
  }
  if (subcategoryName == "Phones and tablets") {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Storage Capacity"
          listOfElements={filteringInformation.Storage_Capacity}
          clickedValue={(storageCapacity) =>
            setStorageCapacity(storageCapacity)
          }
        />
        <MultiSelect
          name="Colour"
          listOfElements={filteringInformation.Colour}
          clickedValue={(colour) => setColour(colour)}
        />
        <MultiSelect
          name="Display Type"
          listOfElements={filteringInformation.Display_Type}
          clickedValue={(displayType) => setDisplayType(displayType)}
        />
        <MultiSelect
          name="RAM"
          listOfElements={filteringInformation.RAM}
          clickedValue={(ram) => setRAM(ram)}
        />

        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
      </>
    );
  }
  if (subcategoryName == "Accessories for mobile phones and tablets") {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
      </>
    );
  }
  if (
    subcategoryName == "Houses and apartments for rent" ||
    subcategoryName == "Houses and apartments for sale"
  ) {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Has parking space"
          listOfElements={filteringInformation.Condition}
          clickedValue={(parkingSpace) => setHasParkingSpace(parkingSpace)}
        />
        <MultiSelect
          name="Bathrooms"
          listOfElements={filteringInformation.Bathrooms}
          clickedValue={(bathrooms) => setBathrooms(bathrooms)}
        />
        <MultiSelect
          name="Badrooms"
          listOfElements={filteringInformation.Bedrooms}
          clickedValue={(bedrooms) => setBedrooms(bedrooms)}
        />
        <MultiSelect
          name="Is Furnished"
          listOfElements={filteringInformation.Is_Furnished}
          clickedValue={(is_furnished) => setIsFurnished(is_furnished)}
        />
      </>
    );
  }
  if (subcategoryName == "Land and plots for sale") {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Number of plots"
          listOfElements={filteringInformation.Number_of_Plots}
          clickedValue={(plots) => setNumberOfPlots(plots)}
        />
      </>
    );
  }
  if (
    subcategoryName == "Bags" ||
    subcategoryName == "Clothing and clothing accessories"
  ) {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Gender"
          listOfElements={filteringInformation.Gender}
          clickedValue={(gender) => setGender(gender)}
        />
        <MultiSelect
          name="Colour"
          listOfElements={filteringInformation.Colour}
          clickedValue={(colour) => setColour(colour)}
        />
      </>
    );
  }
  if (subcategoryName == "Watches") {
    return (
      <>
        <MultiSelect
          name="Condition"
          listOfElements={filteringInformation.Condition}
          clickedValue={(condition) => setCondition(condition)}
        />
        <MultiSelect
          name="Style"
          listOfElements={filteringInformation.Style}
          clickedValue={(style) => setStyle(style)}
        />
        <MultiSelect
          name="Display"
          listOfElements={filteringInformation.Display}
          clickedValue={(display) => setDisplay(display)}
        />
        <MultiSelect
          name="Gender"
          listOfElements={filteringInformation.Gender}
          clickedValue={(gender) => setGender(gender)}
        />
        <MultiSelect
          name="Colour"
          listOfElements={filteringInformation.Colour}
          clickedValue={(colour) => setColour(colour)}
        />
        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
      </>
    );
  }
  if (subcategoryName == "Shoes") {
    return (
      <>
        <MultiSelect
          name="Type"
          listOfElements={filteringInformation.Type}
          clickedValue={(type) => setType(type)}
        />
        <MultiSelect
          name="Style"
          listOfElements={filteringInformation.Style}
          clickedValue={(style) => setStyle(style)}
        />
        <MultiSelect
          name="Gender"
          listOfElements={filteringInformation.Gender}
          clickedValue={(gender) => setGender(gender)}
        />
        <MultiSelect
          name="Colour"
          listOfElements={filteringInformation.Colour}
          clickedValue={(colour) => setColour(colour)}
        />
        <MultiSelect
          name="Brand"
          listOfElements={filteringInformation.Brand}
          clickedValue={(brand) => setBrand(brand)}
        />
      </>
    );
  }
}
