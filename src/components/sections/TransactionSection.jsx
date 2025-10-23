import { Separator } from "@/components/ui/separator";
import DateSelector from "@/components/ui/DateSelector";
import TransactionCard from "../ui/TransactionCard";

export default function TransactionSection({
  className,
  heading,
  no_transaction_message,
  transactions,
  loading,
  onDateChange,
  handleDeleteTransaction,
  openEditModal,
}) {
  return (
    <>
      <div className={`card-base p-6 ${className}`}>
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="headings text-center">{heading}</h2>
          <div className="">
            <DateSelector onDateChange={onDateChange} className="mx-6" />
          </div>
        </div>
        <Separator className="my-4" />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue-2"></div>
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-theme-blue-2 text-center py-8">
            {no_transaction_message}
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                openEditModal={openEditModal}
                handleDelete={() =>
                  handleDeleteTransaction(transaction.id, transaction.type)
                }
              />
            ))}
          </div>
        )}
      </div>
      ;
    </>
  );
}
