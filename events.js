//resize event whrn change the size screen
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius =
    (canvas.height / radiusDivider) * (canvas.width / radiusDivider);
  init();
});

//mouse out event
window.addEventListener("mouseout", function () {
  mouse.x = null;
  mouse.y = null;
});

//mouse repulsion function
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

//add more particles with clicks
window.addEventListener("click", function (event) {
  let size = setSize(minRangeSize, maxRangeSize);
  let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
  let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
  let directionX = setDirection();
  let directionY = setDirection();
  let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  particlesArray.push(
    new Particle(mouse.x, mouse.y, directionX, directionY, size, color),
    new Particle(-mouse.x, mouse.y, =directionX, directionY, size, color),
    new Particle(mouse.x, -mouse.y, directionX, -directionY, size, color)
  );
});

//delete particles with space bar
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    particlesArray.pop();
  }
});
