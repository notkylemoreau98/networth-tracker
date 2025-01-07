import { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import Account from "../../components/Account";
import AddAccountModal from "../../components/AddAccountModal";
import AddDebtModal from "../../components/AddDebtModal";
import AddGoalModal from "../../components/AddGoalModal";
import Chart from "../../components/Chart";
import Debt from "../../components/Debt";
import Goal from "../../components/Goal";
// Pick safer ids
interface AccountData {
  id: number;
  name: string;
  imageUrl: string;
  balance: number;
}
interface GoalData {
  id: number;
  name: string;
  startingValue: number;
  goalValue: number;
}

interface DebtData {
  id: number;
  name: string;
  balance: number;
}


const DashBoard = () => {
  const accountsLocalStorageKey: string = "accounts";
  const goalsLocalStorageKey: string = "goals";
  const debtsLocalStorageKey: string = "debts";
  
  const [netWorth, setNetWorth] = useState<number>(0);
  const [assets, setAssets] = useState<number>(0);
  const [debtsDisplay, setDebtsDisplay] = useState<number>(0)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState<boolean>(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState<boolean>(false);
  const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false);
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);
  const [isEditingDebt, setIsEditingDebt] = useState<boolean>(false);

  const [accounts, setAccounts] = useState<AccountData[]>(() => {
    const storedAccounts = localStorage.getItem(accountsLocalStorageKey);
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });
  
  const [goals, setGoals] = useState<GoalData[]>(() => {
    const storedGoals = localStorage.getItem(goalsLocalStorageKey);
    return storedGoals ? JSON.parse(storedGoals) : [];
  });

  const [debts, setDebts] = useState<DebtData[]>(() => {
    const storedDebts = localStorage.getItem(debtsLocalStorageKey);
    return storedDebts ? JSON.parse(storedDebts) : [];
  });

  // Keep everything local w local storage first and then upgrade to DB and accounts later
  // Eventually break accounts and goals into separate sub pages
  const formatUSD = (value: number): string =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const addAccount = (name: string, balance: number) => {
    const newAccount: AccountData = {
      id: accounts.length + 1,
      name,
      balance,
      imageUrl: "",
    };
    setAccounts([...accounts, newAccount]);
    setIsAccountModalOpen(false);
  };

  const addGoal = (name: string, startingValue: number, goalValue: number) => {
    const newGoal: GoalData = {
      id: goals.length + 1,
      name,
      startingValue,
      goalValue,
    };
    setGoals([...goals, newGoal]);
    setIsGoalModalOpen(false);
  };

  const addDebt = (name: string, balance: number) => {
    const newDebt: DebtData = {
      id: debts.length + 1,
      name,
      balance
    };
    setDebts([...debts, newDebt]);
    setIsDebtModalOpen(false);
  };

  const handleSave = (type: string) => {
    if (type === 'account') {
      setIsEditingAccount(false);
      localStorage.setItem(accountsLocalStorageKey, JSON.stringify(accounts));
    } else if (type === 'goal') { 
      setIsEditingGoal(false);
      localStorage.setItem(goalsLocalStorageKey, JSON.stringify(goals));
    } else {
      setIsEditingDebt(false);
      localStorage.setItem(debtsLocalStorageKey, JSON.stringify(debts));
    }
  };

  const handleEdit = (type: string) => {
    if (type === 'goal') {
      setIsEditingGoal(!isEditingGoal)
    } else if (type === 'account') {
      setIsEditingAccount(!isEditingAccount)
    } else {
      setIsEditingDebt(!isEditingDebt)
    }
  };
  

  const handleAccountNameChange = (id: number, newName: string) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === id ? { ...account, name: newName } : account
      )
    );
  };

  const handleAccountBalanceChange = (id: number, newBalance: number) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === id ? { ...account, balance: newBalance } : account
      )
    );
  };

  const handleGoalNameChange = (id: number, newName: string) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, name: newName } : goal
      )
    );
  };

  const handleGoalStartingBalanceChange = (id: number, newBalance: number) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, startingValue: newBalance } : goal
      )
    );
  };
  
  const handleGoalEndBalanceChange = (id: number, newBalance: number) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, goalValue: newBalance } : goal
      )
    );
  };

  const handleDebtNameChange = (id: number, newName: string) => {
    setDebts(prev =>
      prev.map(debt =>
        debt.id === id ? { ...debt, name: newName } : debt
      )
    );
  };

  const handleDebtBalanceChange = (id: number, newBalance: number) => {
    setDebts(prev =>
      prev.map(debt =>
        debt.id === id ? { ...debt, balance: newBalance } : debt
      )
    );
  };

  const handleDeleteAccount = (id: number) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
  };
  
  const handleDeleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const handleDeleteDebt = (id: number) => {
    setDebts((prev) => prev.filter((debt) => debt.id !== id));
  };

  useEffect(() => {
    const storedAccounts = localStorage.getItem(accountsLocalStorageKey);
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts) as AccountData[]);
    }

    const storedGoals = localStorage.getItem(goalsLocalStorageKey);
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals) as GoalData[]);
    }

    const storedDebts = localStorage.getItem(debtsLocalStorageKey);
    if (storedDebts) {
      setDebts(JSON.parse(storedDebts) as DebtData[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(accountsLocalStorageKey, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(goalsLocalStorageKey, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(debtsLocalStorageKey, JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    const totalAssets = accounts.reduce((sum, account) => sum + account.balance, 0);
    const totalDebts = debts.reduce((sum, debt) => sum + debt.balance, 0);
    setAssets(totalAssets);
    setDebtsDisplay(totalDebts)
    setNetWorth(totalAssets - totalDebts);
  }, [accounts, debts]);
  
  return (
    <>
      <p className='text-3xl text-left font-bold my-10'>Overview</p>
        {/* Total / Added this Year */}
        <section className='md:flex items-center gap-5'>
          <div className='flex-1 bg-black text-white p-8 rounded-xl text-2xl font-bold shadow-md mb-3'>
            <span>Net Worth:</span>
            {' '}
            <span>{formatUSD(netWorth)}</span>
          </div>
          <div className='flex-1 bg-white p-8 rounded-xl text-2xl font-bold shadow-md mb-3'>
            {/* Ability to filter between week / month / year */}
            <span>Assets: </span>
            <span>{formatUSD(assets)}</span>
          </div>
          <div className='flex-1 bg-white p-8 rounded-xl text-2xl font-bold shadow-md mb-3'>
            <span>Debts: </span>
            <span>{formatUSD(debtsDisplay)}</span>
          </div>
        </section>

        {/* These two sections side by side in a 8-4 col format */}
        <section className='lg:flex lg:space-x-5'>
          {/* Accounts */}
          <div className='bg-white shadow-md rounded-md p-5 mt-10 lg:flex-[2]'>
            <div className="flex justify-between">
              <p className='text-left text-xl font-bold'>Accounts</p>

              {accounts.length > 0 && (
                <button
                  onClick={() => handleEdit('account')}
                >
                  {isEditingAccount ? "Cancel" : <MdOutlineEdit />}
                </button>
              )}
            </div>

            <div id='account-container' className='py-5 space-y-2'>
              {accounts.map(account => (
                <Account
                  key={account.id}
                  id={account.id}
                  name={account.name}
                  balance={account.balance}
                  isEditing={isEditingAccount}
                  onDeleteAccount={handleDeleteAccount}
                  onNameChange={handleAccountNameChange}
                  onBalanceChange={handleAccountBalanceChange}
                />
              ))}
            </div>

            {isEditingAccount ? (
              <button
                onClick={() => handleSave('account')}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
              >
                Add New Account
              </button>
            )}
          </div>

          {/* Goals */}
          <div className='bg-white shadow-md rounded-md p-5 mt-10 lg:flex-1'>
            <div className="flex justify-between">
              <p className='text-left text-xl font-bold'>Goals</p>

              {goals.length > 0 && (
                <button
                  onClick={() => handleEdit('goal')}
                >
                  {isEditingGoal ? "Cancel" : <MdOutlineEdit />}
              </button>
              )}
            </div>

            <div id='goal-container' className='py-5 space-y-2'>
              {goals.map(goal => (
                <Goal
                  key={goal.id}
                  id={goal.id}
                  name={goal.name}
                  startingValue={goal.startingValue}
                  goalValue={goal.goalValue}
                  isEditing={isEditingGoal}
                  onDeleteGoal={handleDeleteGoal}
                  onNameChange={handleGoalNameChange}
                  onStartingBalanceChange={handleGoalStartingBalanceChange}
                  onGoalBalanceChange={handleGoalEndBalanceChange}
                />
              ))}
            </div>

            {isEditingGoal ? (
              <button
                onClick={() => handleSave('goal')}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsGoalModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
              >
                Add Goal
              </button>
            )}
          </div>
        </section>

        <section className='lg:flex lg:space-x-5'>
          <div className='bg-white shadow-md rounded-md p-5 mt-10 lg:flex-1'>
          <p className='text-left text-xl font-bold'>Account Distribution</p>
            {accounts.length > 0 ? (
              <Chart accounts={accounts} />
            ) : (
              <p className="text-gray-500 mt-5">No accounts available to display.</p>
            )}
          </div>
          <div className='bg-white shadow-md rounded-md p-5 mt-10 lg:flex-[2]'>
            <div className="flex justify-between">
              <p className='text-left text-xl font-bold'>Debts</p>

              {debts.length > 0 && (
                <button
                  onClick={() => handleEdit('debt')}
                >
                  {isEditingDebt ? "Cancel" : <MdOutlineEdit />}
              </button>
              )}
            </div>

            <div id='debt-container' className='py-5 space-y-2'>
              {debts.map(debt => (
                <Debt
                  key={debt.id}
                  id={debt.id}
                  name={debt.name}
                  balance={debt.balance}
                  isEditing={isEditingDebt}
                  onDeleteDebt={handleDeleteDebt}
                  onNameChange={handleDebtNameChange}
                  onBalanceChange={handleDebtBalanceChange}
                />
              ))}
            </div>

            {isEditingDebt ? (
              <button
                onClick={() => handleSave('debt')}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsDebtModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
              >
                Add New Debt
              </button>
            )}
          </div>
        </section>

        {isAccountModalOpen && (
          <AddAccountModal
            onClose={() => setIsAccountModalOpen(false)}
            onAddAccount={addAccount}
          />
        )}
        {isGoalModalOpen && (
          <AddGoalModal
            onClose={() => setIsGoalModalOpen(false)}
            onAddGoal={addGoal}
          />
        )}
        {isDebtModalOpen && (
          <AddDebtModal
            onClose={() => setIsDebtModalOpen(false)}
            onAddDebt={addDebt}
          />
        )}
    </>
  )
}

export default DashBoard;
