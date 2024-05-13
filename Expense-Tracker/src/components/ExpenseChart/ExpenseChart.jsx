import "./ExpenseChart.css";
import { BarChart, Bar, XAxis } from "recharts";
import PropTypes from 'prop-types'
export default function ExpenseChart({data}) {
  return (
    <BarChart
    className="ExpChart"
      width={0}
      height={300}
      data={data}
    >
      <XAxis dataKey='name' tickLine={false} axisLine={false} />
      <Bar className="bars" dataKey='value' fill="#8884d8" text="name" barSize={30}/>
    </BarChart>
  );
}
ExpenseChart.propTypes = {
    data: PropTypes.array.isRequired,
}
