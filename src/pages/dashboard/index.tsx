import { useState, useEffect } from "react";
import Account from "../../components/Account";
import AddAccountModal from "../../components/AddAccountModal";
import AddGoalModal from "../../components/AddGoalModal";
import Goal from "../../components/Goal";

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


const DashBoard = () => {
  const [netWorth, setNetWorth] = useState(0);
  const [assets, setAssets] = useState(0);
  const [debts, setDebts] = useState(0);
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState<boolean>(false)
  const accountsLocalStorageKey: string = "accounts";

  // Keep everything local w local storage first and then upgrade to DB and accounts later
  
  const tempAccountData: AccountData[] = [
    {
      id: 1,
      name: 'Brokerage',
      imageUrl: '',
      balance: 4584.88
    },
    {
      id: 2,
      name: 'Roth IRA',
      imageUrl: '',
      balance: 15793.81
    },
    {
      id: 3,
      name: '401k',
      imageUrl: '',
      balance: 30670.62
    },
    {
      id: 4,
      name: 'HYSA',
      imageUrl: '',
      balance: 14179.82
    }
  ]

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
      id: accounts.length + 1,
      name,
      startingValue,
      goalValue,
    };
    setGoals([...goals, newGoal]);
    setIsGoalModalOpen(false);
  };

  useEffect(() => {
    // Load accounts from local storage or use default data
    const storedAccounts = localStorage.getItem(accountsLocalStorageKey);
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts) as AccountData[]);
    } else {
      localStorage.setItem(accountsLocalStorageKey, JSON.stringify(tempAccountData));
      setAccounts(tempAccountData);
    }
  }, []);

  useEffect(() => {
    // Calculate total assets and net worth whenever accounts or debts change
    const totalAssets = accounts.reduce((sum, account) => sum + account.balance, 0);
    setAssets(totalAssets);
    setNetWorth(totalAssets - debts);
  }, [accounts, debts]);

  useEffect(() => {
    // Save accounts to local storage whenever they change
    localStorage.setItem(accountsLocalStorageKey, JSON.stringify(accounts));
  }, [accounts]);
  
  
  return (
    <>
      <p className='text-3xl text-left font-bold my-10'>Overview</p>
       {/* Display Data */}
        {/* Total / Added this Year */}
        <section className='flex space-x-10'>
          <div className='flex-1 bg-black text-white p-8 rounded-full text-2xl font-bold'>
            <span>Net Worth:</span>
            {' '}
            <span>{formatUSD(netWorth)}</span>
          </div>
          <div className='flex-1 bg-white p-8 rounded-full text-2xl font-bold'>
            {/* Ability to filter between week / month / year */}
            <span>Assets: </span>
            <span>{formatUSD(assets)}</span>
          </div>
          <div className='flex-1 bg-white p-8 rounded-full text-2xl font-bold'>
            <span>Debts: </span>
            <span>{formatUSD(debts)}</span>
          </div>
        </section>

        {/* Chart Visualizer */}
        {/* <section>
          Chart
        </section> */}

        {/* These two sections side by side in a 8-4 col format */}
        <section className='lg:flex space-x-5'>
          {/* Accounts */}
          <div className='bg-white border border-1 border-black rounded-sm p-5 mt-10 lg:flex-[2]'>
            <p className='text-left text-xl font-bold'>Accounts</p>

            <div id='account-container' className='py-5 space-y-2'>
              {accounts.map(account => (
                <Account
                  key={account.id}
                  id={account.id}
                  name={account.name}
                  balance={account.balance}
                />
              ))}
            </div>

            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
            >
              Add New Account
            </button>
          </div>

          {/* Goals */}
          <div className='bg-white border border-1 border-black rounded-sm p-5 mt-10 lg:flex-1'>
            <p className='text-left text-xl font-bold'>Goals</p>

            <div id='goal-container' className='py-5 space-y-2'>
              {goals.map(goal => (
                <Goal
                  key={goal.id}
                  id={goal.id}
                  name={goal.name}
                  startingValue={goal.startingValue}
                  goalValue={goal.goalValue}
                />
              ))}
            </div>

            <button
              onClick={() => setIsGoalModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
            >
              Add Goal
            </button>
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
    </>
  )
}

export default DashBoard
