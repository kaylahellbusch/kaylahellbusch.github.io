function setup() {
  createCanvas(3000, 3000);
  background(215);
  strokeWeight(5);
  noFill();

  // noFill();
  // stroke(255, 102, 0);
  // curve(50, 260, 50, 260, 730, 240, 730, 610);
  // stroke(0);
  // curve(50, 260, 730, 240, 730, 610, 150, 650);
  // stroke(255, 102, 0);
  // makeTree([300, 300], 40);
  // makeTree([1000, 100], 80);
  // makeTree([2000, 2000], 80);
  // makeTree([2700, 500], 150);
  // makeTriangleMountain(3000, 3000, 1500);

  makeSky(3000);
  makeGround();
  makeComplexMountian(3000, 2000, 1000);
  makeTrees();
}

function makeGround() {
  fill(52, 140, 49);
  rect(0, 2000, 3000, 2000);
}

function makeTrees() {
  let numT = 35;
  let x = 1;
  for (let i = 0; i < numT; i++) {
    let p = Math.floor(numT / 8);
    if (i <= p * x && i > p * (x - 1)) {
      console.log({ i, p, x });
      makeTree(
        [
          getRandomArbitrary(0, 3000),
          getRandomArbitrary(1400 + 100 * x, 1450 + 100 * x),
        ],
        getRandomArbitrary(35 + 5 * x, 40 + 5 * x)
      );
      if (i === p * x) {
        x++;
      }
    }
  }
}

function makeSky(width) {
  noStroke();
  // drawSunset(width);
  const skies = ['sunset', 'day'];
  let num = getRandomArbitrary(0, 2);
  num <= 1 ? drawSunset(width) : drawDay(width);
}

function drawDay(width) {
  let c1 = color(176, 223, 229);
  let c2 = color(86, 196, 241);
  setGradient(0, 0, width, 2000, c2, c1);
}

function drawSunset(width) {
  let c1 = color(238, 215, 125);
  let c2 = color(227, 152, 93);
  let c3 = color(224, 99, 86);
  let c4 = color(69, 59, 89);
  let c5 = color(23, 37, 73);
  let height = 2100 / 5;
  setGradient(0, 0, width, height, c5, c4);
  setGradient(0, height, width, height, c4, c3);
  setGradient(0, height * 2, width, height, c3, c2);
  setGradient(0, height * 3, width, height, c2, c1);
}

function setGradient(x, y, w, h, c1, c2) {
  // noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function makeTriangleMountain(cWidth, cHeight, base) {
  noStroke();
  fill(250, 250, 250);
  let tWidth = getRandomArbitrary(cWidth / 3, cWidth / 1.2);
  let tHeight = getRandomArbitrary(cHeight / 4, cHeight / 2);
  let x1 = getRandomArbitrary(-cWidth / 5, cWidth - cWidth / 5);
  let x2 = getRandomArbitrary(x1 + tWidth / 4, x1 + tWidth - tWidth / 4);
  let x3 = x1 + tWidth;
  let y1 = base;
  let y2 = y1 - tHeight;
  let y3 = getRandomArbitrary(y1 - cHeight / 100, y1 + cHeight / 100);
  triangle(x1, y1, x2, y2, x3, y3);
}

function makeComplexMountian(cWidth, base, cHeight) {
  strokeWeight(30);
  fill(50);
  noStroke();
  let v = [0, 1000];
  beginShape();
  vertex(-100, 2000);
  curveVertex(v[0], v[1]);
  for (let i = 0; i < 4; i++) {
    v = [
      getRandomArbitrary(v[0] + 100, v[0] + 300),
      getRandomArbitrary(v[1] - 100, v[1] - 300),
    ];
    curveVertex(v[0], v[1]);
    v = [
      getRandomArbitrary(v[0] + 100, v[0] + 300),
      getRandomArbitrary(v[1] + 100, v[1] + 300),
    ];
    curveVertex(v[0], v[1]);
    v = [
      getRandomArbitrary(v[0] + 100, v[0] + 300),
      getRandomArbitrary(v[1] + 100, v[1] + 300),
    ];
    curveVertex(v[0], v[1]);
    v = [
      getRandomArbitrary(v[0] + 100, v[0] + 300),
      getRandomArbitrary(v[1] - 100, v[1] - 300),
    ];
    curveVertex(v[0], v[1]);
  }
  vertex(3000, 2000);
  endShape(CLOSE);
}

function makeTree(opoint, height) {
  // trunk
  stroke(123, 63, 0);
  fill(123, 63, 0);
  strokeWeight(10);
  point(opoint[0], opoint[1] + height * 8);
  rect(opoint[0] - height / 4, opoint[1] + height * 8, height / 2, height * 3);

  let oLx = [
    getRandomArbitrary(height * 1.5, height * 2.5),
    getRandomArbitrary(height * 1.5, height * 2.5),
  ];
  strokeWeight(10);
  noFill();
  for (let i = 0; i < height; i++) {
    let m = i * 4;
    let oV = [opoint[0], opoint[1] + m];
    let cY1 = oV[1] + height / 2;
    let cY2 = oV[1] + height * 2.5;
    stroke(0, getRandomArbitrary(60, 120), 0);

    // right
    let Rx = getRandomArbitrary(oV[0] + oLx[0] - 10, oV[0] + oLx[1] + 10);
    let Ry = getRandomArbitrary(oV[1] + oLx[0] - 10, oV[1] + oLx[1] + 10);
    let Rv = [Rx + i, Ry];
    let Rcx1 = opoint[0] + height * 2;
    let Rcx2 = opoint[0] + height * 5;
    curve(Rcx1, cY1, oV[0], oV[1] + m, Rv[0], Rv[1] + m, Rcx2, cY2);

    // left
    let Lx = getRandomArbitrary(oV[0] - oLx[0] - 10, oV[0] - oLx[1] + 10);
    let Ly = getRandomArbitrary(oV[1] + oLx[0] - 10, oV[1] + oLx[1] + 10);
    let Lv = [Lx - i, Ly];
    let Lcx1 = opoint[0] - height * 2;
    let Lcx2 = opoint[0] - height * 5;
    curve(Lcx1, cY1, oV[0], oV[1] + m, Lv[0], Lv[1] + m, Lcx2, cY2);
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
