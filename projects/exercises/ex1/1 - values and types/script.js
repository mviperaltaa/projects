/**
 * In each exercise there will be a set of changes you must make in order to receive
 * full credit. Many of the changes are obivous, or simply provide an o
 * an opportunity to practice applying concepts.
 */

// 1.1 - 1.: Set the appropriate value of the type to each of these variables.
console.log("establishing")
// 1.1
var myName = undefined // a text.
console.log(this["myName"])
// 1.2
var myBirthYear = undefined // The year
// 1.3
var myBirthMonth = undefined // The month (with 0 = January)
// 1.4
var myBirthDay = undefined // a number (The day, with 1=1)

// 1.5
var aStringWithANewline // Provide any string as long as it includes a newline
// You can either use backticks or the \n (escaped newline character)

// 1.6
var showBirthday // Assign to true

var message = ""
window.onload = () => {
  let nameElement = document.getElementById("name")
  nameElement.innerText = myName
  let birthdayElement = document.getElementById("birthdayMessage")
  let myAge = new Date(myBirthYear, myBirthMonth, myBirthDay)

  if (showBirthday) {
    let dateString = myAge.toDateString()
    let localeDateString = myAge.toLocaleDateString()
    // 1.7
    // Use concatenation to create a string that includes:
    // Replace ~variableName~ with the value of the variable (don't include ~~)
    // You were born on ~dateString~ which, locally, is written ~localeDateString~
    message = undefined // enter here
    birthdayElement.innerText = message
  }
}
