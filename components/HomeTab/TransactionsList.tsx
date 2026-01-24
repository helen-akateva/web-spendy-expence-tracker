import { ModalType } from "@/app/transactions/page";
import TransactionsItem from "./TransactionsItem";
import { Transaction } from "@/lib/api/transactions";

interface Props {
  setModalType: (value: ModalType) => void;
  data: Transaction[];
}

const TransactionsList = ({ setModalType, data }: Props) => {
  return (
    <>
      <TransactionsItem setModalType={setModalType} data={data} />
    </>
  );
};

export default TransactionsList;
