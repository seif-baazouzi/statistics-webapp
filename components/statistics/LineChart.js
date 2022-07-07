import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function LineChartBox({ width, height, data, labels }) {
  return (
    <LineChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 0" stroke="var(--gray)" vertical={false} />
      <XAxis dataKey="name" fontSize=".75rem" />
      <YAxis fontSize=".75rem" />
      <Tooltip />
      <Legend />
      {labels.map(({ label, color }) => <Line key={label} type="monotone" strokeWidth="2" dataKey={label} stroke={color} /> )}
    </LineChart>
  )
}