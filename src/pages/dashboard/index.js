import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Account from "../../components/Account";
import AddAccountModal from "../../components/AddAccountModal";
import AddDebtModal from "../../components/AddDebtModal";
import AddGoalModal from "../../components/AddGoalModal";
import Chart from "../../components/Chart";
import Debt from "../../components/Debt";
import Goal from "../../components/Goal";
const DashBoard = () => {
    const accountsLocalStorageKey = "accounts";
    const goalsLocalStorageKey = "goals";
    const debtsLocalStorageKey = "debts";
    const [netWorth, setNetWorth] = useState(0);
    const [assets, setAssets] = useState(0);
    const [debtsDisplay, setDebtsDisplay] = useState(0);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [isEditingDebt, setIsEditingDebt] = useState(false);
    const [accounts, setAccounts] = useState(() => {
        const storedAccounts = localStorage.getItem(accountsLocalStorageKey);
        return storedAccounts ? JSON.parse(storedAccounts) : [];
    });
    const [goals, setGoals] = useState(() => {
        const storedGoals = localStorage.getItem(goalsLocalStorageKey);
        return storedGoals ? JSON.parse(storedGoals) : [];
    });
    const [debts, setDebts] = useState(() => {
        const storedDebts = localStorage.getItem(debtsLocalStorageKey);
        return storedDebts ? JSON.parse(storedDebts) : [];
    });
    // Keep everything local w local storage first and then upgrade to DB and accounts later
    // Eventually break accounts and goals into separate sub pages
    const formatUSD = (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
    const addAccount = (name, balance) => {
        const newAccount = {
            id: accounts.length + 1,
            name,
            balance,
            imageUrl: "",
        };
        setAccounts([...accounts, newAccount]);
        setIsAccountModalOpen(false);
    };
    const addGoal = (name, startingValue, goalValue) => {
        const newGoal = {
            id: goals.length + 1,
            name,
            startingValue,
            goalValue,
        };
        setGoals([...goals, newGoal]);
        setIsGoalModalOpen(false);
    };
    const addDebt = (name, balance) => {
        const newDebt = {
            id: debts.length + 1,
            name,
            balance
        };
        setDebts([...debts, newDebt]);
        setIsDebtModalOpen(false);
    };
    const handleSave = (type) => {
        if (type === 'account') {
            setIsEditingAccount(false);
            localStorage.setItem(accountsLocalStorageKey, JSON.stringify(accounts));
        }
        else if (type === 'goal') {
            setIsEditingGoal(false);
            localStorage.setItem(goalsLocalStorageKey, JSON.stringify(goals));
        }
        else {
            setIsEditingDebt(false);
            localStorage.setItem(debtsLocalStorageKey, JSON.stringify(debts));
        }
    };
    const handleEdit = (type) => {
        if (type === 'goal') {
            setIsEditingGoal(!isEditingGoal);
        }
        else if (type === 'account') {
            setIsEditingAccount(!isEditingAccount);
        }
        else {
            setIsEditingDebt(!isEditingDebt);
        }
    };
    const handleAccountNameChange = (id, newName) => {
        setAccounts(prev => prev.map(account => account.id === id ? { ...account, name: newName } : account));
    };
    const handleAccountBalanceChange = (id, newBalance) => {
        setAccounts(prev => prev.map(account => account.id === id ? { ...account, balance: newBalance } : account));
    };
    const handleGoalNameChange = (id, newName) => {
        setGoals(prev => prev.map(goal => goal.id === id ? { ...goal, name: newName } : goal));
    };
    const handleGoalStartingBalanceChange = (id, newBalance) => {
        setGoals(prev => prev.map(goal => goal.id === id ? { ...goal, startingValue: newBalance } : goal));
    };
    const handleGoalEndBalanceChange = (id, newBalance) => {
        setGoals(prev => prev.map(goal => goal.id === id ? { ...goal, goalValue: newBalance } : goal));
    };
    const handleDebtNameChange = (id, newName) => {
        setDebts(prev => prev.map(debt => debt.id === id ? { ...debt, name: newName } : debt));
    };
    const handleDebtBalanceChange = (id, newBalance) => {
        setDebts(prev => prev.map(debt => debt.id === id ? { ...debt, balance: newBalance } : debt));
    };
    const handleDeleteAccount = (id) => {
        setAccounts((prev) => prev.filter((account) => account.id !== id));
    };
    const handleDeleteGoal = (id) => {
        setGoals((prev) => prev.filter((goal) => goal.id !== id));
    };
    const handleDeleteDebt = (id) => {
        setDebts((prev) => prev.filter((debt) => debt.id !== id));
    };
    useEffect(() => {
        const storedAccounts = localStorage.getItem(accountsLocalStorageKey);
        if (storedAccounts) {
            setAccounts(JSON.parse(storedAccounts));
        }
        const storedGoals = localStorage.getItem(goalsLocalStorageKey);
        if (storedGoals) {
            setGoals(JSON.parse(storedGoals));
        }
        const storedDebts = localStorage.getItem(debtsLocalStorageKey);
        if (storedDebts) {
            setDebts(JSON.parse(storedDebts));
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
        setDebtsDisplay(totalDebts);
        setNetWorth(totalAssets - totalDebts);
    }, [accounts, debts]);
    return (_jsxs(_Fragment, { children: [_jsx("p", { className: 'text-3xl text-left font-bold my-10', children: "Overview" }), _jsxs("section", { className: 'flex space-x-10', children: [_jsxs("div", { className: 'flex-1 bg-black text-white p-8 rounded-xl text-2xl font-bold shadow-md', children: [_jsx("span", { children: "Net Worth:" }), ' ', _jsx("span", { children: formatUSD(netWorth) })] }), _jsxs("div", { className: 'flex-1 bg-white p-8 rounded-xl text-2xl font-bold shadow-md', children: [_jsx("span", { children: "Assets: " }), _jsx("span", { children: formatUSD(assets) })] }), _jsxs("div", { className: 'flex-1 bg-white p-8 rounded-xl text-2xl font-bold shadow-md', children: [_jsx("span", { children: "Debts: " }), _jsx("span", { children: formatUSD(debtsDisplay) })] })] }), _jsxs("section", { className: 'lg:flex lg:space-x-5', children: [_jsxs("div", { className: 'bg-white shadow-md rounded-md p-5 mt-10 lg:flex-[2]', children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("p", { className: 'text-left text-xl font-bold', children: "Accounts" }), accounts.length > 0 && (_jsx("button", { onClick: () => handleEdit('account'), children: isEditingAccount ? "Cancel" : "Edit" }))] }), _jsx("div", { id: 'account-container', className: 'py-5 space-y-2', children: accounts.map(account => (_jsx(Account, { id: account.id, name: account.name, balance: account.balance, isEditing: isEditingAccount, onDeleteAccount: handleDeleteAccount, onNameChange: handleAccountNameChange, onBalanceChange: handleAccountBalanceChange }, account.id))) }), isEditingAccount ? (_jsx("button", { onClick: () => handleSave('account'), className: "bg-blue-500 text-white px-4 py-2 rounded mt-5", children: "Save" })) : (_jsx("button", { onClick: () => setIsAccountModalOpen(true), className: "bg-blue-500 text-white px-4 py-2 rounded mt-5", children: "Add New Account" }))] }), _jsxs("div", { className: 'bg-white shadow-md rounded-md p-5 mt-10 lg:flex-1', children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("p", { className: 'text-left text-xl font-bold', children: "Goals" }), goals.length > 0 && (_jsx("button", { onClick: () => handleEdit('goal'), children: isEditingGoal ? "Cancel" : "Edit" }))] }), _jsx("div", { id: 'goal-container', className: 'py-5 space-y-2', children: goals.map(goal => (_jsx(Goal, { id: goal.id, name: goal.name, startingValue: goal.startingValue, goalValue: goal.goalValue, isEditing: isEditingGoal, onDeleteGoal: handleDeleteGoal, onNameChange: handleGoalNameChange, onStartingBalanceChange: handleGoalStartingBalanceChange, onGoalBalanceChange: handleGoalEndBalanceChange }, goal.id))) }), isEditingGoal ? (_jsx("button", { onClick: () => handleSave('goal'), className: "bg-blue-500 text-white px-4 py-2 rounded mt-5", children: "Save" })) : (_jsx("button", { onClick: () => setIsGoalModalOpen(true), className: "bg-blue-500 text-white px-4 py-2 rounded mt-5", children: "Add Goal" }))] })] }), _jsxs("section", { className: 'lg:flex lg:space-x-5', children: [_jsxs("div", { className: 'bg-white shadow-md rounded-md p-5 mt-10 lg:flex-1', children: [_jsx("p", { className: 'text-left text-xl font-bold', children: "Account Distribution" }), accounts.length > 0 ? (_jsx(Chart, { accounts: accounts })) : (_jsx("p", { className: "text-gray-500", children: "No accounts available to display." }))] }), _jsxs("div", { className: 'bg-white shadow-md rounded-md p-5 mt-10 lg:flex-[2]', children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("p", { className: 'text-left text-xl font-bold', children: "Debts" }), debts.length > 0 && (_jsx("button", { onClick: () => handleEdit('debt'), children: isEditingGoal ? "Cancel" : "Edit" }))] }), _jsx("div", { id: 'debt-container', className: 'py-5 space-y-2', children: debts.map(debt => (_jsx(Debt, { id: debt.id, name: debt.name, balance: debt.balance, isEditing: isEditingDebt, onDeleteDebt: handleDeleteDebt, onNameChange: handleDebtNameChange, onBalanceChange: handleDebtBalanceChange }, debt.id))) }), isEditingDebt ? (_jsx("button", { onClick: () => handleSave('debt'), className: "bg-blue-500 text-white px-4 py-2 rounded mt-5", children: "Save" })) : (_jsx("button", { onClick: () => setIsDebtModalOpen(true), className: "bg-blue-500 text-white px-4 py-2 rounded mt-5", children: "Add New Debt" }))] })] }), isAccountModalOpen && (_jsx(AddAccountModal, { onClose: () => setIsAccountModalOpen(false), onAddAccount: addAccount })), isGoalModalOpen && (_jsx(AddGoalModal, { onClose: () => setIsGoalModalOpen(false), onAddGoal: addGoal })), isDebtModalOpen && (_jsx(AddDebtModal, { onClose: () => setIsDebtModalOpen(false), onAddDebt: addDebt }))] }));
};
export default DashBoard;
