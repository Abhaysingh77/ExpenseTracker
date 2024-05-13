import "./Chart.css";
import { PieChart, Pie, Cell, Legend } from "recharts";
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
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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
export default function Chart({ data }) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={190}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={95}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend wrapperStyle={{ bottom: "95px" }} />
    </PieChart>
  );
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};
