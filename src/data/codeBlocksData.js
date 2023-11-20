import { utilService } from "../services/util.service";
const codeBlocks = [
  {
    _id: "58",
    title: "Async Case ",
    instruction: "Create a function that resolves a promise after 2 seconds.",
    starter: `
      function delayedResolve() {
        // Your code here
      }

      // Call the function and handle the resolved promise (print the result)

    `,
    solution: `
      function delayedResolve() {
        return new Promise(resolve => setTimeout(() => resolve('Promise resolved after 2 seconds'), 2000));
      }

      // Call the function and handle the resolved promise
      delayedResolve().then(result => console.log(result)); // Prints 'Promise resolved after 2 seconds' after 2 seconds
    `,
  },
  {
    _id: "_61",
    title: " JS OOP ",
    instruction:
      "call Person that takes firstName and lastName as parameters and sets them as properties on the created object.",
    starter: `
        function Person(firstName, lastName) {
  
          // complete the code here
  
        }
  
        // Creating an instance of the Person object
        const personInstance = new Person('John', 'Doe');
        console.log(); // complete in order to get Output: John Doe
  
  
      `,
    solution: `
        // JavaScript OOP example
        function Person(firstName, lastName) {
          this.firstName = firstName;
          this.lastName = lastName;
        }
  
        // Creating an instance of the Person object
        const personInstance = new Person('John', 'Doe');
        console.log(personInstance.firstName, personInstance.lastName); // Output: John Doe
      `,
  },
  {
    _id: "_55",
    title: "Array Method Practice",
    instruction:
      "Practice using array.filter() to filter elements greater than 2 from an array of numbers.",
    starter: `
          const numbers = [1, 2, 3, 4, 5];
          const filteredNumbers // Your code here
        `,
    solution: `
          const numbers = [1, 2, 3, 4, 5];
          const filteredNumbers = numbers.filter(number => number > 2);
        `,
  },
  {
    _id: "_57",
    title: "String Method Practice",
    instruction: "Use string methods to convert a string to uppercase.",
    starter: `
          const text = 'hello, world!';
          let uppercaseText // Your code here
        `,
    solution: `
          const text = 'hello, world!';
          let uppercaseText = text.toUpperCase();
        `,
  },

  {
    _id: "63",
    title: "Conditional Statement",
    instruction:
      "Create a function to check if a number is positive, negative, or zero.",
    starter: `
          function checkNumberType(number) {
            // Your code here
          }
      
          const num = 7;
          const result = checkNumberType(num);
          console.log(result); // Output should be 'positive', 'negative', or 'zero'
        `,
    solution: `
          function checkNumberType(number) {
            if (number > 0) {
              return 'positive';
            } else if (number < 0) {
              return 'negative';
            } else {
              return 'zero';
            }
          }
      
          const num = 7;
          const result = checkNumberType(num)
          console.log(result); // Output should be 'positive', 'negative', or 'zero'
        `,
  },
  {
    _id: "60",
    title: "Array Sort",
    instruction: "Use array.sort() to sort elements in an array.",
    starter: `
      const unsortedArray = [3, 1, 4, 2, 5];
      const sortedArray // Your code here
    `,
    solution: `
      const unsortedArray = [3, 1, 4, 2, 5];
      const sortedArray = unsortedArray.sort((a, b) => a - b);
    `,
  },
];

export default codeBlocks;

utilService.saveToStorage("codeblockes", codeBlocks);
