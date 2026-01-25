"use client";

import { useState } from "react";
import type { Transaction } from "@/lib/api/transactions";

import ModalAddTransaction from "@/components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "@/components/ModalEditTransaction/ModalEditTransaction";
import ModalDeleteTransaction from "@/components/ModalDeleteTransaction/ModalDeleteTransaction";

import TransactionsList from "@/components/HomeTab/TransactionsList";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTransactions } from "@/lib/api/transactions";

export type ModalType = "add" | "edit" | "delete" | null;

export default function TransactionPage() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const closeModal = () => {
    setModalType(null);
    setSelectedTransaction(null);
  };

  const { data } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactions,
  });

  return (
    <>
      {data && (
        <TransactionsList
          data={data}
          setModalType={setModalType}
          setSelectedTransaction={setSelectedTransaction}
        />
      )}

      {modalType === "add" && <ModalAddTransaction onClose={closeModal} />}

      {modalType === "edit" && selectedTransaction && (
        <ModalEditTransaction
          transaction={selectedTransaction}
          onClose={closeModal}
        />
      )}

      {modalType === "delete" && selectedTransaction && (
        <ModalDeleteTransaction
          transaction={selectedTransaction}
          onClose={closeModal}
        />
      )}
    </>
  );
}
