import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaymentGraph = () => {
  const { monthlyRevenue = [] } = useSelector((state) => state.admin);

  console.log(monthlyRevenue)

  const labels = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const maxRevenue = Math.max(...monthlyRevenue, 5000); // fallback minimum 5000

  const data = {
    labels,
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "rgba(214, 72, 43, 0.8)",
        borderRadius: 8,
        barThickness: 30,
        hoverBackgroundColor: "#b93821",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxRevenue + 500, // buffer space above highest bar
        ticks: {
          callback: function (value) {
            return `₹${value.toLocaleString()}`;
          },
          color: "#6B7280",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "#E5E7EB",
          borderDash: [8, 4],
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Revenue Collection",
        color: "#111827",
        font: {
          size: 24,
          weight: "bold",
        },
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        bodyColor: "#D1D5DB",
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const value = context.raw || 0;
            return `₹${value.toLocaleString()}`;
          },
        },
        padding: 12,
      },
      legend: {
        display: false, // no need, single dataset
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
