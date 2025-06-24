const tabButtons = document.querySelectorAll(".tab-btn");

const units1 = [
  { name: "millimeter", symbol: "mm" },
  { name: "centimeter", symbol: "cm" },
  { name: "meter", symbol: "m" },
  { name: "kilometer", symbol: "km" },
  { name: "inch", symbol: "in" },
  { name: "foot", symbol: "ft" },
  { name: "yard", symbol: "yd" },
  { name: "mile", symbol: "mi" },
];
const units2 = [
  { name: "milligram", symbol: "mg" },
  { name: "gram", symbol: "g" },
  { name: "kilogram", symbol: "kg" },
  { name: "ounce", symbol: "oz" },
  { name: "pound", symbol: "lb" },
];
const units3 = [
  { name: "Celsius", symbol: "C" },
  { name: "Fahrenheit", symbol: "F" },
  { name: "Kelvin", symbol: "K" },
];

const converters = {
  length: {
    base: "m",
    units: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34,
    },
  },
  weight: {
    base: "g",
    units: {
      mg: 0.001,
      g: 1,
      kg: 1000,
      lb: 453.592,
      oz: 28.3495,
    },
  },
};

const form = document.getElementById("converter-form");
function createForm(units, text, category) {
  const divGroup = document.createElement("div");
  divGroup.classList.add("form-group");
  const label1 = document.createElement("label");
  label1.textContent = text;
  label1.htmlFor = "value";
  const input = document.createElement("input");
  input.type = "number";
  input.id = "value";
  input.required = true;
  divGroup.appendChild(label1);
  divGroup.appendChild(input);
  form.appendChild(divGroup);

  const selector = document.createElement("select");
  selector.name = "selector";
  selector.classList.add("unitsSelector");
  selector.id = "unitsSelector";
  selector.required = true;
  const options = units.forEach((unit) => {
    const option = document.createElement("option");
    option.text = unit.name;
    option.value = unit.symbol;
    selector.appendChild(option);
  });
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.margin = "10px";
  const label = document.createElement("label");
  label.textContent = "Unit to Convert from";
  label.htmlFor = "unitsSelector";
  div.appendChild(label);
  div.appendChild(selector);
  form.appendChild(div);

  const selector2 = document.createElement("select");
  selector2.name = "selector2";
  selector2.classList.add("unitsSelector2");
  selector2.id = "unitsSelector2";
  selector2.required = true;
  const options2 = units.forEach((unit) => {
    const option = document.createElement("option");
    option.text = unit.name;
    option.value = unit.symbol;
    selector2.appendChild(option);
  });
  const div2 = document.createElement("div");
  div2.style.display = "flex";
  div2.style.flexDirection = "column";
  div2.style.margin = "10px";
  const label2 = document.createElement("label");
  label2.textContent = "Unit to Convert to";
  label2.htmlFor = "unitsSelector2";
  div2.appendChild(label2);
  div2.appendChild(selector2);
  form.appendChild(div2);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("submit-button");
  submitBtn.textContent = "Convert";
  submitBtn.style.padding = "10px";
  form.appendChild(submitBtn);

  const previousUnit = units;
  const previousText = text;
  const previousCategory = category;

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = document.getElementById("value");
    const firstUnit = document.getElementsByClassName("unitsSelector")[0];
    const secondUnit = document.getElementsByClassName("unitsSelector2")[0];

    const result = convert(value.value, firstUnit.value, secondUnit.value, category);
    console.log(result);
    if (result) {
      console.log(result);

      form.innerHTML = "";
      const text = document.createElement("p");
      text.style.margin = "10px";
      text.textContent = "Result of your calculation";
      const resultTxt = document.createElement("h2");
      resultTxt.style.margin = "10px";
      resultTxt.textContent = `${value.value} ${firstUnit.value} = ${result} ${secondUnit.value}`;
      const resetBtn = document.createElement("button");
      resetBtn.textContent = "Reset";
      resetBtn.style.padding = "5px";
      resetBtn.addEventListener("click", () => {
        form.innerHTML = "";
        createForm(previousUnit, previousText, previousCategory);
      });
      form.appendChild(text);
      form.appendChild(resultTxt);
      form.appendChild(resetBtn);
    }
  });
}

function convert(value, fromUnit, toUnit, category) {
  if (fromUnit === toUnit) {
    alert("The units cannot be the same");
    return;
  }

  if(category === "temperature") {
    let celsius;

    if (fromUnit === "C") celsius = value;
    if (fromUnit === "F") celsius = (value - 32) * (5 / 9);
    if (fromUnit === "K") celsius = value - 273.15;

    if (toUnit === "C") return celsius;
    if (toUnit === "F") return celsius * (9 / 5) + 32;
    if (toUnit === "K") return celsius + 273.15;
  }

  const converter = converters[category];

  const fromFactor = converter.units[fromUnit];
  const toFactor = converter.units[toUnit];

  const valueBase = value * fromFactor;
  return valueBase / toFactor;
}

tabButtons.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.getAttribute("data-tabId");
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    if (tabId === "1") {
      form.innerHTML = "";
      createForm(units1, "Enter the length to convert:", "length");
    } else if (tabId === "2") {  
    form.innerHTML = "";
      createForm(units2, "Enter the weight to convert:", "weight");
    } else if (tabId === "3") {
    form.innerHTML = "";
      createForm(units3, "Enter the temperature to convert:", "temperature");
    }
  });
});

window.onload = createForm(units1, "Enter the length to convert:", "length");
