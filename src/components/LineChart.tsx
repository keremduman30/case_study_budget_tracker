import { Transaction } from "@/lib/type";
import { groupTransactionsByMonth, groupTransactionsByYear } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";
import {
  LineChart as LineChartContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const LineChart = ({
  transactionData,
  montly
}: {
  transactionData: Transaction[];
  montly: boolean;
}) => {
  const monthlyData = groupTransactionsByMonth(transactionData);
  const yearlyData = groupTransactionsByYear(transactionData);
  const montlyLineChartData = [
    {
      id: "Income",
      data: Object.keys(monthlyData).map(month => ({
        x: dayjs(month).format("MMMMM"),
        y: monthlyData[month] > 0 ? monthlyData[month] : 0 //incomes
      }))
    },
    {
      id: "Expenses",
      data: Object.keys(monthlyData).map(month => ({
        x: dayjs(month).format("MMMMM"),
        y: monthlyData[month] < 0 ? Math.abs(monthlyData[month]) : 0 //expensess
      }))
    }
  ];
  const yearlyLineChartData = [
    {
      id: "Income",
      data: Object.keys(yearlyData).map(month => ({
        x: dayjs(month).format("MMMMM"),
        y: yearlyData[month] > 0 ? yearlyData[month] : 0 //incomes
      }))
    },
    {
      id: "Expenses",
      data: Object.keys(yearlyData).map(month => ({
        x: dayjs(month).format("MMMMM"),
        y: yearlyData[month] < 0 ? Math.abs(yearlyData[month]) : 0 //expensess
      }))
    }
  ];

  const data = montly ? montlyLineChartData : yearlyLineChartData;
  return (
    <div>
      <div className="h-[350px] w-[350px] sm:w-[400px]   ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChartContainer data={data} margin={{ top: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px"
              }}
              labelStyle={{ color: "#333" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="y"
              data={data[0]?.data}
              stroke="#4caf50"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="y"
              data={data[1]?.data}
              stroke="#ff9800"
              activeDot={{ r: 8 }}
            />
          </LineChartContainer>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
