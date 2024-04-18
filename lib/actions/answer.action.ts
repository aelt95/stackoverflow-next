"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { author, content, question, path } = params;

    const newAnswer = await Answer.create({ author, content, question });
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const result = await Question.find({
      question: questionId,
    })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });
    return { result };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
