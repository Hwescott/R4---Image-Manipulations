//I used your starter code for this project
// Luke Phillip helped with the pixelate function
let myImage;
let originalImage;

function preload() {
  originalImage = loadImage('GA.jpeg');
  myImage = loadImage('GA.jpeg');
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  // scales the image down for speed. Adjust at your own risk.   
  if (myImage.width > myImage.height) {
    originalImage.resize(width * 0.5, 0);
    myImage.resize(width * 0.5, 0);
  } else {
    originalImage.resize(0, height * 0.5);
    myImage.resize(0, height * 0.5);
  }

}

function draw() {
  image(myImage, width / 2 - myImage.width / 2, height / 2 - myImage.height / 2);
  noLoop();
}

const manipulationDispatch = {
  "p": pixelate,
  "s": saturate,
  "r": resetImage,
  "b": blueFilter
}

function keyPressed() {
  if (key in manipulationDispatch) {
    myImage.loadPixels();
    manipulationDispatch[key]();
    myImage.updatePixels();
    redraw();
  }
}

function resetImage() {
  for (let x = 0; x < myImage.width; x++) {
    for (let y = 0; y < myImage.height; y++) {
      myImage.set(x, y, originalImage.get(x, y));
    }
  }
}
function blueFilter() {
  for (let x = 0; x < myImage.width; x++) {
    for (let y = 0; y < myImage.height; y++) {
      let originalPixel = myImage.get(x, y);
      myImage.set(x, y, color(
        (235, 64, 52),
        blue - green(originalPixel),
        blue(originalPixel)))
    }
  }
};

function saturate() {
  const saturateAmount = 3;
  for (let x = 0; x < myImage.width; x++) {
    for (let y = 0; y < myImage.height; y++) {
      let originalPixel = myImage.get(x, y);
      const r = red(originalPixel);
      const g = green(originalPixel);
      const b = blue(originalPixel);
      const LUMA = (Math.min(r, g, b) + Math.max(r, g, b)) / 2
      myImage.set(x, y, color(
        r + saturateAmount * (LUMA - r),
        g + saturateAmount * (LUMA - g),
        b + saturateAmount * (LUMA - b)
      ));
    }
  }


};


function pixelate() {
  // image(originalImage, 0 , 0)
  // originalImage.loadPixels();
  for (let x = 0; x < myImage.width; x += 5) {
    for (let y = 0; y < myImage.height; y += 5) {
      let ogColor = originalImage.get(x, y);
      fill(ogColor);
      rect(x, y, 10, 10);
    }
  }
}