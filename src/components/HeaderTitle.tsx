import { HeaderTitleProp } from "@/lib/type";
import React from "react";

const HeaderTitle = ({ title, subtitle }: HeaderTitleProp) => {
  return (
    <div className="flex flex-col gap-3 items-start ">
      <h1 className="text-[#e0e0e0] uppercase font-bold text-2xl sm:text-4xl  ">{title}</h1>
      {subtitle && <h1 className="text-[#4cceac] text-sm">{subtitle}</h1>}
    </div>
  );
};

export default HeaderTitle;
