//mouse repulsion function
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

//mouse out event "no repultion"
window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

//resize event when the screen size changes
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

//add more particles with clicks 2 each click
window.addEventListener("click", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    let radius = getRandomNumber(minRangeSize, maxRangeSize);

    let directionX = getRandomNumber(-2, 2);
    let directionY = getRandomNumber(-2, 2);

    let color = "#fff";

    particlesArray.push(
      new Particle(mouse.x, mouse.y, directionX, directionY, radius, color),
      new Particle(mouse.x, mouse.y, -directionX, -directionY, radius, color),
      new Particle(mouse.x, mouse.y, directionX, -directionY, radius, color),
      new Particle(mouse.x, mouse.y, -directionX, directionY, radius, color)
    );
});

//delete particles with space bar
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    particlesArray.pop();
  }
});
