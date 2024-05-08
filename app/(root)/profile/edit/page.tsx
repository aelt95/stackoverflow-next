import Profile from "@/components/forms/Profile";
import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async ({ params }: any) => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile
          type="Edit"
          mongouserId={""}
          questionDetails={JSON.stringify("")}
        />
      </div>
    </>
  );
};

export default Page;
