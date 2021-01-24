const SVG_URL = "http://www.w3.org/2000/svg";

class CircularSlider {
  constructor(options) {
    this.options = options;
    this.container = document.getElementById(this.options.container);
    this.svgContainerSize = 400;
    this.cx = this.svgContainerSize / 2;
    this.cy = this.svgContainerSize / 2;
    this.pathWidth = 3;
  }

  drawSliders() {
    //Svg container
    this.drawSVGcontainer();

    //Background path
    const svgContainer = document.getElementById("svg_container");
    this.drawSliderPath(this.options, svgContainer);

  }

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

    path.setAttribute(
      "d",
      this.calculatePath(this.cx, this.cy, opts.radius, 0, 359)
    );
    path.setAttribute("stroke", opts.color);
    path.setAttribute("stroke-width", this.pathWidth);
    path.setAttribute("fill", "none");
    svg.appendChild(path);
  }

  //Method for calculating background and active paths
  calculatePath(x, y, r, startangle, endangle) {

    //Convert start/end angles to cartesian to get coordinates
    let start = this.polarToCartesian(x, y, r, endangle);
    let end = this.polarToCartesian(x, y, r, startangle);
    let direction;

    if (endangle - startangle <= 180) {
      direction = 1;
    } else {
      direction = 0;
    }

    //array for drawing SVG path
    let d = ["M", start.x, start.y, "A", r, r, 0, direction, 0, end.x, end.y];

    //join array into string
    let path = d.join(" ");
    return path;
  }

  //polar to cartesian converter
  polarToCartesian(cx, cy, r, angleDegrees) {
    let angleInRad = (angleDegrees * Math.PI) / 180;
    let x = cx + r * Math.cos(angleInRad);
    let y = cy + r * Math.sin(angleInRad);
    return { x, y };
  }
}
