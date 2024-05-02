import { getUserInfo } from "@/lib/actions/user.actions";
import { URLProps } from "@/types";
import React from "react";
import Image from "next/image";
import { SignedIn, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = async ({ params, searchParams }: URLProps) => {
  const userInfo = await getUserInfo({ userId: params.id });
  const { userId: clerkId } = auth();
  console.log(userInfo);
  return (
    <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <Image
          src={userInfo.user.picture}
          height={140}
          width={140}
          alt="profile picture"
          className="rounded-full object-cover"
        />
        <div className="mt-3">
          <h2>{userInfo.user.name}</h2>
          <p>@{userInfo.user.username}</p>
          <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
            {/* {userInfo.user.location && <>Location</>} */}
            {userInfo.user.joinedAt.toString()}
            {/* {userInfo.user.bio && <p>userInfo.user.bio</p>} */}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href={"/profile/edit"}>
                <Button>Edit Profile</Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Page;
