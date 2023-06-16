

function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            //! TODO
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}


function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}


//search by Trait function//
function searchByTraits(people){

    const searchTraitType = validatedPrompt('Please enter the particular trait to search for.',
	['gender','height','weight','eyeColor','occupation']);
    
    let results = [];
    switch (searchTraitType) {
        case 'gender':
            results = searchByGender(people);
            break;
        case 'height':
            results = searchByHeight(people);
            break;
        case 'weight':
            results = searchByWeight(people);
            break;
        case 'eyeColor':
            results = searchByEyeColor(people);
            break;
        case 'occupation':
            results = searchByOccupation(people);
            break;
        default:
            return searchByTraits(people);
    }

    return results;
}

function searchByGender(people) {
    
    let userInputGender = prompt("What is the person's gender?");
    let newArrayGender = people.filter(function (el) {
        if(el.gender == userInputGender) {
        return true;
          }
        });
    return newArrayGender;
}

function searchByHeight(people) {
    let userInputHeight = prompt("What is the person's height?");
    let newArrayHeight = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });

  return newArrayHeight;
}

function searchByWeight(people) {
    let userInputWeight = prompt("How much does the person weigh?");
    let newArrayWeight = people.filter(function (el) {
      if(el.weight == userInputWeight) {
        return true;
      }
    });
  
    return newArrayWeight;
  }

function searchByEyeColor(people){
    let userInputEyeColor = prompt("What is the person's eye color?");
    let newArrayEyeColor = people.filter(function (el) {
      if(el.eyeColor == userInputEyeColor) {
        return true;
      }
    });
    return newArrayEyeColor;
}

function searchByOccupation(people){
    let userInputOccupation = prompt("What is the person's occupation?").toLowerCase();
    let newArrayOccupation = people.filter(function (el) {
      if(el.occupation == userInputOccupation) {
        return true;
      }
    });
  
    return newArrayOccupation;
}


  








function displayPersonInfo(person) {
    let personInfo = `First Name: ${person.firstName} \n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Birth Date: ${person.dob}\n`;
    personInfo += `Height: ${person.height}in \n`;
    personInfo += `Weight: ${person.weight}lbs \n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    alert(personInfo);

}



function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            // let personFamily = findPersonFamily(person, people);
            // displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            // let personDescendants = findPersonDescendants(person, people);
            // displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}