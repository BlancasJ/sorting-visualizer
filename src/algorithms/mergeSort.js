let arrayStates = [];

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr, l, m, r) {
  const n1 = m - l + 1;
  const n2 = r - m;

  // Create temp arrays
  const L = new Array(n1); 
  const R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++)
      L[i] = arr[l + i];
  for (let j = 0; j < n2; j++)
      R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arrayStates.push([
        ...arr.map((value, index) => {
          return ({
            comparing: index === k || index === i + l,
            compared: false,
            value,
          });
        })
      ]);
      arr[k] = L[i];
      arrayStates.push([
        ...arr.map((value, index) => {
          return ({
            comparing: index === k || index === i + l,
            compared: false,
            value,
          });
        })
      ]);
      i++;
    }
    else {
      arrayStates.push([
        ...arr.map((value, index) => {
          return ({
            comparing: index === k || index === j + m + l,
            compared: false,
            value,
          });
        })
      ]);
      arr[k] = R[j];
      arrayStates.push([
        ...arr.map((value, index) => {
          return ({
            comparing: index === k || index === j + m + l,
            compared: false,
            value,
          });
        })
      ]);
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arrayStates.push([
      ...arr.map((value, index) => {
        return ({
          comparing: index === k || index === i + l,
          compared: false,
          value,
        });
      })
    ]);
    arr[k] = L[i];
    arrayStates.push([
      ...arr.map((value, index) => {
        return ({
          comparing: index === k || index === i + l,
          compared: false,
          value,
        });
      })
    ]);
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arrayStates.push([
      ...arr.map((value, index) => {
        return ({
          comparing: index === k || index === j + m + l,
          compared: false,
          value,
        });
      })
    ]);
    arr[k] = R[j];
    arrayStates.push([
      ...arr.map((value, index) => {
        return ({
          comparing: index === k || index === j + m + l,
          compared: false,
          value,
        });
      })
    ]);
    j++;
    k++;
  }
}

export const mergeSort = (array) => {
  const newArray = [...array]
  arrayStates = [];

  // l is for left index and r is
  // right index of the sub-array
  // of arr to be sorted */
  const getMergeSort = (arr, l, r) => {
    if(l >= r){
      return;//returns recursively
    }
    let m = l + parseInt((r - l) / 2);
    getMergeSort(arr, l, m);
    getMergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  };

  getMergeSort(newArray, 0, newArray.length - 1);

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
