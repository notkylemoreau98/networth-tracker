import { useState } from 'react';

interface AddGoalModalProps {
  onClose: () => void;
  onAddGoal: (name: string, startingValue: number, goalEndValue: number) => void;
}

const AddGoalModal = ({ onClose, onAddGoal }: AddGoalModalProps) => {
  const [goalName, setGoalName] = useState<string>('');
  const [goalStartingValue, setGoalStartingValue] = useState<number>(0);
  const [goalEndValue, setGoalEndValue] = useState<number>(0);

  const handleAdd = () => {
    if (goalName && goalStartingValue >= 0) {
      onAddGoal(goalName, goalStartingValue, goalEndValue);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Goal</h2>

        <label className="block mb-2">
          Goal Name:
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="border w-full p-2 mt-1 bg-white"
          />
        </label>

        <label className="block mb-2">
          Starting Amount:
          <input
            type="number"
            min="0"
            value={goalStartingValue}
            onChange={(e) => setGoalStartingValue(parseFloat(e.target.value))}
            className="border w-full p-2 mt-1 bg-white"
          />
        </label>

        <label className="block mb-2">
          Goal Amount:
          <input
            type="number"
            min="0"
            value={goalEndValue}
            onChange={(e) => setGoalEndValue(parseFloat(e.target.value))}
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
            Add Goal
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddGoalModal;