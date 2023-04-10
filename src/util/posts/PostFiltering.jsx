import { CheckboxCmp, RadioButtonCmp } from "../reuseableComponents/SelectCmp";

export const filtering = [
  {
    Name: "Cars",
    Brand: [
      "Toyota",
      "Hyundai",
      "Nissan",
      "Volkswagen",
      "Land Rover",
      "Ford",
      "Honda",
      "Lexus",
      "Mercedes-Benz",
      "Others",
    ],
    Condition: ["New", "Used"],
    Year_of_manufacture: generateArrayOfYears(),
    Transmission: ["Automatic", "Manual"],
    Is_Registered: ["Yes", "No"],
    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
  },
  {
    Name: "Buses",
    Brand: [
      "Toyota",
      "Volkswagen",
      "Nissan",
      "Suzuki",
      "Ford",
      "Honda",
      "Mercedes-Benz",
      "Others",
    ],
    Condition: ["New", "Used"],
    Year_of_manufacture: generateArrayOfYears(),
    Transmission: ["Automatic", "Manual"],
    Is_Registered: ["Yes", "No"],
    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
  },
  {
    Name: "Trucks and trailers",
    Type: [
      "Heavy Duty Trucks",
      "Dump Trucks",
      "Mini Truck",
      "Rigid Trucks",
      "Trailers",
      "Food Trucks",
      "Others",
    ],
    Brand: [
      "Toyota",
      "Volkswagen",
      "Nissan",
      "MAN",
      "Mack",
      "DAF",
      "Ford",
      "Volvo",
      "Mercedes-Benz",
      "Others",
    ],
    Condition: ["New", "Used"],
    Year_of_manufacture: generateArrayOfYears(),
    Transmission: ["Automatic", "Manual"],
    Is_Registered: ["Yes", "No"],
    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
  },
  {
    Name: "Vehicle parts and assessories",
    Type: [
      "Audio Parts",
      "Breaks, Suspension and Sterring",
      "Engine and Drivetrain",
      "Car Care",
      "Exterior Accessories",
      "Interior Accessories",
      "Wheels and Parts",
      "Safety and Security",
      "Others",
    ],
    Brand: [
      "Toyota",
      "Nissan",
      "Lexus",
      "Honda",
      "Acura",
      "Mercedes-Benz",
      "Others",
    ],
    Condition: ["New", "Used"],
  },
  {
    Name: "Motocycles and bicycles",
    Type: ["Bicycle", "Motocycle", "Scooter", "Others"],
    Brand: ["TVS", "Yamaha", "Honda", "Qlink", "Bajaj", "Suzuki", "Others"],
    Year_of_manufacture: generateArrayOfYears(),
    Transmission: ["Automatic", "Manual"],
    Condition: ["New", "Used"],
    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
  },
  {
    Name: "Computers and laptops",
    Type: ["Desktop Computer", "Laptop"],
    Brand: [
      "HP",
      "Dell",
      "Apple",
      "Lenovo",
      "Asus",
      "Acer",
      "Microsoft",
      "Others",
    ],
    Condition: ["New", "Used"],
    Operating_System: ["Windows", "Linux", "MacOS", "Others"],
    Processor: ["Intel", "AMD", "Others"],
    Storage_Capacity: [
      "128GB",
      "250GB",
      "256GB",
      "320GB",
      "500GB",
      "512GB",
      "1TB",
      "Others",
    ],
    Storage_Type: ["HDD", "SSD", "Others"],
    RAM: ["2GB", "4GB", "8GB", "16GB", "32GB", "64GB", "Others"],
  },
  {
    Name: "Audio and music equipments",
    Type: [
      "Speakers",
      "Microphones",
      "Sound Systems",
      "Home Theater Systems",
      "Music Mixers",
      "Amplifiers",
      "Sound Monitors",
      "Others",
    ],
    Condition: ["New", "Used"],
  },
  {
    Name: "Computer accessories",
    Type: ["Adapters", "Keyboards", "Mice", "Batteries", "Cables", "Others"],
    Condition: ["New", "Used"],
  },
  {
    Name: "Tv and dvd equipment",
    Type: ["TVs", "Projector", "Others"],
    Condition: ["New", "Used"],
    Brand: ["Sony", "Samsung", "LG", "Others"],
  },
  {
    Name: "Electronic supplies",
    Condition: ["New", "Used"],
  },
  {
    Name: "Skincare",
    Type: [
      "Body Creams and Milks",
      "Face Creamand Gels",
      "Body Oils",
      "Body Wash and Soap",
      "Others",
    ],
    Gender: ["Male", "Female", "Unisex"],
    Condition: ["New", "Used"],
  },
  {
    Name: "Hair products",
    Gender: ["Male", "Female", "Unisex"],
    Condition: ["New", "Used"],
    Type: [
      "Hair Extensions and Wigs",
      "Shampoos",
      "Conditioners",
      "Hair Brushes and Combs",
      "Hair Treatments",
      "Others",
    ],
  },
  {
    Name: "Fragrances",
    Gender: ["Male", "Female", "Unisex"],
    Formation: ["Oil", "Spray"],
    Condition: ["New", "Used"],
  },
  {
    Name: "Vitamins and supplements",
    Type: [
      "Immune Boosters",
      "Vitamin Supplements",
      "Detox Cleansers",
      "Weight-Loss Products",
      "Energy Booters",
      "Anti-Aging Supplements",
      "Others",
    ],
    Formulation: ["Capsule", "Liquid", "Powder"],
    Condition: ["New", "Used"],
  },
  {
    Name: "Phones and tablets",
    Type: ["Phone", "Tablet"],
    Condition: ["New", "Used"],
    Storage_Capacity: [
      "128GB",
      "250GB",
      "256GB",
      "320GB",
      "500GB",
      "512GB",
      "1TB",
      "Others",
    ],

    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
    Display_Type: ["LCD", "IPS-LCD", "OLED", "AMOLED"],
    RAM: ["2GB", "4GB", "8GB", "16GB", "32GB", "64GB", "Others"],
    Brand: [
      "Apple",
      "Samsung",
      "Techno",
      "Itel",
      "Huawei",
      "Infinix",
      "Nokia",
      "Others",
    ],
  },
  {
    Type: [
      "Power Bank",
      "Cases",
      "Chargers and power adapters",
      "Phone screens",
      "Memory cards",
      "Others",
    ],
    Condition: ["New", "Used"],
    Name: "Accessories for mobile phones and tablets",
  },
  {
    Name: "Houses and apartments for rent",
    Condition: ["New", "Used"],
    Is_Furnished: ["Yes", "Partially furnished", "No"],
    Has_Parking_Space: ["Yes", "No"],
    Bathrooms: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    Bedrooms: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    Type: ["Apartment", "Block of Flats", "Duplex", "Bungalow", "Others"],
  },
  {
    Name: "Houses and apartments for sale",
    Condition: ["New", "Used"],
    Has_Parking_Space: ["Yes", "No"],
    Is_Furnished: ["Yes", "Partially furnished", "No"],
    Bathrooms: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    Bedrooms: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    Type: ["Apartment", "Block of Flats", "Duplex", "Bungalow", "Others"],
  },
  {
    Name: "Land and plots for sale",
    Type: ["Commercial Land", "Farmland", "Residential Land", "Mised-Use Land"],
    Number_of_Plots: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Others",
    ],
  },
  {
    Name: "Bags",
    Type: [
      "Luggage and travel Bags",
      "Handbags",
      "Shoulder Bags",
      "Backpacks",
      "Wallets and purses",
    ],
    Condition: ["New", "Used"],
    Gender: ["Male", "Female", "Unisex"],
    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
  },
  {
    Name: "Clothing and clothing accessories",
    Condition: ["New", "Used"],
    Type: [
      "Sunglasses",
      "Hats and Caps",
      "Belts",
      "Ties",
      "Trousers",
      "Shirts",
      "Sweaters",
      "Socks",
      "Others",
    ],
    Gender: ["Male", "Female", "Unisex"],
    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
  },
  {
    Name: "Watches",
    Brand: [
      "Rolex",
      "Hublot",
      "Patek Philippe",
      "Cartier",
      "Audemars Piguet",
      "Others",
    ],
    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
    Gender: ["Male", "Female", "Unisex"],
    Condition: ["New", "Used"],
    Style: ["Business", "Casual", "Sport", "Others"],
    Display: ["Analog", "Digital"],
  },
  {
    Name: "Shoes",
    Brand: [
      "Adidas",
      "Gucci",
      "Louis Vuitton",
      "Nike",
      "Versace",
      "Air Jordan",
      "Others",
    ],
    Gender: ["Male", "Female", "Unisex"],
    Condition: ["New", "Used"],
    Type: ["Sneakers", "Slippers", "Flat shoes", "Sandals", "Slides", "Boots"],
    Colour: [
      "Black",
      "Blue",
      "White",
      "Grey",
      "Red",
      "Silver",
      "Green",
      "Yellow",
      "Brown",
      "Purple",
      "Others",
    ],
    Style: ["Casual", "Classic", "Formal", "Sport", "Others"],
  },
];

