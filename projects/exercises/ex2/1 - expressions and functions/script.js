/**
 * EXERCISE 2-1: Expressions and Operators
 *
 * In each exercise below there will be a set of changes you must make in order to
 * receive full credit. 
 *
 * Many of the changes require writing code and provide an opportunity to apply
 * concepts. All exercises are self-grading, so if you pass all of the tests, you
 * pass the exercise.
 *
 */

/** EXAMPLE 1: */
100 // Literal values are expressions
100 + 10 // Operators form expressions (which produce values) -- 110 here
"This" + "that" // Concatenation
console.log(100 + 10)

/** 
 * EXAMPLE 2: Adds one to the parameter value 
 * @param parameter The number to add one to
*/
function addOne(parameter) {
  return parameter + 1
}
// Here is a sample function (shown in the HTML)

// LOCAL VARIABLES: These are not the same as the value inside the function.
let operandLeft = 25 // A number is being assigned to the variable 'operandLeft'.
let operandRight = 30 // Another number.

// 2-1.1 - 2-1.3:
// Expressions, Parameters, and Functions

/**
 * Sums two operands
 * @param operandLeft The left side
 * @param operandRight The left side\
 * @returns The sum of operandLeft and operandRight
 */
function sum1(operandLeft, operandRight) {
  //=======================================================================
  // EXERCISE 2-1.1: 
  // Return the sum of operandLeft and operandRight to sum1.
  return operandLeft + operandRight;
}
// SAMPLE TESTS
// Here we are using the variables to pass in their value into the function.
// Note that though they have the same name, they are DISTINCT variables.
let result = sum1(operandLeft, operandRight)
console.log("The result should be 55: " + result)

// Here, the function is being called with number literals instead of variables:
result = sum1(5, 5)
console.log(`The result should be 10: ${result}`)

// EXERCISE 2-1.2 
// Declare a function "product1" that accepts two parameters, opLeft and opRight

/**
 * Sums two operands
 * @param opLeft The left side
 * @param opRight The left side\
 * @returns The sum of operandLeft and operandRight
 */
// WRITE YOUR NEW FUNCTION HERE
function product1 (opLeft, opRight){
return opLeft * opRight
}
// This will test if the product1 is declared and a few test products are correct.
if (this["product1"] !== undefined && (typeof this["product1"] === "function")) {
  let yourProduct = this["product1"]
  let result1 = yourProduct(2, 5)
  console.log(`The result of 1*5 is ${result1}, which should be 5`)
  let result2 = yourProduct(-10, 5)
  console.log(`The result of -10*5 is ${result2}, which should be -50`)
}

//=============================================================================================
// EXERCISE 2-1.3
// Declare a function "compareAndReturn" that accepts four parameters.
// The function should return the third parameter if the first is less than the second
// Otherwise, it should return the fourth parameter. You may want to use the conditional operator:
// (expression) ? returnIfTrue : returnIfFalse
function compareAndReturn (lesser, greater, returnIfTrue, returnIfFalse) {
let returnValue
if (lesser < greater) {
  returnValue = returnIfTrue
} else {
  returnValue = returnIfFalse
}
return returnValue
}
// This will test the compareAndReturn function.
if (this["compareAndReturn"] !== undefined && (typeof this["compareAndReturn"] === "function")) {
  let yourCompare2 = this["compareAndReturn"]
  result = yourCompare2(2, 5, "Right", "Wrong")
  console.log(`Since 2 is less than 5, then the result should be ${result}, which should be Right`)
  result = yourCompare2(200, 50, "Right", "Wrong")
  console.log(`Since 200 is NOT less than 50, then the result should be ${result}, which should be Wrong`)
}