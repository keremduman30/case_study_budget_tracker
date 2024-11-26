import { Transaction } from "@/lib/type";
import { groupTransactionsByMonth, groupTransactionsByYear } from "@/lib/utils";
import {
  PieChart as PieChartContainer,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";
import React from "react";
const PieChart = ({
  transactionData,
  montly
}: {
  transactionData: Transaction[];
  montly: boolean;
}) => {
  const monthlyData = groupTransactionsByMonth(transactionData);
  const yearlyData = groupTransactionsByYear(transactionData);
  const montlyPieChartData = Object.keys(monthlyData).map(category => ({
    id: category,
    label: category,
    value: monthlyData[category]
  }));
  const yearlyPieChartData = Object.keys(yearlyData).map(category => ({
    id: category,
    label: category,
    value: yearlyData[category]
  }));
  const data = montly ? montlyPieChartData : yearlyPieChartData;
  const COLORS = ["#4caf50", "#ff9800", "#f44336", "#2196f3"];

  return (
    <div className="h-[350px] w-[350px] sm:w-[400px] ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChartContainer>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={110}
            paddingAngle={5}
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
            labelStyle={{ color: "#333" }}
          />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChartContainer>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
