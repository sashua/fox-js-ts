export default function sort(originalArray) {
  const array = [...originalArray];

  for (let i = 0; i < array.length - 1; i += 1) {
    let minIndex = i;

    // Find minimum element in the rest of array
    for (let j = i + 1; j < array.length; j += 1) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // If new minimum element has been found then swap it with current i-th element
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  return array;
}
