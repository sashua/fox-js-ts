export default function sort(originalArray) {
  const array = [...originalArray];

  for (let i = 1; i < array.length; i += 1) {
    let currentIndex = i;

    // Check if previous element is greater than current element
    while (
      array[currentIndex - 1] !== undefined &&
      array[currentIndex] < array[currentIndex - 1]
    ) {
      // Swap the elements
      [array[currentIndex - 1], array[currentIndex]] = [
        array[currentIndex],
        array[currentIndex - 1],
      ];

      // Shift current index left
      currentIndex -= 1;
    }
  }

  return array;
}
