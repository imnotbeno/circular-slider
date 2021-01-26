const test_options = {
  container: "sliders",
  color: "red",
  max: 1000,
  min: 0,
  step: 10,
  radius: 150,
};

const test_options1 = {
  container: "sliders",
  color: "blue",
  max: 100,
  min: 0,
  step: 5,
  radius: 80,
};

const test_options2 = {
  container: "sliders",
  color: "green",
  max: 500,
  min: 0,
  step: 20,
  radius: 100,
};

let test_slider = new CircularSlider(test_options);
test_slider.drawSliders();
let test_slider1 = new CircularSlider(test_options1);
test_slider1.drawSliders();

