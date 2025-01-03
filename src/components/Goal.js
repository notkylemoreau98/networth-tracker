import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FaTrashAlt } from "react-icons/fa";
const Goal = ({ id, name, startingValue, goalValue, isEditing, onDeleteGoal, onNameChange, onStartingBalanceChange, onGoalBalanceChange }) => {
    const normalizeBalance = (balance) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
    };
    return (_jsx("div", { className: 'flex justify-between', children: isEditing ? (_jsxs("section", { children: [_jsxs("div", { className: 'flex justify-evenly', children: [_jsx("span", { children: "Name" }), _jsx("span", { children: "Starting Value" }), _jsx("span", { children: "Goal Value" })] }), _jsxs("div", { className: 'flex', children: [_jsx("input", { type: "text", value: name, onChange: (e) => onNameChange(id, e.target.value), className: "border p-1 rounded bg-white flex-[2]" }), _jsx("input", { type: "number", value: startingValue, onChange: (e) => onStartingBalanceChange(id, parseFloat(e.target.value)), className: "border p-1 rounded bg-white flex-1" }), _jsx("input", { type: "number", value: goalValue, onChange: (e) => onGoalBalanceChange(id, parseFloat(e.target.value)), className: "border p-1 rounded bg-white flex-1" }), _jsx("button", { onClick: (() => onDeleteGoal(id)), children: _jsx(FaTrashAlt, {}) })] })] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: name }), _jsxs("span", { children: [normalizeBalance(startingValue), " / ", normalizeBalance(goalValue)] })] })) }, id));
};
export default Goal;
