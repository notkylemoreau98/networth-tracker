import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FaTrashAlt } from "react-icons/fa";
const Account = ({ id, name, balance, isEditing, onDeleteAccount, onNameChange, onBalanceChange }) => {
    const normalizeBalance = (balance) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
    };
    return (_jsx("div", { className: 'flex justify-between', children: isEditing ? (_jsxs(_Fragment, { children: [_jsx("input", { type: "text", value: name, onChange: (e) => onNameChange(id, e.target.value), className: "border p-1 rounded bg-white" }), _jsx("input", { type: "number", value: balance, onChange: (e) => onBalanceChange(id, parseFloat(e.target.value)), className: "border p-1 rounded bg-white" }), _jsx("button", { onClick: () => onDeleteAccount(id), children: _jsx(FaTrashAlt, {}) })] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: name }), _jsx("span", { children: normalizeBalance(balance) })] })) }, id));
};
export default Account;
