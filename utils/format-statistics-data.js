import { getRandomColor } from "./colors";

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
    const row = { name: date }

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
  for(const label of labels) {
    labelsColors.push({ label, color: getRandomColor() })
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
