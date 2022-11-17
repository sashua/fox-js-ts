export default function sort(originalArray) {
  const array = [...originalArray];

  // Flag that holds info about whether the swap has occur or not
  let swapped = false;

  for (let i = 1; i < array.length; i += 1) {
    swapped = false;

    for (let j = 0; j < array.length - i; j += 1) {
      // Swap elements if they are in wrong order
      if (array[j + 1] < array[j]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // Register the swap
        swapped = true;
      }
    }

    // If there were no swaps then array is already sorted
    if (!swapped) {
      return array;
    }
  }

  return array;
}
