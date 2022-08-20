let arrayStates = [];

// algorithm from https://www.geeksforgeeks.org/quick-sort/

// A utility function to swap two elements
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/* This function takes last element as pivot, places
the pivot element at its correct position in sorted
array, and places all smaller (smaller than pivot)
to left of pivot and all greater elements to right
 of pivot */
function partition(arr, low, high) {

  // pivot
  let pivot = arr[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = (low - 1);
  arrayStates.push([
    ...arr.map((value, index) => {
      return ({
        comparing: false,
        compared: index === high,
        value,
      });
    })
  ]);

  for (let j = low; j <= high - 1; j++) {

      // If current element is smaller 
      // than the pivot
      if (arr[j] < pivot) {
          // Increment index of 
          // smaller element
          i++;
          arrayStates.push([
            ...arr.map((value, index) => {
              return ({
                comparing: index === j || index === i,
                compared: index === high,
                value,
              });
            })
          ]);
          swap(arr, i, j);
          arrayStates.push([
            ...arr.map((value, index) => {
              return ({
                comparing: index === j || index === i,
                compared: index === high,
                value,
              });
            })
          ]);
      }
  }
  arrayStates.push([
    ...arr.map((value, index) => {
      return ({
        comparing: index === high || index === i + 1,
        compared: false,
        value,
      });
    })
  ]);
  swap(arr, i + 1, high);
  arrayStates.push([
    ...arr.map((value, index) => {
      return ({
        comparing: index === high || index === i + 1,
        compared: false,
        value,
      });
    })
  ]);
  return (i + 1);
}

export const quickSort = (array) => {
  arrayStates = []
  const newArray = [...array];

  /* The main function that implements QuickSort
        arr[] --> Array to be sorted,
        low --> Starting index,
        high --> Ending index
*/
  const getQuickSort = (arr, low, high) => {
    if (low < high) {

        // pi is partitioning index, arr[p]
        // is now at right place 
        let pi = partition(arr, low, high);

        // Separately sort elements before
        // partition and after partition
        getQuickSort(arr, low, pi - 1);
        getQuickSort(arr, pi + 1, high);
    } else {
      return;
    }
  }

  getQuickSort(newArray, 0, newArray.length - 1);

  arrayStates.push([
    ...newArray.map((value) => {
      return ({
        comparing: false,
        compared: true,
        value,
      });
    })
  ]);

  return arrayStates;
};
