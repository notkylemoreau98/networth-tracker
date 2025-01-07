import { useState } from 'react';

interface AddAccountModalProps {
  onClose: () => void;
  onAddAccount: (name: string, balance: number) => void;
}

const AddAccountModal = ({ onClose, onAddAccount }: AddAccountModalProps) => {
  const [accountName, setAccountName] = useState<string>('');
  const [accountBalance, setAccountBalance] = useState<number>(0);

  const handleAdd = () => {
    if (accountName && accountBalance >= 0) {
      onAddAccount(accountName, accountBalance);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Account</h2>

        <label className="block mb-2">
          Account Name:
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="border w-full p-2 mt-1 bg-white"
          />
        </label>

        <label className="block mb-2">
          Account Balance:
          <input
            type="number"
            min="0"
            value={accountBalance}
            onChange={(e) => setAccountBalance(parseFloat(e.target.value))}
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

export default AddAccountModal;
