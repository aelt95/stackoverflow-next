"use server";

import { GetTopInteractedTagsParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId, limit = 3 } = params;
    const user = await User.find(userId);

    if (!user) throw new Error("User not found");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
