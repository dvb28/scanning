// Create function binary search in array
export const binarySearch = async (arr, value) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let midValue = arr[mid].id;

    if (midValue === value) {
      return mid;
    } else if (midValue < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
};
