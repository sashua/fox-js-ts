export default function sort(originalArray) {
  if (originalArray.length <= 1) {
    return originalArray;
  }

  // Split array on two halves
  const middleIndex = Math.floor(originalArray.length / 2);
  const leftArray = originalArray.slice(0, middleIndex);
  const rightArray = originalArray.slice(middleIndex, originalArray.length);

  // Sort two halves of split array
  const leftSortedArray = sort(leftArray);
  const rightSortedArray = sort(rightArray);

  // Merge two sorted arrays into one
  return mergeSortedArrays(leftSortedArray, rightSortedArray);
}

function mergeSortedArrays(leftArray, rightArray) {
  const sortedArray = [];

  // Use array pointers to exclude old elements after they have been added to the sorted array
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    let minElement = null;

    // Find the minimum element between the left and right array
    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      minElement = leftArray[leftIndex];
      // Increment index pointer to the right
      leftIndex += 1;
    } else {
      minElement = rightArray[rightIndex];
      // Increment index pointer to the right
      rightIndex += 1;
    }

    // Add the minimum element to the sorted array
    sortedArray.push(minElement);
  }

  // Concatenate the remaining elements into the sorted array
  return sortedArray
    .concat(leftArray.slice(leftIndex))
    .concat(rightArray.slice(rightIndex));
}
