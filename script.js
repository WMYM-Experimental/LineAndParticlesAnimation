const canvas = document.getElementById('canvas_1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//some important variable to change a little bit our code 
let particlesArray;
const radiusDivider = 100;
const windowDivider = 10000;
const opacityValueDivider = 25000;
const particlesMultiplier = 1;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / radiusDivider) * (canvas.width / radiusDivider)
};

class Particle { //dots or particles
    constructor (x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //draw a dot with arc function
    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#99d98c';
        ctx.fill();
    }
    
    //check dots and mouse position
    update () {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        //verificar colision y posicion de mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

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

function getSize(minRangeSize, maxRangeSize) {
  return (
    Math.floor(Math.random() * (maxRangeSize - minRangeSize)) + minRangeSize
  );
}

function getDirection() {
  return Math.random() * 5 - 2.5;
}

function init () {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / windowDivider;
    for (let i = 0; i < numberOfParticles * particlesMultiplier; i++) {
        let size = getSize(minRangeSize, maxRangeSize);                  //(Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = getDirection();
        let directionY = getDirection();
        let color = '#99d98c';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

//conect point to point depending on the distance for the opacity of the lines
function conect () {
    let opacityValue = 1;
    for (let j = 0; j < particlesArray.length; j++) {
        for (let k = j; k < particlesArray.length; k++) {
            let distance = Math.pow((particlesArray[j].x - particlesArray[k].x), 2) + Math.pow((particlesArray[j].y - particlesArray[k].y), 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / opacityValueDivider);
                ctx.strokeStyle = 'rgba(226, 236, 233,' + opacityValue + ')';
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
function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    conect();
}

init();
animate(); 
