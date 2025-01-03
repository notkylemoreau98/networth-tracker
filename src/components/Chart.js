import { jsx as _jsx } from "react/jsx-runtime";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const Chart = ({ accounts }) => {
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    // Chart data
    const data = {
        labels: accounts.map((account) => account.name),
        datasets: [
            {
                data: accounts.map((account) => account.balance),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverOffset: 8,
            },
        ],
    };
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;
                        const account = accounts[index];
                        const percentage = ((account.balance / totalBalance) * 100).toFixed(2);
                        return `${' '}$${account.balance.toLocaleString()} (${percentage}%)`;
                    },
                },
            },
        },
        maintainAspectRatio: false,
    };
    return (_jsx("div", { style: { height: '300px', width: '100%' }, children: _jsx(Doughnut, { data: data, options: options }) }));
};
export default Chart;
