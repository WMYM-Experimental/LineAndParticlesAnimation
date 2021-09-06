const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
const minRangeSize = 1;
let maxRangeSize = 6;
const radiusDivider = 100;
const windowDivider = 10000;
const opacityValueDivider = 25000;
let particlesMultiplier = 1;

let mouse = {
  x: undefined,
  y: undefined,
  radius: (canvas.height / radiusDivider) * (canvas.width / radiusDivider),
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDistance(x1, y1, x2, y2) {
  const xDististance = x2 - x1;
  const yDististance = y2 - y1;
  return Math.hypot(xDististance, yDististance);
}

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  //crear un punto individual con la funcion arc
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#fff"; 
    ctx.fill();
  }
  //verificar la posicion de la oarticula  y el mousemove
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    
    //verify mouse and particle distance
    let distance = getDistance(this.x, this.y, mouse.x, mouse.y);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
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

function setDirection() {
  return Math.random() * 5 - 2.5;
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / windowDivider;
  for (let i = 0; i < numberOfParticles * particlesMultiplier; i++) {
    let size = getRandomInt(minRangeSize, maxRangeSize);
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = setDirection();
    let directionY = setDirection();
    let color = "#fff";
    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

//conect point to pint depending on the distance
function conect() {
  let opacityValue = 1;
  for (let j = 0; j < particlesArray.length; j++) {
    for (let k = j; k < particlesArray.length; k++) {
      let distance =
        Math.pow(particlesArray[j].x - particlesArray[k].x, 2) +
        Math.pow(particlesArray[j].y - particlesArray[k].y, 2);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / opacityValueDivider;
        ctx.strokeStyle = "rgba(226, 236, 233," + opacityValue + ")";
        ctx.lineWidth = 1;
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
