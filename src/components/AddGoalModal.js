import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const AddGoalModal = ({ onClose, onAddGoal }) => {
    const [goalName, setGoalName] = useState('');
    const [goalStartingValue, setGoalStartingValue] = useState(0);
    const [goalEndValue, setGoalEndValue] = useState(0);
    const handleAdd = () => {
        if (goalName && goalStartingValue >= 0) {
            onAddGoal(goalName, goalStartingValue, goalEndValue);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white p-8 rounded shadow-lg", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Add New Goal" }), _jsxs("label", { className: "block mb-2", children: ["Goal Name:", _jsx("input", { type: "text", value: goalName, onChange: (e) => setGoalName(e.target.value), className: "border w-full p-2 mt-1 bg-white" })] }), _jsxs("label", { className: "block mb-2", children: ["Starting Amount:", _jsx("input", { type: "number", value: goalStartingValue, onChange: (e) => setGoalStartingValue(parseFloat(e.target.value)), className: "border w-full p-2 mt-1 bg-white" })] }), _jsxs("label", { className: "block mb-2", children: ["Goal Amount:", _jsx("input", { type: "number", value: goalEndValue, onChange: (e) => setGoalEndValue(parseFloat(e.target.value)), className: "border w-full p-2 mt-1 bg-white" })] }), _jsxs("div", { className: "flex justify-end space-x-2 mt-4", children: [_jsx("button", { onClick: onClose, className: "bg-gray-500 text-white px-4 py-2 rounded", children: "Cancel" }), _jsx("button", { onClick: handleAdd, className: "bg-blue-500 text-white px-4 py-2 rounded", children: "Add Goal" })] })] }) }));
};
export default AddGoalModal;
