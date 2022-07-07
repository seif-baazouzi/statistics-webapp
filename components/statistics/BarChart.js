import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts"

export default function BarChartBox({ width, height, data, labels }) {
  return (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 0" stroke="var(--gray)" vertical={false} />
      <XAxis dataKey="name" fontSize=".75rem" />
      <YAxis fontSize=".75rem" />
      <Tooltip />
      <Legend />
      {labels.map(({ label, color }) => <Bar key={label} dataKey={label} fill={color} /> )}
    </BarChart>
  )
}
