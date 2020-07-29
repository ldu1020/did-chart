/** @format */
var ctx = document.getElementById("myChart").getContext("2d");

const startTime = document.querySelector(".inputZone--startTime");
const endTime = document.querySelector(".inputZone--endTime");
const doingWhat = document.querySelector(".inputZone--doingWhat");
const category = document.querySelector(".inputZone--category");
const inputBtn = document.querySelector(".inputZone--inputBtn");

const listZoneWrapper = document.querySelector(".listZoneWrapper");

const dayTime = 24 * 60;

inputBtn.addEventListener("click", () => {
  createChartLsit();
  createList(startTime, endTime, doingWhat, category);
  myChart.update();
});

var myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        showLine: true,
      },
    ],
  },
  options: {
    animation: {
      duration: 2000,
    },
  },
});

function timeClac_1(time) {
  let timeValue = time.split(":");
  let hourToMinute = Number(timeValue[0]) * 60;
  let Minute = Number(timeValue[1]);
  let thisMinute = hourToMinute + Minute;
  return thisMinute;
}

function createList(startTime, endTime, doingWhat, category) {
  let chartColor = myChart.config.data.datasets[0].backgroundColor;

  createChildrenText(
    "section",
    listZoneWrapper,
    `<p><span class="listZone--startTime">${startTime.value}</span>-<span class="listZone--endTime">${endTime.value}</span></p>
    <div class="listZone--doingWhatWrapper">
    <span class="listZone--doingWhat">${doingWhat.value}</span>
    </div>
    <span class="listZone--category" style="background-color:${chartColor[chartColor.length - 1]}" >${category.value}</span>
    <button class="listZone--deleteBtn" onclick="deleteList(event)">
    <i class="fas fa-trash-alt"></i>
    </button>
    `,
    "section__listZone"
  );
}

function deleteList(event) {
  let parentNode = event.currentTarget.parentNode;

  let startTimeInList = parentNode.children[0].firstChild.textContent;
  let endTimeInList = parentNode.children[0].lastChild.textContent;

  let colorOfCategory = parentNode.children[2].style.backgroundColor;
  let datasets = myChart.config.data.datasets[0];
  let labels = myChart.config.data.labels;

  A = timeClac_1(startTimeInList);
  B = timeClac_1(endTimeInList);

  let index = B - A;

  let colorIndex = datasets.backgroundColor.indexOf(colorOfCategory);

  datasets.data[colorIndex] = datasets.data[colorIndex] - index;

  if (datasets.data[colorIndex] == 0) {
    datasets.data.splice(colorIndex, 1);
    labels.splice(colorIndex, 1);
    datasets.backgroundColor.splice(colorIndex, 1);
    datasets.borderColor.splice(colorIndex, 1);
  }

  console.log(colorIndex);

  console.log(index);
  parentNode.remove();
  myChart.update();
}

function createChildrenText(element, parent, text, classname) {
  let name = document.createElement(element);
  name.setAttribute("class", classname);
  name.innerHTML = text;
  parent.appendChild(name);
}

function pushCategory(name, index, color, borderColor) {
  let datasets = myChart.config.data.datasets[0];
  let labels = myChart.config.data.labels;

  let labelsIndex = labels.indexOf(name);

  // About Index
  if (labelsIndex > -1) {
    datasets.data[labelsIndex] += index;
    console.log("right");
  } else {
    datasets.data.push(index);
    labels.push(name);
    datasets.backgroundColor.push(color);
    datasets.borderColor.push(borderColor);
  }
}

function createChartLsit() {
  let A = timeClac_1(startTime.value);
  let B = timeClac_1(endTime.value);
  let timeDoing = B - A;

  pushCategory(category.value, timeDoing, randomColor(), randomBorderColor());
}

let randomColor = () => {
  let random = Math.floor(Math.random() * 255);

  switch (category.value) {
    case "학습":
      color = "rgba(75, 192, 192, 0.3)";
      return color;

    case "휴식":
      color = "rgba(54, 162, 235, 0.3)";
      return color;

    case "독서":
      color = "rgba(153, 102, 255, 0.3)";
      return color;

    case "취미":
      color = "rgba(255, 206, 86, 0.3)";
      return color;

    case "취침":
      color = "rgba(255, 99, 132, 0.3)";
      return color;

    default:
      color = `rgba(${random}, ${random}, ${random}, 0.3)`;
      return color;
  }
};

let randomBorderColor = () => {
  let random = Math.floor(Math.random() * (255 - 1)) + 1;

  switch (category.value) {
    case "학습":
      borderColor = "rgba(75, 192, 192, 1)";
      return borderColor;

    case "휴식":
      borderColor = "rgba(54, 162, 235, 1)";
      return borderColor;

    case "독서":
      borderColor = "rgba(153, 102, 255, 1)";
      return borderColor;

    case "취미":
      borderColor = "rgba(255, 206, 86, 1)";
      return borderColor;

    case "취침":
      borderColor = "rgba(255, 99, 132, 1)";
      return borderColor;

    default:
      borderColor = `rgba(${random}, ${random}, ${random}, 1)`;
      return borderColor;
  }
};
