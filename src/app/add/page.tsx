"use client";
import HeaderTitle from "@/components/HeaderTitle";
import Modal from "@/components/Modal";
import { AddTrackForm } from "@/lib/type";
import { categories, categoryLimits, CategoryType } from "@/lib/utils";
import { addTransaction } from "@/store/slice/budget_slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const AddTrack = () => {
  const [categoryType, setCategoryType] = useState<"income" | "expenses">(
    "income"
  );

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalConfirm, setModalConfirm] = useState<() => void>(() => {});

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<AddTrackForm>();
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector(store => store.budget);

  const onSubmit: SubmitHandler<AddTrackForm> = async data => {
    const { amount, categoryType, category } = data;
    const amountNumber = Number(amount);

    if (categoryType === "expenses") {
      const currentLimit = categoryLimits.expenses[category as CategoryType];

      const totalSpend = transactions
        .filter(e => e.categoryType === "expenses" && e.category === category)
        .reduce((acc, t) => acc + t.amount, 0);

      const newTotalSpend = totalSpend + amountNumber;
      const limitReached = newTotalSpend >= currentLimit * 0.8;

      if (limitReached) {
        setOpenModal(true);
        setModalMessage(
          `You've reached 80% of your budget limit for ${category}.`
        );
        setModalConfirm(() => {
          return () => {
            dispatch(
              addTransaction({
                ...data,
                categoryType: categoryType as "income" | "expenses",
                amount: amountNumber
              })
            );

            reset();
            setOpenModal(false);
          };
        });
      } else {
        dispatch(
          addTransaction({
            ...data,
            categoryType: categoryType as "income" | "expenses",
            amount: amountNumber
          })
        );

        reset();
      }
    } else {
      dispatch(
        addTransaction({
          ...data,
          categoryType: categoryType as "income" | "expenses",
          amount: amountNumber
        })
      );

      reset();
    }
  };

  return (
    <div className="w-full   px-10  p-10    ">
      <HeaderTitle title="Add Track" subtitle="U can adding incomes/expenses" />
      <form
        className="text-black flex flex-col items-center justify-center  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full lg:w-1/2  mt-28 mb-5 space-y-5  flex flex-col   ">
          <div className="grid  md:grid-cols-2 w-full gap-5  ">
            <Controller
              name="categoryType"
              control={control}
              defaultValue=""
              rules={{
                required: "CategoryType is required"
              }}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={e => {
                    field.onChange(e);
                    if (e.target.value != "") {
                      setCategoryType(e.target.value as "income" | "expenses");
                    }
                  }}
                  className="p-3 rounded-md outline-none w-full"
                >
                  <option value="">Select Type</option>
                  <option value="income">Income</option>
                  <option value="expenses">Expenses</option>
                </select>
              )}
            />
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{
                required: "category is required"
              }}
              render={({ field }) => (
                <select
                  {...field}
                  className="p-3 rounded-md outline-none w-full"
                >
                  <option value="">Select Category</option>
                  {categories[categoryType].map((e, i) => (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              )}
            />

            <input
              type="number"
              placeholder="Amount $"
              className="px-2 py-3 rounded-md outline-none"
              min={0}
              max={99999}
              {...register("amount", { required: "amount field required" })}
            />
            <input
              type="date"
              placeholder="Date"
              className="p-2 rounded-md outline-none"
              {...register("date", {
                required: "date field required",
                validate: value => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  // Bugünkü tarihi de kabul etmek için saat farkını sıfırlıyoruz
                  today.setHours(0, 0, 0, 0);
                  return (
                    selectedDate >= today || "You cannot select a past date"
                  );
                }
              })}
            />
          </div>
          <textarea
            title="Desc"
            rows={3}
            placeholder="What is this expense or income about?"
            className=" px-2 py-3 rounded-md outline-none w-full resize-none overflow-hidden"
            {...register("desc", {
              required: "desciption field required",
              minLength: {
                value: 10,
                message: "At least 10 characters "
              }
            })}
          />
          <div className="w-full flex justify-between">
            <div>
              {errors && (
                <h1 className="text-red-500 ">
                  {errors.amount?.message ||
                    errors.date?.message ||
                    errors.desc?.message ||
                    errors.category?.message ||
                    errors.categoryType?.message}
                </h1>
              )}
            </div>
            <button className="w-48 h-10 rounded-md bg-gradient-to-b from-cyan-500 to-blue-500 text-white  hover:scale-105 duration-300  ">
              Add
            </button>
          </div>
        </div>
      </form>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={modalConfirm}
        message={modalMessage}
      />
    </div>
  );
};

export default AddTrack;
