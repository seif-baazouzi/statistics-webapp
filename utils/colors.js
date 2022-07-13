const colors = [
  "#5473e8",
  "#ca3e47",
  "#2ba3f3",
  "#c76c72",
  "#273463",
  "#914d51",
  "#3d445f",
  "#c96c72",
  "#7582b4",
  "#d89ea2",
]

export function getRandomColor(index) {
  return colors[index % colors.length];
}
