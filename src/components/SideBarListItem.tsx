import { CategoryItem, SidebarListItemProp } from "@/lib/type";
import { generatePdf } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

const SideBarListItem = ({
  item,
  selectedItem,
  setSelectedItem,
  transactions
}: SidebarListItemProp) => {
  const handleClick = (e: CategoryItem) => {
    if (setSelectedItem) {
      setSelectedItem(e.title);
      if (e.title === "Report" && transactions.length > 0) {
        generatePdf(transactions);
      }
    }
  };

  return (
    <div className="w-full flex flex-col  items-start gap-5 text-[#e0e0e0] cursor-pointer  overflow-hidden ">
      {item.categoryTitle && (
        <div className="self-start">
          <h1 className="text-xl sm:text-base text-[#a3a3a3] font-medium text-start">
            {item.categoryTitle}
          </h1>
        </div>
      )}
      {item.categories.map(e => (
        <Link
          href={e.href}
          key={e.title}
          className="flex items-center gap-2 mx-2 lg:mx-5 w-full    "
          onClick={() => handleClick(e)}
        >
          <div
            className={clsx("text-3xl sm:text-xl", {
              "text-red-500": e.title === selectedItem
            })}
          >
            {e.icon}
          </div>
          <h1
            className={clsx(`text-xl sm:text-base hover:text-red-500 #e0e0e0`, {
              "text-red-500": e.title === selectedItem
            })}
          >
            {e.title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default SideBarListItem;
