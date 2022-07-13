import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts"

export default function PieCharBox({ width, height, data }) {  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fontSize=".75rem" fill="var(--white)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <PieChart width={width} height={width+height}>
      <Tooltip />
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={width/2}
        label={renderCustomizedLabel}
      >
        {data.map(entry => <Cell key={entry.name} fill={entry.color} />)}
      </Pie>
      <Legend />
    </PieChart>
  )
}
