import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const PriceComparisonChart = ({ actualPrices, predictedPrices }) => {
    const data = {
        labels: actualPrices.map((_, index) => `Property ${index + 1}`),
        datasets: [
            {
                label: "Actual Price ($)",
                data: actualPrices,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
                pointRadius: 3,
            },
            {
                label: "Predicted Price ($)",
                data: predictedPrices,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderWidth: 2,
                pointRadius: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
            <h2 className="text-center text-lg font-bold mb-4">📊 Predicted vs. Actual Prices</h2>
            <Line data={data} options={options} />
        </div>
    );
};
PriceComparisonChart.propTypes = {
    actualPrices: PropTypes.arrayOf(PropTypes.number).isRequired,
    predictedPrices: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PriceComparisonChart;
