const transportation = {
  container: "Transportation",
  color: "#c62121",
  max: 1000,
  min: 0,
  step: 100,
  radius: 300,
};

const food = {
  container: "Food",
  color: "#f6d55c",
  max: 20,
  min: 0,
  step: 5,
  radius: 250,
};

const insurance = {
  container: "Insurance",
  color: "#3caea3",
  max: 10000,
  min: 0,
  step: 10,
  radius: 200,
};

const entertainment = {
  container: "Entertainment",
  color: "#20639b",
  max: 500,
  min: 0,
  step: 20,
  radius: 150,
};

const healthcare = {
  container: "Healthcare",
  color: "#843B62",
  max: 4,
  min: 0,
  step: 1,
  radius: 100,
};

let transportation_slider = new CircularSlider(transportation);
let food_slider = new CircularSlider(food);
let insurance_slider = new CircularSlider(insurance);
let entertainment_slider = new CircularSlider(entertainment);
let healthcare_slider = new CircularSlider(healthcare);
transportation_slider.drawSliders();
food_slider.drawSliders();
insurance_slider.drawSliders();
entertainment_slider.drawSliders();
healthcare_slider.drawSliders();
