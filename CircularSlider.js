const SVG_URL = "http://www.w3.org/2000/svg";

class CircularSlider {
  constructor(options) {
    this.options = options;
    this.container = document.getElementById(this.options.container);
    this.svgContainerSize = 400;
    this.cx = this.svgContainerSize / 2;
    this.cy = this.svgContainerSize / 2;
    this.pathWidth = 30;
  }

  drawSliders() {
    //Svg container
    this.drawSVGcontainer();

    //Background path
    const svgContainer = document.getElementById("svg_container");

    // this.drawSliderPath(this.options, svgContainer);
    this.drawCircle(this.options, svgContainer);

    //Draw handle
    this.drawHandle(this.options.radius, 0, svgContainer);

    //Svg container event listeners
    this.eventListeners();
  }

  //********EVENT LISTENERS********//

  eventListeners() {
    let element = document.getElementById("slider_circle");

    //click event listener
    element.addEventListener("mousedown", this.handleMouseDown.bind(this));
    //touch event listener
    // element.addEventListener("touchstart", this.calculateCursorPosition);
    // //event listener while moving cursor
    // element.addEventListener("mousemove", this.calculateCursorPosition);
    // //event listener while moving finger
    // element.addEventListener("touchmove", this.calculateCursorPosition);
  }

  handleMouseDown(event) {
    // let coordinates = this.calculateCursorPosition(event);
    // console.log(coordinates.x);
    // console.log(coordinates.y);
    let mouse_angle = this.calculateCursorAngle(event);
    console.log(mouse_angle);
  }

  //********DRAW FUNCTIONS********//

  //Draw svg conatiner
  drawSVGcontainer() {
    const svg = document.createElementNS(SVG_URL, "svg");
    svg.setAttribute("id", "svg_container");
    svg.setAttribute("height", this.svgContainerSize);
    svg.setAttribute("width", this.svgContainerSize);
    this.container.appendChild(svg);
  }

  //Draw svg path
  drawSliderPath(opts, svg) {
    const path = document.createElementNS(SVG_URL, "path");

    //Calculate path
    path.setAttribute("id", "slider_path");
    path.setAttribute(
      "d",
      this.calculatePath(this.cx, this.cy, opts.radius, 0, 359)
    );
    path.setAttribute("stroke", opts.color);
    path.setAttribute("stroke-width", this.pathWidth);
    path.setAttribute("fill", "none");
    svg.appendChild(path);
  }

  //Draw circle for bottom of slider
  drawCircle(opts, svg) {
    const circle = document.createElementNS(SVG_URL, "circle");
    circle.setAttribute("id", "slider_circle");
    circle.setAttribute("cx", this.cx);
    circle.setAttribute("cy", this.cy);
    circle.setAttribute("r", opts.radius);
    circle.setAttribute("stroke", "grey");
    circle.setAttribute("stroke-width", 10);
    circle.setAttribute("fill", "none");
    svg.appendChild(circle);
  }

  //Draw handle and calculate its coordinates
  drawHandle(r, angle, svg) {
    //calculate handle coordinates
    let coordinates = this.polarToCartesian(this.cx, this.cy, r, angle);

    const handle = document.createElementNS(SVG_URL, "circle");
    handle.setAttribute("id", "slider_handle");
    handle.setAttribute("cx", coordinates.x);
    handle.setAttribute("cy", coordinates.y);
    handle.setAttribute("r", this.pathWidth / 2);
    handle.setAttribute("stroke", "black");
    handle.setAttribute("stroke-width", 5);
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

    let x = event.clientX - svgContainer.left;
    let y = event.clientY - svgContainer.top;

    return { x, y };
  }

  calculateCursorAngle(event) {
    //Get cursor coordinates
    let coordinates = this.calculateCursorPosition(event);
    let x = coordinates.x;
    let y = coordinates.y;
    let angle_deg;

    //distance from center to position
    let dx = x - this.cx;
    let dy = y - this.cy;

    //angle in rad
    let angle_rad = Math.atan2(dx, -dy);

    //convert rad to degree
    let angle = (angle_rad * 180) / Math.PI;

    if (angle < 0) {
      angle_deg = angle + 360;
    } else {
      angle_deg = angle;
    }

    return { angle_deg, angle_rad };
  }
}