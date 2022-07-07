const colors = {
  start: {
    red: 0x54,
    green: 0x73,
    blue: 0xe8
  },
  end: {
    red: 0xca,
    green: 0x3e,
    blue: 0x47
  }
}

function colorGradient(fadeFraction, rgbColor1, rgbColor2) {
  const color1 = rgbColor1;
  const color2 = rgbColor2;
  const fade = fadeFraction;

  const diffRed = color2.red - color1.red;
  const diffGreen = color2.green - color1.green;
  const diffBlue = color2.blue - color1.blue;

  const gradient = {
    red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
    green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
    blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
  };

  return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
}

export function getRandomColor() {
  const randomNumber = (Math.random() + Math.random() + Math.random() + Math.random()) / 4
  return colorGradient(randomNumber, colors.start, colors.end)
}
