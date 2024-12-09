type GoalTypes = {
  id: number;
  name: string;
  startingValue: number;
  goalValue: number;
}

const Goal = ({ id, name, startingValue, goalValue } : GoalTypes) => {
  const normalizeBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
  }
  
  return (
    <div key={id} className='flex justify-between'>
      <span>{name}</span>
      <span>{normalizeBalance(startingValue)} / {normalizeBalance(goalValue)}</span>
    </div>
  )
}

export default Goal;
