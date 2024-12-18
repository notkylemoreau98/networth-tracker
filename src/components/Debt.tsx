import { FaTrashAlt } from "react-icons/fa";

type DebtTypes = {
  id: number;
  name: string;
  balance: number;
  isEditing: boolean;
  onDeleteDebt: (id: number) => void;
  onNameChange: (id: number, newName: string) => void;
  onBalanceChange: (id: number, newBalance: number) => void;
}

const Debt = ({ id, name, balance, isEditing, onDeleteDebt, onNameChange, onBalanceChange }: DebtTypes) => {
  const normalizeBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
  }

  return (
    <div key={id} className='flex justify-between'>
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(id, e.target.value)}
            className="border p-1 rounded bg-white"
          />
          <input
            type="number"
            value={balance}
            onChange={(e) => onBalanceChange(id, parseFloat(e.target.value))}
            className="border p-1 rounded bg-white"
          />
          <button
            onClick={() => onDeleteDebt(id)}
          >
            <FaTrashAlt />
          </button>
        </>
      ) : (
        <>
          <span>{name}</span>
          <span>{normalizeBalance(balance)}</span>
        </>
      )}
    </div>
  )
}

export default Debt
