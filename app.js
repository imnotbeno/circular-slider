const test_options = {
  container: "sliders",
  color: "red",
  max: 1000,
  min: 0,
  step: 10,
  radius: 100,
};

const test_options1 = {
  container: "sliders",
  color: "red",
  max: 1000,
  min: 0,
  step: 10,
  radius: 150,
};

let test_slider = new CircularSlider(test_options);
test_slider.drawSliders();
// let test_slider1 = new CircularSlider(test_options1);
// test_slider1.drawSliders();
