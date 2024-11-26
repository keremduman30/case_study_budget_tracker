"use client";
import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { sidebarMenuItems } from "./Sidebar";
import SideBarListItem from "./SideBarListItem";
import { useAppSelector } from "@/store/store";

const MobileNavbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { transactions } = useAppSelector(store => store.budget);
  return (
    <div className="flex items-center justify-between bg-gray-700 px-10 py-5 h-20 ">
      <h1 className="text-3xl text-[#e0e0e0] tracking-widest font-bold ">
        2N TECH
      </h1>
      <div onClick={() => setOpenMenu(prev => !prev)}>
        <CiMenuBurger className="text-3xl text-white" />
      </div>
      {openMenu && (
        <div className="absolute top-20 right-0 w-full h-full bg-gray-600 z-10 flex flex-col items-center justify-center gap-5    ">
          <div className="flex flex-col gap-8  px-10  ">
            {sidebarMenuItems.map((e, i) => (
              <div key={i} onClick={() => setOpenMenu(prev => !prev)}>
                <SideBarListItem item={e} transactions={transactions} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
