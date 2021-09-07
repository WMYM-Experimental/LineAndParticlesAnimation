const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let numberOfParticles = 0;

const minRangeSize = 1;
let maxRangeSize = 5;

const windowDivider = 10000;

const opacityValueDivider = 25000;

let particlesMultiplier = 1; //increase number of particles

let mouse = {
  x: undefined,
  y: undefined,
  radius: 100,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function getDistance(x1, y1, x2, y2) {
  const xDististance = x2 - x1;
  const yDististance = y2 - y1;
  return Math.hypot(xDististance, yDististance);
}

class Particle {
  constructor(x, y, directionX, directionY, radius, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.radius = radius;
    this.color = color;
  }

  //draw a single particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }

  //collition detection
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    //verify mouse and particle distance
    let distance = getDistance(this.x, this.y, mouse.x, mouse.y);

    if (distance < mouse.radius + this.radius) {
      if (mouse.x < this.x && this.x < canvas.width - this.radius * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.radius * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.radius * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.radius * 10) {
        this.y -= 10;
      }
    }

    //move particle
    this.x += this.directionX;
    this.y += this.directionY;

    //draw particlesArray
    this.draw();
  }
}

function init() {
  particlesArray = [];
  numberOfParticles = (canvas.height * canvas.width) / windowDivider;

  for (let i = 0; i < numberOfParticles * particlesMultiplier; i++) {
    let radius = getRandomInt(minRangeSize, maxRangeSize);

    let x = getRandomNumber(radius, canvas.width - radius); //need to change this
    let y = getRandomNumber(radius, canvas.height - radius); //need to change this

    let directionX = getRandomNumber(-2, 2);
    let directionY = getRandomNumber(-2, 2);

    let color = "#fff";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, radius, color)
    );
  }
}

//conect point to point depending on the distance
function conect() {
  let opacityValue = 1;
  for (let j = 0; j < particlesArray.length; j++) {
    for (let k = j; k < particlesArray.length; k++) {
      let distance =
        Math.pow(particlesArray[j].x - particlesArray[k].x, 2) +
        Math.pow(particlesArray[j].y - particlesArray[k].y, 2);

      if (distance < Math.pow(2000 / 7, 2)) {
        //the number seven here was consider on try and error
        opacityValue = 1 - distance / opacityValueDivider;
        ctx.strokeStyle = "rgba(226, 236, 233," + opacityValue + ")";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particlesArray[j].x, particlesArray[j].y);
        ctx.lineTo(particlesArray[k].x, particlesArray[k].y);
        ctx.stroke();
      }
    }
  }
}

//animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); //refresh canvas
  particlesArray.forEach((ptcl) => {
    ptcl.update();
  });
  conect();
}

init();
animate();
