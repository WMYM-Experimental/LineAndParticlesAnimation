//repulsion with mouse 
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//mouse out event
window.addEventListener("mouseout",
    function () {
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

//resize event when change the screen size
window.addEventListener("resize",
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height / radiusDivider) * (canvas.width / radiusDivider);
        init();
    }
);
