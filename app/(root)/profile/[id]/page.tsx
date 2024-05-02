import { URLProps } from "@/types";
import React from "react";

const Page = ({ params, searchParams }: URLProps) => {
  return <div>{params.id}</div>;
};

export default Page;
