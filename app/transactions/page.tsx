"use client";

import { useState } from "react";
import css from "./page.module.css";
import type { Transaction } from "@/lib/api/transactions";
import ModalAddTransaction from "@/components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "@/components/ModalEditTransaction/ModalEditTransaction";
import ModalDeleteTransaction from "@/components/ModalDeleteTransaction/ModalDeleteTransaction";

import TransactionsList from "@/components/HomeTab/TransactionsList";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTransactions } from "@/lib/api/transactions";

export type ModalType = "add" | "edit" | "delete" | null;

export default function Transaction() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = () => setModalType(null);

  const { data, isLoading, isError } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactions,
  });

  return (
    <>
      {data && <TransactionsList setModalType={setModalType} data={data} />}
      {/* <button className={css.buttonAdd} onClick={() => setModalType("add")}>
        <svg className={css.icon} width="25" height="25">
          <use href="/sprite.svg#icon-plus" />
        </svg>
      </button> */}
      <button
        className={css.buttonDelete}
        onClick={() => setModalType("delete")}
      >
        Delete
      </button>
      <button>Edit modal</button>
      {modalType === "add" && <ModalAddTransaction onClose={closeModal} />}
      {/* {modalType === "edit" && <ModalEditTransaction onClose={closeModal} />} */}
      {modalType === "delete" && (
        <ModalDeleteTransaction onClose={closeModal} />
      )}
    </>
  );
}
