import { Principal } from "@dfinity/principal";
import { push, ref, set } from "firebase/database";

import { createAuthenticatedActor } from "../../../canisters/createActor";
import { canisterId, createActor } from "../../../declarations/assets";
import {
  canisterId as conversationCanisterId,
  createActor as conversationCreateActor,
} from "../../../declarations/conversation";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../../util/functions";

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

export async function getPostImages(response) {
  const actor = await createAuthenticatedActor(canisterId, createActor);
  return await Promise.all(
    response.Images.map(async (image) => {
      const imageFile = await actor.getAsset(image);
      const url = createObjectURLFromArrayOfBytes(imageFile.ok);
      return {
        original: url,
        thumbnail: url,
      };
    })
  );
}

export async function sendMessage(message, firebaseDB, post) {
  const chatMessage = createChatMessage(message, post);
  const actor = await createAuthenticatedActor(
    conversationCanisterId,
    conversationCreateActor
  );
  const result = await actor.sendMessage(chatMessage);
  //send message notification to the receiver
  const messageRef = ref(firebaseDB, post.CreatorOfPostId.toText());
  set(push(messageRef), chatMessage);
  return result;
}

function createChatMessage(userMessage, post) {
  return {
    messageContent: userMessage,
    sender: Principal.fromText(getFromSessionStorage("principalId", true)),
    receiver: post.CreatorOfPostId,
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  };
}
