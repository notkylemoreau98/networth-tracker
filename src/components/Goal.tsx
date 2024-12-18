import { FaTrashAlt } from "react-icons/fa";

type GoalTypes = {
  id: number;
  name: string;
  startingValue: number;
  goalValue: number;
  isEditing: boolean;
  onDeleteGoal: (id: number) => void;
  onNameChange: (id: number, newName: string) => void;
  onStartingBalanceChange: (id: number, newBalance: number) => void;
  onGoalBalanceChange: (id: number, newBalance: number) => void;
}

const Goal = (
  { id, name, startingValue, goalValue, isEditing, onDeleteGoal, onNameChange, onStartingBalanceChange, onGoalBalanceChange } : GoalTypes
  ) => {
  const normalizeBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
  }

  return (
    <div key={id} className='flex justify-between'>
      {isEditing ? (
        <section>
          <div className='flex justify-evenly'>
            <span>Name</span>
            <span>Starting Value</span>
            <span>Goal Value</span>
          </div>
          <div className='flex'>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(id, e.target.value)}
              className="border p-1 rounded bg-white flex-[2]"
            />
            <input
              type="number"
              value={startingValue}
              onChange={(e) => onStartingBalanceChange(id, parseFloat(e.target.value))}
              className="border p-1 rounded bg-white flex-1"
            />
            <input
              type="number"
              value={goalValue}
              onChange={(e) => onGoalBalanceChange(id, parseFloat(e.target.value))}
              className="border p-1 rounded bg-white flex-1"
            />
            <button
              onClick={(() => onDeleteGoal(id))}
            >
              <FaTrashAlt />
            </button>
          </div>
        </section>
      ) : (
        <>
          <span>{name}</span>
          <span>{normalizeBalance(startingValue)} / {normalizeBalance(goalValue)}</span>
        </>
      )}
    </div>
  )
}

export default Goal;
