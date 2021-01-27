const SVG_URL = "http://www.w3.org/2000/svg";

class CircularSlider {
  constructor(options) {
    this.options = options;
    this.container = document.getElementById(this.options.container);
    this.svgContainerSize = 700;
    this.cx = this.svgContainerSize / 2;
    this.cy = this.svgContainerSize / 2;
    this.pathWidth = 30;
    this.isMouseDown = false;
  }

  drawSliders() {
    //get svg container
    const svgContainer = document.getElementById("svg_container");

    //Slider background circle
    this.drawCircle(this.options, svgContainer);

    //Slider progress path
    this.drawSliderPath(this.options, 0, svgContainer);

    //Draw handle
    this.drawHandle(this.options.radius, 0, svgContainer);

    //Svg container event listeners
    this.eventListeners();
  }

  //********EVENT LISTENERS********//

  eventListeners() {
    let circle = document.getElementById(this.options.container);
    let handle = document.getElementById(this.options.container + "_handle");
    let path = document.getElementById(this.options.container + "_path");
    let svgContainer = document.getElementById("svg_container");

    //click event listener
    circle.addEventListener("mousedown", this.handleMouseDown.bind(this));
    handle.addEventListener("mousedown", this.handleMouseDown.bind(this));
    path.addEventListener("mousedown", this.handleMouseDown.bind(this));

    //touch event listener
    circle.addEventListener("touchstart", this.handleMouseDown.bind(this));
    handle.addEventListener("touchstart", this.handleMouseDown.bind(this));
    path.addEventListener("touchstart", this.handleMouseDown.bind(this));

    //event listener while moving cursor
    circle.addEventListener("mousemove", this.handleMouseDrag.bind(this));
    handle.addEventListener("mousemove", this.handleMouseDrag.bind(this));
    path.addEventListener("mousemove", this.handleMouseDrag.bind(this));

    //event listener while moving finger
    circle.addEventListener("touchmove", this.handleMouseDrag.bind(this));
    handle.addEventListener("touchmove", this.handleMouseDrag.bind(this));
    path.addEventListener("touchmove", this.handleMouseDrag.bind(this));

    //event listener when mouse is up or when finger removed from screen
    svgContainer.addEventListener("mouseup", this.handleMouseStop.bind(this));
    svgContainer.addEventListener("touchend", this.handleMouseStop.bind(this));
  }

  //********EVENT HANDLERS********//

  handleMouseDown(event) {
    if (this.isMouseDown) return;

    //set that mouse/touch is down
    this.isMouseDown = true;
    let mouseAngle = this.calculateCursorAngle(event);

    //Draw slider progress
    const progressPath = document.getElementById(
      this.options.container + "_path"
    );
    progressPath.setAttribute(
      "d",
      this.calculatePath(this.cx, this.cy, this.options.radius, 0, mouseAngle)
    );

    //Draw new handle position
    const handle = document.getElementById(this.options.container + "_handle");
    const handleCenter = this.polarToCartesian(
      this.cx,
      this.cy,
      this.options.radius,
      mouseAngle
    );
    handle.setAttribute("cx", handleCenter.x);
    handle.setAttribute("cy", handleCenter.y);

    this.updateLegend(this.options, mouseAngle);
  }

  handleMouseDrag(event) {
    if (!this.isMouseDown) return;

    let mouseAngle = this.calculateCursorAngle(event);

    //Slider progress when dragging
    const progressPath = document.getElementById(
      this.options.container + "_path"
    );
    progressPath.setAttribute(
      "d",
      this.calculatePath(this.cx, this.cy, this.options.radius, 0, mouseAngle)
    );

    //Handle drag
    const handle = document.getElementById(this.options.container + "_handle");
    const handleCenter = this.polarToCartesian(
      this.cx,
      this.cy,
      this.options.radius,
      mouseAngle
    );
    handle.setAttribute("cx", handleCenter.x);
    handle.setAttribute("cy", handleCenter.y);

    this.updateLegend(this.options, mouseAngle);
  }

  handleMouseStop() {
    //Mouse is up or finger has stopped touching screen
    if (!this.isMouseDown) return;
    this.isMouseDown = false;
  }

