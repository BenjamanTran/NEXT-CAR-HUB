"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/untils";
import CustomButton from "./CustomButton";
const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleShowMore = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSearchParams("limit", newLimit.toString());

    router.push(newPathName);
  };

  return <div className="w-full flex-center gap-5 mt-10">
    {!isNext && <CustomButton title="Show more" btnType="button" containerStyles="bg-primary-blue rounded-full text-white"
    handleClick={handleShowMore} >
        </CustomButton>}
  </div>
};

export default ShowMore;
