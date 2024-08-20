function callAddParagraphs (exampleNumber) {
    let divElement = document.getElementById("example" + exampleNumber)
    let incrementBy = 5
    let nPars = document.getElementById("numParagraphs" + exampleNumber).value
    createPars(nPars, divElement, incrementBy)
}
function createPars(numParagraphs, divElement, incrementBy){
    let innerHTMLInput = ""
    let i = 0
    while (i < numParagraphs) {
        console.log(i)
        innerHTMLInput = innerHTMLInput + `<p>Paragraph ${i * incrementBy}</p>`
        i++
    }
    console.log(innerHTMLInput)
    divElement.innerHTML = innerHTMLInput
}
/*let divElement = document.getElementById("example1")
divElement.innerHTML = `
<p>Paragraph 5</p>
<p>Paragraph 10</p>
<p>Paragraph 15</p>
<p>Paragraph 20</p>`
/**
 * Exercise 2-2: Loops
 */

//=======================================================================
// EXERCISE 2-2.1: Create a function, "createPars" that takes three arguments:

// parNumber: The first is the number of paragraph elements to create

// parent: The second is element to add the elements to.

// stepSize: The third is a number that each element will iterate by. Create that
// many paragraphs, add them to the parent element. Starting at 0, add the text
// Paragraph # to each paragraph.

// So if the function was called:
// let element = document.getElementById("container")
//
// Before:
// <div id="container"/>

// After calling the function, createPars(5,element,5)
// This results in the following HTML:
// <div id="container"><p>Paragraph 0</p><p>Paragraph 5</p><p>Paragraph 10</p><p>Paragraph 15</p><p>Paragraph 20</p></div>

// Note, you can accomplish this either by using innerHTML or by dynamically creating and adding paragraph elements as children

