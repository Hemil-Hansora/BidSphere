import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers = [], totalBidders = [] } = useSelector(
    (state) => state.admin
  );

  const labels = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const maxVal = Math.max(
    ...[...totalAuctioneers, ...totalBidders],
    25 // fallback minimum
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Bidders",
        data: totalBidders,
        borderColor: "#D3482B",
        // backgroundColor: "rgba(214, 72, 43, 0.2)",
        tension: 0.4, // Smooth curves
        fill: true, // Fill under the line
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Auctioneers",
        data: totalAuctioneers,
        borderColor: "#000000",
        // backgroundColor: "rgba(253, 186, 136, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxVal + 10,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
          color: "#6B7280", // muted gray
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
        text: "Bidders vs Auctioneers Growth Over Time",
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
        padding: 12,
      },
      legend: {
        labels: {
          color: "#374151",
          font: {
            size: 16,
          },
          boxWidth: 20,
          boxHeight: 20,
          padding: 20,
        },
        position: "bottom",
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: "#ffffff",
        hoverBorderWidth: 2,
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;
