"use client";
import CategoriesBarChart from "@/components/CategoriesBarChart";
import { useAppSelector } from "@/store/store";
import clsx from "clsx";
import { useMemo } from "react";

export default function Home() {
  const { transactions } = useAppSelector(store => store.budget);

  const totalExpense = useMemo(() => {
    const total = transactions
      .filter(e => e.categoryType === "expenses")
      .reduce((sum, transition) => sum + transition.amount, 0);
    return total;
  }, [transactions]);
  const totalIncome = useMemo(() => {
    const total = transactions
      .filter(e => e.categoryType === "income")
      .reduce((sum, transition) => sum + transition.amount, 0);
    return total;
  }, [transactions]);

  const balanceColor = useMemo(() => {
    const value = totalIncome - totalExpense;
    switch (true) {
      case value > 0:
        return "bg-[#4CAF50]";
      case value < 0:
        return "bg-[#F44336]";
      default:
        return "bg-[#2196F3]";
    }
  }, [totalExpense, totalIncome]);

  return (
    <div className={clsx(transactions.length > 0 ? "" : "h-full")}>
      <div className=" flex flex-col w-full h-full p-10  ">
        <div className="w-full  flex flex-col md:flex-row items-center gap-8   ">
          <div className="flex-1 w-full md:w-48 p-2 md:p-3 bg-[#4caf50] rounded-md flex flex-col items-center justify-center gap-2  shadow-md">
            <h1 className=" text-base lg:text-lg font-medium">Total Income</h1>
            <h1 className="lg:text-2xl font-semibold">${totalIncome}</h1>
          </div>
          <div
            className={`flex-1 w-full md:w-48 p-2 md:p-3  rounded-md flex flex-col items-center justify-center gap-2 shadow-md ${balanceColor}`}
          >
            <h1 className=" text-base lg:text-lg font-medium">Net Balance</h1>
            <h1 className="lg:text-2xl font-semibold">
              ${totalIncome - totalExpense}
            </h1>
          </div>
          <div className="flex-1 w-full md:w-48 p-2 md:p-3 bg-[#861727] rounded-md flex flex-col items-center justify-center gap-2 shadow-md">
            <h1 className=" text-base lg:text-lg font-medium">
              Total Expenses
            </h1>
            <h1 className="lg:text-2xl font-semibold">${totalExpense}</h1>
          </div>
        </div>
        {transactions.length > 0 ? (
          <>
            <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row items-center justify-between lg:px-10 mt-20">
              <CategoriesBarChart
                transactionData={transactions}
                categoryType="income"
              />
              <CategoriesBarChart
                transactionData={transactions}
                categoryType="expenses"
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-500 shadow-md lg:mx-10 my-10 ">
              <table className="w-full divide-y divide-gray-500  ">
                <thead className=" bg-[#3E4396] text-white ">
                  <tr>
                    <th className="px-1 sm:px-2 md:px-6 py-3 text-left text-sm font-bold">
                      Date
                    </th>
                    <th className="hidden md:flex px-6 py-3 text-left text-sm font-bold">
                      Category
                    </th>
                    <th className="px-1 sm:px-2 md:px-6 py-3 text-left text-sm font-bold">
                      Type
                    </th>
                    <th className="px-1 sm:px-2 md:px-6 py-3 text-right text-sm font-bold">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y  divide-gray-500 text-white">
                  {transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className={clsx(
                        "hover:bg-gray-600 transition bg-[#313B4F]"
                      )}
                    >
                      <td className="px-2 md:px-6 py-4 text-sm ">
                        {transaction.date}
                      </td>
                      <td className="hidden md:flex px-2 md:px-6 py-4 text-sm ">
                        {transaction.category}
                      </td>
                      <td
                        className={clsx(
                          `px-2 md:px-6 py-4 text-sm font-semibold `,
                          transaction.categoryType === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        )}
                      >
                        {transaction.categoryType}
                      </td>
                      <td className="px-2 md:px-6 py-4 text-sm text-center  sm:text-right ">
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1 className="text-white h-full w-full flex items-center justify-center  flex-1   ">
            No transactions data. Start by adding your first income or expense!
          </h1>
        )}
      </div>
    </div>
  );
}
