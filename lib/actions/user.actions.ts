"use server";

import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {}
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    //Delete everything done for his ID
    //Questions
    const userQuestionsIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUser(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const query: FilterQuery<typeof User> = {};

    const amountToSkip = (page - 1) * pageSize;

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, "i") },
        },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let filterOptions = {};
    switch (filter) {
      case "new_users":
        filterOptions = { joinedAt: -1 };
        break;
      case "old_users":
        filterOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        filterOptions = { reputation: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query)
      .skip(amountToSkip)
      .limit(pageSize)
      .sort(filterOptions);
    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > amountToSkip + users.length;
    return { users, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { clerkId, page = 1, pageSize = 20, filter, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let filterOptions = {};
    const amountToSkip = (page - 1) * pageSize;
    switch (filter) {
      case "most_recent":
        filterOptions = { createdAt: -1 };
        break;
      case "oldest":
        filterOptions = { createdAt: 1 };
        break;
      case "most_voted":
        filterOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        filterOptions = { views: -1 };
        break;
      case "most_answered":
        filterOptions = { answers: -1 };
        break;
      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        skip: amountToSkip,
        limit: pageSize + 1,
        sort: filterOptions,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!user) throw new Error("User not found");
    let savedQuestions = user.saved;
    const isNext = user.saved.length > pageSize;
    if (isNext) {
      savedQuestions = savedQuestions.slice(0, pageSize);
    }
    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);
    const [answerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);
    const [questionViews] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const criteria = [
      {
        type: "QUESTION_COUNT" as BadgeCriteriaType,
        count: totalQuestions,
      },
      {
        type: "ANSWER_COUNT" as BadgeCriteriaType,
        count: totalAnswers,
      },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: questionUpvotes?.totalUpvotes || 0,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: answerUpvotes?.totalUpvotes || 0,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: questionViews?.totalViews || 0,
      },
    ];

    const badgeCounts = assignBadges({ criteria });

    return {
      user,
      totalQuestions,
      totalAnswers,
      badgeCounts,
      reputation: user.reputation,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const amountToSkip = (page - 1) * pageSize;
    const userQuestions = await Question.find({ author: userId })
      .sort({
        createdAt: -1,
        views: -1,
        upvotes: -1,
      })
      .skip(amountToSkip)
      .limit(pageSize)
      .populate("tags", "id name")
      .populate("author", "_id clerkId name picture");

    const isNextQuestion = totalQuestions > amountToSkip + userQuestions.length;
    return { totalQuestions, questions: userQuestions, isNextQuestion };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const amountToSkip = (page - 1) * pageSize;
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .skip(amountToSkip)
      .limit(pageSize)
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    const isNextAnswers = totalAnswers > amountToSkip + userAnswers.length;
    return { totalAnswers, answers: userAnswers, isNextAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
