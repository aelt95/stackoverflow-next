"use server";

import { GetTopInteractedTagsParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return [
      { _id: "1", name: "Test" },
      { _id: "2", name: "Prueba" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
