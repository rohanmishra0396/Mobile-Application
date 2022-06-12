let array = [1, 2, 3];
let array2 = [2, 4, 5, 6, 7, 8];

console.log(
  array.filter((data) => {
    if (!array2.includes(data)) return data;
  })
);
