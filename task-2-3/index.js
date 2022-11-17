import bubbleSort from "./algorithms/bubbleSort.js";
import insertionSort from "./algorithms/insertionSort.js";
import mergeSort from "./algorithms/mergeSort.js";
import quickSort from "./algorithms/quickSort.js";
import selectionSort from "./algorithms/selectionSort.js";

const sortingAlgorithms = {
  "Bubble Sort": bubbleSort,
  "Insertion Sort": insertionSort,
  "Merge Sort": mergeSort,
  "Quick Sort": quickSort,
  "Selection Sort": selectionSort,
};

// --- Make test dataset ---
const arrayLength = 10000;
const arraysNumber = 5;
const dataset = createDataset({ arrayLength, arraysNumber });

// --- Test perfomance ---
const testResults = Object.values(sortingAlgorithms).map((func) =>
  measureTime({ func, dataset })
);

// --- Draw chart ---
const chartConfig = {
  type: "bar",
  options: {
    indexAxis: "y",
  },
  data: {
    labels: Object.keys(sortingAlgorithms),
    datasets: [
      {
        label: `Time to sort an array of ${arrayLength} numbers, ms`,
        data: testResults,
      },
    ],
  },
};
const chartEl = document.querySelector("#chart");
Chart.defaults.font.size = 24;
new Chart(chartEl, chartConfig);

// ----------------------------------------------------------------------------

function createDataset({ arrayLength, arraysNumber }) {
  const dataset = [];
  for (let i = 0; i < arraysNumber; i++) {
    dataset.push(new Array(arrayLength));
    for (let k = 0; k < arrayLength; k++) {
      dataset[i][k] = Math.random();
    }
  }
  return dataset;
}

function measureTime({ func, dataset }) {
  const startTime = performance.now();
  dataset.forEach(func);
  const endTime = performance.now();
  return (endTime - startTime) / dataset.length;
}
