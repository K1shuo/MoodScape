// client/src/components/MoodChart.tsx
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

// 注册 Chart.js 组件
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

interface Mood {
  id: number;
  moodType: string;
  note: string;
  createdAt: string;
}

interface MoodChartProps {
  moods: Mood[];
}

const MoodChart = ({ moods }: MoodChartProps) => {
  // 1. 数据处理：将心情转换为数值以便绘图
  // Happy = 4, Calm = 3, Anxious = 2, Sad = 1
  const getMoodValue = (type: string) => {
    switch (type) {
      case "Happy": return 4;
      case "Calm": return 3;
      case "Anxious": return 2;
      case "Sad": return 1;
      default: return 0;
    }
  };

  // 2. 准备图表数据
  // 注意：我们需要把数据按时间正序排列（旧 -> 新），否则折线图会乱
  const sortedMoods = [...moods].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // 提取 X 轴 (时间) 和 Y 轴 (数值)
  const labels = sortedMoods.map((m) => 
    new Date(m.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })
  );
  const dataPoints = sortedMoods.map((m) => getMoodValue(m.moodType));

  const data = {
    labels,
    datasets: [
      {
        label: "Mood Level",
        data: dataPoints,
        borderColor: "rgb(168, 85, 247)", // Tailwind 的 purple-500
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        tension: 0.4, // 让线条变得平滑
        fill: true,
        pointBackgroundColor: "white",
        pointBorderColor: "rgb(168, 85, 247)",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 隐藏图例
      },
      title: {
        display: true,
        text: "Mood Trends Over Time",
        color: "#9ca3af", // gray-400
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          // 自定义 Y 轴刻度显示为文字而不是数字
          callback: function (value: any) {
            if (value === 1) return "Sad";
            if (value === 2) return "Anxious";
            if (value === 3) return "Calm";
            if (value === 4) return "Happy";
            return "";
          },
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(75, 85, 99, 0.2)", // gray-600 with opacity
        },
      },
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
      {moods.length > 1 ? (
        <Line data={data} options={options} />
      ) : (
        <div className="text-center text-gray-500 py-10">
          <p>Not enough data to display chart.</p>
          <p className="text-sm">Log at least 2 moods to see your trend!</p>
        </div>
      )}
    </div>
  );
};

export default MoodChart;