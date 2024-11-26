import dayjs from "dayjs";
import { Transaction } from "./type";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type CategoriesType = {
  income: string[];
  expenses: string[];
};
const categories: CategoriesType = {
  income: ["Salary", "Investment", "Other"],
  expenses: ["Food", "Transport", "Bills", "Entertainment"]
};

const categoryLimits = {
  expenses: {
    Food: 500,
    Transport: 300,
    Bills: 150,
    Entertainment: 200
  }
};

//month data group
const groupTransactionsByMonth = (transactions: Transaction[]) => {
  const groupedData: { [key: string]: number } = {};
  transactions.forEach(transaction => {
    const month = dayjs(transaction.date).format("YYYY-MM"); //month format
    if (!groupedData[month]) {
      groupedData[month] = 0; //groupedData["2024-01"] = 0;
    }

    //incomes expenses total
    if (transaction.categoryType === "income") {
      groupedData[month] += transaction.amount; // exmp  for january  groupedData["2024-01"] += 1000;
    } else {
      groupedData[month] -= transaction.amount; //groupedData["2024-01"] -= 1000;
    }
  });
  return groupedData;
};

// year data group
const groupTransactionsByYear = (transactions: Transaction[]) => {
  const groupedData: { [key: string]: number } = {};

  transactions.forEach(transaction => {
    const year = dayjs(transaction.date).format("YYYY"); // year format so 2024 11

    if (!groupedData[year]) {
      groupedData[year] = 0;
    }

    //incomes expenses total
    if (transaction.categoryType === "income") {
      groupedData[year] += transaction.amount;
    } else {
      groupedData[year] -= transaction.amount;
    }
  });

  return groupedData;
};

const groupTransictionByCategories = (
  transactions: Transaction[],
  categoryType: "income" | "expenses"
) => {
  const groupdData: { [key: string]: number } = {};

  transactions
    .filter(e => e.categoryType == categoryType)
    .forEach(transiction => {
      const category = transiction.category;
      if (!groupdData[category]) {
        groupdData[category] = 0;
      }
      groupdData[category] += transiction.amount;
    });

  return groupdData;
};

const generatePdf = (transactions: Transaction[]) => {
  const unit = "pt";
  const size = "A4"; //  A4
  const orientation = "portrait"; // portrait or landscape

  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);
  const title = "Financial Report";
  const headers = [["Date", "Category", "Type", "Amount"]];
  const data = transactions.map(item => [
    item.date,
    item.category,
    item.categoryType,
    item.amount
  ]);
  const content = {
    startY: 50,
    head: headers,
    body: data
  };
  doc.text(title, 105, 20, { align: "center" }); 
  autoTable(doc, content);

  doc.save("financial-report.pdf");
};

export type CategoryType = keyof typeof categoryLimits.expenses;

export {
  categories,
  categoryLimits,
  groupTransactionsByMonth,
  groupTransactionsByYear,
  groupTransictionByCategories,
  generatePdf
};
