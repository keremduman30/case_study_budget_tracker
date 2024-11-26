"use client";
import BarChart from "@/components/BarChart";
import CategoriesBarChart from "@/components/CategoriesBarChart";
import HeaderTitle from "@/components/HeaderTitle";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import { useAppSelector } from "@/store/store";

import React, { useState } from "react";

const Analysis = () => {
  const [selectView, setSelectView] = useState<number>(0);
  const { transactions } = useAppSelector(store => store.budget);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-10       ">
      {transactions.length > 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center   ">
          <div className=" flex items-center justify-between  w-full  mb-10  ">
            <HeaderTitle
              title={`${selectView == 0 ? "Montly" : "Yearly"} Data`}
              subtitle=""
            />
            <select
              name=""
              id=""
              className="text-black p-2 "
              onChange={e => setSelectView(Number(e.target.value))}
            >
              <option value="0">Montly</option>
              <option value="1">Yearly</option>
            </select>
          </div>
          <div className="flex items-center justify-center h-full mx-5  ">
            <div className="grid lg:grid-cols-2 w-full gap-10 ">
              <CategoriesBarChart
                transactionData={transactions}
                categoryType="expenses"
              />
              <BarChart
                transactionData={transactions}
                montly={selectView === 0}
              />
              <PieChart
                transactionData={transactions}
                montly={selectView === 0}
              />
              <LineChart
                transactionData={transactions}
                montly={selectView === 0}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-white h-full w-full flex items-center justify-center">
          No transactions data. Start by adding your first income or expense!
        </h1>
      )}
    </div>
  );
};

export default Analysis;
