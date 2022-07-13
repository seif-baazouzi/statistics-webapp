import { getRandomColor } from "./colors";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function getNameFromDate(date) {
  console.log(date.length);
  if(date.length === 10) { // month or week
    return "Day " + date.substring(8)
  }

  // year
  return months[parseInt(date)-1]
}

export function getBarChartData(statistics) {
  const labels = []
  const results = []
  let isEmpty = true

  for(const date in statistics) {
    for(const {label} of statistics[date]) {
      if(labels.indexOf(label) === -1) labels.push(label)
    }
  }

  for(const date in statistics) {
    const row = { name: getNameFromDate(date) }

    if(isEmpty && statistics[date].length !== 0) isEmpty = false

    for(const {label, sum} of statistics[date]) {
      row[label] = sum
    }

    for(const label of labels) {
      row[label] = row[label] ?? 0;
    }

    results.push(row)
  }

  const labelsColors = []
  for(let index=0; index<labels.length; index++) {
    labelsColors.push({ label: labels[index], color: getRandomColor(index) })
  }

  return [ labelsColors, results, isEmpty ]
}

export function getPieChartData(barChartData) {
  const results = []
  const [ labels, data ] = barChartData

  for(const { label, color } of labels) {
    const value = 0
    for(const row of data) {
      value += parseInt(row[label]) ?? 0
    }

    results.push({
      name: label,
      color,
      value,
    })
  }

  return results
}
