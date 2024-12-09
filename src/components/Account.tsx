type AccountTypes = {
  id: number;
  name: string;
  balance: number;
}

const Account = ({ id, name, balance } : AccountTypes) => {
  const normalizeBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
  }
  
  return (
    <div key={id} className='flex justify-between'>
      <span>{name}</span>
      <span>{normalizeBalance(balance)}</span>
    </div>
  )
}

export default Account;
