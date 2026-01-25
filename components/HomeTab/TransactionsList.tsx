import { ModalType } from "@/app/(dashboard)/transactions/page";
import TransactionsItem from "./TransactionsItem";
import { Transaction } from "@/lib/api/transactions";

interface Props {
  setModalType: (value: ModalType) => void;
  setSelectedTransaction: (value: Transaction | null) => void;
  data: Transaction[];
}

const TransactionsList = ({
  setModalType,
  setSelectedTransaction,
  data,
}: Props) => {
  return (
    <TransactionsItem
      data={data}
      setModalType={setModalType}
      setSelectedTransaction={setSelectedTransaction}
    />
  );
};

export default TransactionsList;
