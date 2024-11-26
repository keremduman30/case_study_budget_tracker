import { Transaction } from "@/lib/type";
import { groupTransictionByCategories } from "@/lib/utils";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const CategoriesBarChart = ({
  transactionData,
  categoryType
}: {
  transactionData: Transaction[];
  categoryType: "expenses" | "income";
}) => {
  const groupdData = groupTransictionByCategories(
    transactionData,
    categoryType
  );
  const categoriesData = Object.keys(groupdData).map(category => ({
    category: category,
    amount: groupdData[category]
  }));

  return (
    <div className="h-[350px] w-[350px] sm:w-[400px]    ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={categoriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="amount"
            fill={categoryType === "expenses" ? "#861727" : "#4caf50"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoriesBarChart;
