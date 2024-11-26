import { Transaction } from "@/lib/type";
import { groupTransactionsByMonth, groupTransactionsByYear } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";
import {
  BarChart as BarChartContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const BarChart = ({
  transactionData,
  montly
}: {
  transactionData: Transaction[];
  montly: boolean;
}) => {
  const monthlyData = groupTransactionsByMonth(transactionData);
  const yearlyData = groupTransactionsByYear(transactionData);
  const monthlyChartData = Object.keys(monthlyData).map(month => ({
    category: dayjs(month).format("MMMMM"),
    amount: monthlyData[month]
  }));
  const yearlyChartData = Object.keys(yearlyData).map(month => ({
    category: month,
    amount: yearlyData[month]
  }));

  const data = montly ? monthlyChartData : yearlyChartData;

  return (
    <div className="h-[350px] w-[350px] sm:w-[400px] ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChartContainer data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#4caf50" />
        </BarChartContainer>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
