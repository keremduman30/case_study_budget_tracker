export type CategoryItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export type Category = {
  categoryTitle?: string;
  categories: CategoryItem[];
};
export type SidebarListItemProp = {
  item: Category;
  selectedItem?: string;
  setSelectedItem?: (title: string) => void;
  transactions: Transaction[];
};
export type HeaderTitleProp = {
  title: string;
  subtitle?: string;
};
export type AddTrackForm = {
  categoryType: string;
  category: string;
  amount: string;
  date: string;
  desc: string;
};
export type Transaction = {
  amount: number;
  categoryType: "income" | "expenses";
  category: string;
  date: string;
  desc: string;
};

export type BudgetState = {
  income: number;
  expenses: number;
  transactions: Transaction[];
};

export type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};
