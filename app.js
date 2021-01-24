const test_options = {
  container: "sliders",
  color: "red",
  max: 1000,
  min: 0,
  step: 10,
  radius: 100,
};

let test_slider = new CircularSlider(test_options);
console.log(test_slider.options.container);
test_slider.drawSVG();
