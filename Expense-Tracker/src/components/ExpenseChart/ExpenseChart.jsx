import "./ExpenseChart.css";
import { BarChart, Bar, XAxis } from "recharts";
import PropTypes from 'prop-types'
export default function ExpenseChart({data}) {
  return (
    <BarChart
    className="ExpChart"
      width={300}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 50,
        left: 0,
        bottom: 5,
      }}
    >
      <XAxis dataKey='name' tickLine={false} axisLine={false} />
      <Bar dataKey='value' fill="#8884d8" text="name" maxBarSize={50}/>
    </BarChart>
  );
}
ExpenseChart.propTypes = {
    data: PropTypes.array.isRequired,
}
