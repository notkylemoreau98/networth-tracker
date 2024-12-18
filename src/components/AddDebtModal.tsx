import { useState } from 'react';

interface AddDebtModalProps {
  onClose: () => void;
  onAddDebt: (name: string, balance: number) => void;
}

const AddDebtModal = ({ onClose, onAddDebt }: AddDebtModalProps) => {
  const [debtName, setDebtName] = useState<string>('');
  const [debtBalance, setDebtBalance] = useState<number>(0);

  const handleAdd = () => {
    if (debtName && debtBalance >= 0) {
      onAddDebt(debtName, debtBalance);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Debt</h2>

        <label className="block mb-2">
          Debt Name:
          <input
            type="text"
            value={debtName}
            onChange={(e) => setDebtName(e.target.value)}
            className="border w-full p-2 mt-1 bg-white"
          />
        </label>

        <label className="block mb-2">
          Account Balance:
          <input
            type="number"
            value={debtBalance}
            onChange={(e) => setDebtBalance(parseFloat(e.target.value))}
            className="border w-full p-2 mt-1 bg-white"
          />
        </label>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddDebtModal;
