"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useAppDispatch } from "@/store/store";
import { getLocalStorageInitialize } from "@/store/slice/budget_slice";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const storageData = localStorage.getItem("budget");
    if (storageData) {
      const data = JSON.parse(storageData);
      dispatch(getLocalStorageInitialize(data));
    }
    setIsInitialized(true);
  }, [dispatch]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
};

export default StoreProvider;
