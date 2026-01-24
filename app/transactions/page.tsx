"use client";

import { useState } from "react";
import ModalAddTransaction from "@/components/ModalAddTransaction/ModalAddTransaction";
import TransactionItem from "@/components/HomeTab/TransactionsItem";

export default function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <TransactionItem setIsModalOpen={setIsModalOpen} />

      {isModalOpen && (
        <ModalAddTransaction onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
