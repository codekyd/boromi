// let arrayGuy = [8,8,9,9,7,6,6]
// const getOdd = (arr) => {
//     let  array = arr.filter((v) => {
//         return arr.indexOf(v) === arr.lastIndexOf(v);
//     })
//     console.log(array);
// }
// getOdd(arrayGuy)



// function findLongestWordLength(str) {
//     let arrStr = str.split(" ");
//     let greatValue = 0
//     for(let i = 0; i <arrStr.length; i++) {
//   if(greatValue < arrStr[i].length) {
//     greatValue = arrStr[i].length;
// }
//       }
//       console.log(greatValue);
//   }
//   findLongestWordLength("The quick brown fox jumped over the lazy dog");

//   function largestOfFour(array) {
//       const largeNumberArray = [];
//       array.map((group) => {
//           let largeValue =  group.reduce((prev, current) => current > prev ? current : prev)
//           largeNumberArray.push(largeValue)
//       }
//       )
//       console.log(largeNumberArray);
//       return largeNumberArray
//   }
//   largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [-72, -3, -17, -10]]);


// fizzBuzz challenge
// function fizzBuzz(n) {
//     // Write your code here
//     for(let i =0; i < n + 1 ; i++) {

//         let value = i;

//         if(i >=3 && i % 3 === 0) {
//             value = "Fizz"
//         }
//         if(i >=5 && i % 5 === 0) {
//             value = "Buzz"
//         }
//         if( i >=3 && i % 3 === 0 && i >=5 && i % 5 === 0) {
//             value = "FizzBuzz"
//         }
//         console.log(value);
//     }

// }
// fizzBuzz(40)

// function confirmEnding(str, target) {
//     return str.slice(-target.length) === target;
//   }
//   confirmEnding("Bastian", "n");

// Repeat a string
// function repeatStringNumTimes(str, num) {
//     const repeatString = []
//     for (let i = 0; i < num; i++) {
//         repeatString.push(str)
//     }
//     return repeatString.toString().split(",").join("");
//   }
//   repeatStringNumTimes("abc", 3);


// function truncateString(str, num) {
//     console.log(num);
//     if(str.length > num) {
//         console.log(str.substring(0,num).concat("..."));
//         return str;
//     }
//     return str
//   }

//   truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length + 2)
// truncateString("A-tisket a-tasket A green and yellow basket", 8);


// function findElement(arr, func) {
//     const filteredArr = arr.filter((arrEle) => func(arrEle))
//     return filteredArr ? filteredArr[0] : undefined

//     }
//     findElement([1, 2, 3, 4], num => num % 2 === 0);





function frankenSplice(arr1, arr2, n) {
    let newArr = arr2.splice(n,0, "me")
    console.log(newArr)
  //   arr1.map((arr, index) => {
  //   index === n ? console.log(arr1.splice(n,0,"me")) : null
  //   })
  //   return arr2;
  // }
  }
  frankenSplice([1, 2, 3], [4, 5, 6], 1);