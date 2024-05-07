"use client";
import Image from "next/image";
import React from "react";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteActions = ({ type, itemId }: Props) => {
  const handleEdit = () => {};
  const handleDelete = () => {
    if (type === "Question") {
    } else if (type === "Answer") {
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 mx-sm:w-full">
      {type === "Question" && (
        <Image
          src={"/assets/icons/edit.svg"}
          height={14}
          width={14}
          alt="edit"
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src={"/assets/icons/trash.svg"}
        height={14}
        width={14}
        alt="edit"
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteActions;
