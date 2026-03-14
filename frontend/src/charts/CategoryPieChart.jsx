import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryPieChart({ complaints }) {
  const categoryCount = complaints.reduce((acc, curr) => {
    const cat = curr.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        data: Object.values(categoryCount),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",   // Blue
          "rgba(16, 185, 129, 0.8)",   // Emerald
          "rgba(245, 158, 11, 0.8)",   // Amber
          "rgba(239, 68, 68, 0.8)",    // Red
          "rgba(139, 92, 246, 0.8)",   // Purple
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: 'inherit', size: 12 }
        }
      }
    },
    maintainAspectRatio: false,
    cutout: '40%' // Makes it a donut chart
  };

  if (!complaints.length) return <div className="flex h-full items-center justify-center text-gray-400 italic">No data available</div>;

  return (
    <div className="h-64 w-full relative">
      <Pie data={data} options={options} />
    </div>
  );
}
