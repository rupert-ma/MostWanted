/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            
            //searchResults = searchByTraits(people);
            searchResults = searchByUserDefinedTrait(people);
            displayPeople(searchResults);
            while(searchResults.length > 1){
                alert("There were multiple people found, lets narrow down the search.");
                searchResults = searchByUserDefinedTrait(searchResults);
                displayPeople(searchResults); 
            } 
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * Search by traits function will search for an individual based off a given trait and return the values found.
 * @param {*} person 
 * @param {*} people 
 * @returns 
 */

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);


            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()


function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `height: ${person.height}\n`;
    personInfo += `Gender: ${person.weight}\n`;
    personInfo += `Gender: ${person.eyeColor}\n`;
    personInfo += `Gender: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding!

/**
 * 
 * 
 */

function findPersonFamily(person, people){
    //look for spouse
    //look for parent of person
    //look for other persons with same parent
    let familyArray;
    let spouseArray = getSpouse(person);
    let parentArray = getparents();
    let siblingsArray = getSiblings();
}

function getSpouse(person) {
    let spouse = person.spouse;
    let spouseFound = people.filter(function(person){
        if (person.spouse === spouse){
            return true;
        }
    })
    return spouseFound
}




/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByTraits(people){
    //use switch case to match response to option
    //filter array based off response
    let traitSearchResponse = prompt("Enter the trait you'd like to search by: ");
            switch(traitSearchResponse){
                case "gender":
                    let foundByGender = genderFilter(people);
                    return foundByGender;
                case "dob":
                    let foundByDOB = DOBFilter(people);
                    return foundByDOB;
                case "height":
                    let foundByHeigt = heightFilter(people);
                    return foundByHeigt;
                case "weight":
                    let foundByWeigt = weightFilter(people);
                    return foundByWeigt;
                case "eyeColor":
                    let foundByEyeColor = eyeColorFilter(people);
                    return foundByEyeColor;
                case "occupation":
                    let foundByOccupation = occupationFilter(people);
                    return foundByOccupation;
            };
}

function genderFilter(people){
    let foundByGender;
    let genderChoice = prompt("Enter a gender to search for: ");
    foundByGender = people.filter(function (person) {
        if (person.gender === genderChoice) {
            return true;
        }
    });
    return foundByGender;
}

function DOBFilter(people){
    let foundByDOB;
    let DOBChoice = prompt("Enter a DOB to search for: ");
    foundByDOB = people.filter(function (person) {
        if (person.dob === DOBChoice) {
            return true;
        }
    });
    return foundByDOB;
}

function heightFilter(people){
    let foundByHeigt;
    let heightChoice = parseInt(prompt("Enter a height"));
    foundByHeigt = people.filter(function(person) {
        if (person.height === heightChoice){
            return true;
        }
    })
    return foundByHeigt;
}

function weightFilter(people){
    let foundByWeigt;
    let weightChoice = parseInt(prompt("Enter a weight"));
    foundByWeigt = people.filter(function(person) {
        if (person.weight === weightChoice){
            return true;
        }
    })
    return foundByWeigt;
}

function eyeColorFilter(people){
    let foundByEyeColor;
    let eyeColorChoice = prompt("Enter an eye color");
    foundByEyeColor = people.filter(function(person) {
        if (person.eyeColor === eyeColorChoice){
            return true;
        }
    })
    return foundByEyeColor;
}

function occupationFilter(people){
    let foundByOccupation;
    let occupationChoice = prompt("Enter an occupation");
    foundByOccupation = people.filter(function(person) {
        if (person.occupation === occupationChoice){
            return true;
        }
    })
    return foundByOccupation;
}

function searchByUserDefinedTrait(people){
    let userInputProp = prompt("Enter a trait to search by");
    let userInputVal = prompt("Enter a value to search by");
    let results = people.filter(function(person){
        if (person[userInputProp] === userInputVal || +userInputVal === person[userInputProp]){
            return true;
        }
    }
    )
    return results;
}


//End of searchByTraits()