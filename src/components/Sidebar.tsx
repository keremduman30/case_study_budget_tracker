"use client";
import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import SideBarListItem from "./SideBarListItem";
import { Category } from "@/lib/type";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegFilePdf } from "react-icons/fa6";
import { useAppSelector } from "@/store/store";

export const sidebarMenuItems: Category[] = [
  {
    categories: [{ title: "Dashboard", icon: <IoMdHome />, href: "/" }]
  },
  {
    categories: [
      { title: "Add Income/Expense", icon: <MdAttachMoney />, href: "/add" }
    ]
  },

  {
    categoryTitle: "Analysis",
    categories: [
      {
        title: "Charts",
        icon: <AiOutlineLineChart />,
        href: "/analysis/charts"
      },

      {
        title: "Report",
        icon: <FaRegFilePdf />,
        href: "/"
      }
    ]
  }
];

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Dashboard");
  const { transactions } = useAppSelector(store => store.budget);
  return (
    <div className=" w-full  h-screen overflow-y-auto  flex-col items-center  p-5   bg-[#1F2A40]  ">
      <div className="flex flex-col items-center justify-center gap-3 mt-5  w-full  ">
        <div
          className={`w-32 h-32 rounded-full  bg-hero-pattern bg-no-repeat bg-cover `}
        ></div>
        <h1 className="text-3xl text-[#e0e0e0] tracking-widest font-bold ">
          2N TECH
        </h1>
      </div>
      <div className="space-y-5 w-full mt-10 ">
        {sidebarMenuItems.map(e => (
          <SideBarListItem
            key={crypto.randomUUID()}
            item={e}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            transactions={transactions}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
