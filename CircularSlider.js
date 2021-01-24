const SVG_URL = "http://www.w3.org/2000/svg";

class CircularSlider {
  constructor(options) {
    this.options = { ...options };
    this.container = document.getElementById(this.options.container);
  }

  
  updateLegend(){
      
  }


  drawSVG() {
    
    const svg = document.createElementNS(SVG_URL, "svg");
    svg.setAttribute("id", "svg_container");
    svg.setAttribute("height", 400);
    svg.setAttribute("width", 400);
    this.container.appendChild(svg);
  }
}
