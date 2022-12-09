export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function sort(items, key, isAsc = true) {
  return items.sort((a, b) => {
    const compare = a[key] > b[key] ? 1 : -1;
    return isAsc ? compare : -compare;
  });
}

export function count(items, key) {
  return items.reduce((acc, { [key]: value }) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

export function sum(values) {
  return values.reduce((acc, val) => acc + val, 0);
}
