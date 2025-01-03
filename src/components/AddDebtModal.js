import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const AddDebtModal = ({ onClose, onAddDebt }) => {
    const [debtName, setDebtName] = useState('');
    const [debtBalance, setDebtBalance] = useState(0);
    const handleAdd = () => {
        if (debtName && debtBalance >= 0) {
            onAddDebt(debtName, debtBalance);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white p-8 rounded shadow-lg", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Add New Debt" }), _jsxs("label", { className: "block mb-2", children: ["Debt Name:", _jsx("input", { type: "text", value: debtName, onChange: (e) => setDebtName(e.target.value), className: "border w-full p-2 mt-1 bg-white" })] }), _jsxs("label", { className: "block mb-2", children: ["Account Balance:", _jsx("input", { type: "number", value: debtBalance, onChange: (e) => setDebtBalance(parseFloat(e.target.value)), className: "border w-full p-2 mt-1 bg-white" })] }), _jsxs("div", { className: "flex justify-end space-x-2 mt-4", children: [_jsx("button", { onClick: onClose, className: "bg-gray-500 text-white px-4 py-2 rounded", children: "Cancel" }), _jsx("button", { onClick: handleAdd, className: "bg-blue-500 text-white px-4 py-2 rounded", children: "Add Account" })] })] }) }));
};
export default AddDebtModal;
