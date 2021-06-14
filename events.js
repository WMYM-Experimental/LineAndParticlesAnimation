//init again with the new size browser
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
//add more particles with clicks
window.addEventListener("mousemove", function (event) {
  let size = getSize(minRangeSize, maxRangeSize);
  let x = event.x;
  let y = event.y;
  let directionX = getDirection();
  let directionY = getDirection();
  let color = "#000000";
  particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
}); //TODO : delete the partciles a few time later they were created IMPORTANT

//delete particles with spacebar
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    particlesArray.pop();
  }
});
