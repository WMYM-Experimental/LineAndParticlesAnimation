const canvas = document.getElementById('canvas_1');
const ctext = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
//get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 100) * (canvas.width / 100)
};

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);
//mouse out event
window.addEventListener("mouseout",
    function () {
        mouse.x = null;
        mouse.y = null;
    }
);

//resize event when change the screen size
window.addEventListener("resize",
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height / 80) * (canvas.width / 80);
    }
);

class Particle {
    constructor (x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //create a single dot with arc function
    draw () {
        ctext.beginPath();
        ctext.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false); //to making an entire circle
        ctext.fillStyle = '#ef476f';
        ctext.fill();
    }
}
