import "./ExpenseChart.css";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";
import React from "react";

const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  const radius = 10;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={radius}
        ry={radius}
      />
    </g>
  );
};

const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={8}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function ExpenseChart({ chartData = [] }) {
  return (
      <ResponsiveContainer width={300} height={250} className="chart-container">
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 10, left: 10, bottom: 85 }}
        >
          <XAxis dataKey="name" tick={<CustomXAxisTick />} tickLine={false} axisLine={false} />
          <Bar dataKey="value" fill="#8884d8" maxBarSize={15} shape={<CustomBar />} />
        </BarChart>
      </ResponsiveContainer>
  );
}

ExpenseChart.propTypes = {
  chartData: PropTypes.array.isRequired,
};
