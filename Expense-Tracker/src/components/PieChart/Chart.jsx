import "./Chart.css";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const COLORS = ["#0088FE", "#FF8042", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Chart({ pieChartData = [] }) {
  return (
    <ResponsiveContainer width="50%" height="100%">
      <PieChart>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="90%"
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend wrapperStyle={{ bottom: "5%", left: "50%", transform: "translateX(-50%)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

Chart.propTypes = {
  pieChartData: PropTypes.array.isRequired,
};
