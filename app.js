

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
	['gender',"age",'height','weight','eyecolor','occupation']);
    
    let results = [];
    switch (searchTraitType) {
        case 'gender':
            results = searchByGender(people);
            break;
        case 'age':
            results = searchByAge(people);
            break;
        case 'height':
            results = searchByHeight(people);
            break;
        case 'weight':
            results = searchByWeight(people);
            break;
        case 'eyecolor':
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
// search by gender
function searchByGender(people) {
    
    let userInputGender = prompt("What is the person's gender?");
    let newArrayGender = people.filter(function (el) {
        if(el.gender == userInputGender) {
        return true;
          }
        });
    return newArrayGender;
}
// search by age
function searchByAge(people){
    let userInputAge = prompt("What is the person's age?");
    let newArrayAge = people.filter(function (el) {
      if(el.age == userInputAge) {
        return true;
      }
    });
  
    return newArrayAge;
}

function addAgeToObject(people) {
    people = people.map(function(el){
    el.age = getAge(el.dob);
        return el;
    });
        return people;
  }
  // converting dob to age so that function can be called
  function getAge(dateElement) {
    let date1 = new Date(getCurrentDate());
    let date2 = new Date(dateElement);
    let timeDifference = Math.abs(date2.getTime() - date1.getTime());
    let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    let age = Math.floor((differentDays / 365));
    return age;
  }
  /// dob conversion for userInput
  function getCurrentDate() {
    let date = new Date();
    let currentDate = "";
    currentDate += (date.getMonth() + 1) + "/";
    currentDate += date.getDate() + "/";
    currentDate += date.getFullYear();
    return currentDate;
  }

// search by height
function searchByHeight(people) {
    let userInputHeight = prompt("What is the person's height?");
    let newArrayHeight = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });

  return newArrayHeight;
}
// search by weight
function searchByWeight(people) {
    let userInputWeight = prompt("How much does the person weigh?");
    let newArrayWeight = people.filter(function (el) {
      if(el.weight == userInputWeight) {
        return true;
      }
    });
  
    return newArrayWeight;
  }
// search by eyeColor
function searchByEyeColor(people) {
    let userInputEyeColor = prompt("What is the person's eye color?").toLowerCase();
    let newArrayEyeColor = people.filter(function (el) {
      if(el.eyeColor == userInputEyeColor) {
        return true;
      }
    });
    return newArrayEyeColor;
}
// search by occupation
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
// working on displayPeople function: used with finding family a/o descendants
function displayPeople(people){
    return people.map(function(person){
    return person.firstName + " " + person.lastName;
    }).join("\n");
  }

// filtering through to find possible family members
  function findPersonFamily (person, people) {
    let newArray = [];
    let siblings = findSiblings(person, people);
    let children = findChildren(person, people);
    let spouse = findSpouse(person, people);
    let parents = findParents(person, people);
  
    if (siblings != null) {
      for(let i = 0; i < siblings.length; i ++){
        newArray.push(siblings[i]);
      }
    }
  
    if (children != null) {
      for(let i = 0; i < children.length; i ++){
        newArray.push(children[i]);
        }
      }
  
    if (spouse != null) {
      for(let i = 0; i < spouse.length; i ++){
      newArray.push(spouse[i]);
      }
    }
  
    if (parents != null) {
      for(let i = 0; i < parents.length; i ++) {
        newArray.push(parents[i]);
      }
    }
  
    return newArray;
  }
  
  // searching for parents
  function findParents(person, people) {
    let newArrayParents = people.filter(function(el) {
        if((person.parents).includes(el.id)) {
          return true;
        }
    });
    return newArrayParents;
  }

// searching for spouse
  function findSpouse(person, people) {
    let newArraySpouse = people.filter(function(el) {
      if (el.currentSpouse == person.id) {
        return true;
      }
    });
    return newArraySpouse;
  }

  //searching for children
  function findChildren(person, people) {
    let newArrayChildren = people.filter(function(el) {
      for (let i = 0; i < el.parents.length; i++)
        if(el.parents[i] == person.id ) {
          return true;
      }
    });
    return newArrayChildren;
  }
// searching for possible siblings
  function findSiblings(person, people) {
    let newArraySiblings = people.filter(function (el) {
      for (let i = 0; i < (el.parents).length; i++) {
        if(person == el) {
          return false;
        };
        if(person.parents.includes(el.parents[i]) ) {
          return true;
      };
    };
    });
    return newArraySiblings[0];
  }

  // used to find possible descendants(children)
  function findPersonDescendants(person, people) {
    let descendants = findChildren(person, people);
    for(let i = 0; i < descendants.length; i++) {
      descendants = descendants.concat(findPersonDescendants(descendants[i], people));
    }
    return descendants;
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
            let personFamily = findPersonFamily(person, people);
            displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
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