function generateArrayOfYears() {
  const currentYear = new Date().getFullYear();
  //We want to go as far back as duration years ago
  const DURATION = 20;
  const startingYear = currentYear - DURATION;
  const years = [];
  for (let i = currentYear; i >= startingYear; i--) {
    years.push(i + "");
  }
  return years;
}
export function getFilteringInformation(subcategoryName) {
  // return filtering.filter((filter) => (filter.Name = subcategoryName))[0];
  for (let i = 0; i < filtering.length; i++) {
    if (filtering[i].Name == subcategoryName) return filtering[i];
  }
  return null;
}

export function getFilterForSubcategory(subcategoryName) {
  const result = [];
  const postDetails = getFilteringInformation(subcategoryName);
  if (postDetails.Brand) {
    result.push(<RadioButtonCmp list={postDetails.Brand} title="Brand" />);
  }
  if (postDetails.Type) {
    result.push(<RadioButtonCmp list={postDetails.Type} title="Type" />);
  }
  if (postDetails.Condition) {
    result.push(
      <RadioButtonCmp list={postDetails.Condition} title="Condition" />
    );
  }
  if (postDetails.Is_Registered) {
    result.push(
      <RadioButtonCmp list={postDetails.Is_Registered} title="Registered" />
    );
  }
  if (postDetails.Transmission) {
    result.push(
      <RadioButtonCmp list={postDetails.Transmission} title="Transmission" />
    );
  }
  if (postDetails.Colour) {
    result.push(<RadioButtonCmp list={postDetails.Colour} title="Colour" />);
  }
  if (postDetails.Year_of_manufacture) {
    result.push(
      <RadioButtonCmp
        list={postDetails.Year_of_manufacture}
        title="Year of manufacture"
      />
    );
  }

  return result;
}
