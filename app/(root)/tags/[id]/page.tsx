import React from "react";

const page = ({ params }: any) => {
  console.log(params.id);
  return <div>page</div>;
};

export default page;