  //********LEGEND********//

  updateLegend(opts, currentAngle) {
    let targetLegend = document.getElementById(opts.container + "-amount");

    //Calculate value
    let range = opts.max - opts.min;
    let progressArcLength = (range * currentAngle) / 360;
    let noSteps = Math.round(progressArcLength / opts.step);
    let currentAmount = opts.min + noSteps * opts.step;
    targetLegend.innerHTML = currentAmount;
  }

  //********DRAW FUNCTIONS********//

  //Draw svg path
  drawSliderPath(opts, angle, svg) {
    const path = document.createElementNS(SVG_URL, "path");

    //Calculate path
    path.setAttribute("id", opts.container + "_path");
    path.setAttribute(
      "d",
      this.calculatePath(this.cx, this.cy, opts.radius, 0, angle)
    );
    path.setAttribute("stroke", opts.color);
    path.setAttribute("stroke-width", this.pathWidth);
    path.setAttribute("fill", "none");
    svg.appendChild(path);
  }

  //Draw circle for bottom of slider
  drawCircle(opts, svg) {
    const circle = document.createElementNS(SVG_URL, "circle");
    circle.setAttribute("id", opts.container);
    circle.setAttribute("cx", this.cx);
    circle.setAttribute("cy", this.cy);
    circle.setAttribute("r", opts.radius);
    circle.setAttribute("stroke", "#d1d1cf");
    circle.setAttribute("stroke-width", 30);
    circle.setAttribute("fill", "none");
    svg.appendChild(circle);
  }

  //Draw handle and calculate its coordinates
  drawHandle(slider_radius, angle, svg) {
    //calculate handle coordinates
    let coordinates = this.polarToCartesian(
      this.cx,
      this.cy,
      slider_radius,
      angle
    );

    const handle = document.createElementNS(SVG_URL, "circle");
    handle.setAttribute("id", this.options.container + "_handle");
    handle.setAttribute("cx", coordinates.x);
    handle.setAttribute("cy", coordinates.y);
    handle.setAttribute("r", this.pathWidth / 2);
    handle.setAttribute("stroke", "#353336");
    handle.setAttribute("stroke-width", 2);
    handle.setAttribute("fill", "grey");
    svg.appendChild(handle);
  }

  //********CALCULATIONS********//

  //Method for calculating active paths
  calculatePath(x, y, r, startangle, endangle) {
    //Convert start/end angles to cartesian to get coordinates
    let start = this.polarToCartesian(x, y, r, endangle);
    let end = this.polarToCartesian(x, y, r, startangle);
    let direction;

    if (endangle - startangle <= 180) {
      direction = 0;
    } else {
      direction = 1;
    }

    //array for drawing SVG path
    let d = ["M", start.x, start.y, "A", r, r, 0, direction, 0, end.x, end.y];

    //join array into string
    let path = d.join(" ");
    return path;
  }

  //polar to cartesian converter
  polarToCartesian(cx, cy, r, angleDegrees) {
    let angleInRad = ((angleDegrees - 90) * Math.PI) / 180;
    let x = cx + r * Math.cos(angleInRad);
    let y = cy + r * Math.sin(angleInRad);
    return { x, y };
  }

  calculateCursorPosition(event) {
    //Get svg dimensions and position relative to viewport
    let svgContainer = document
      .getElementById("svg_container")
      .getBoundingClientRect();

    let clientX, clientY;

    if (event.changedTouches) {
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    let x = clientX - svgContainer.left;
    let y = clientY - svgContainer.top;

    return { x, y };
  }

  calculateCursorAngle(event) {
    //Get cursor coordinates
    let coordinates = this.calculateCursorPosition(event);
    let x = coordinates.x;
    let y = coordinates.y;
    let angleDeg;

    //distance from center to position
    let dx = x - this.cx;
    let dy = y - this.cy;

    //angle in rad
    let angleRad = Math.atan2(dx, -dy);

    //convert rad to degree
    let angle = (angleRad * 180) / Math.PI;

    if (angle < 0) {
      angleDeg = angle + 360;
    } else {
      angleDeg = angle;
    }

    return angleDeg;
  }
}
