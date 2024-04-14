/* Ensures that any JS code that relies on DOM elements and external data files doesn't run until the HTML document is fully loaded! */
document.addEventListener("DOMContentLoaded", (event) => {
  fetch("./people.json")
    .then((response) => response.json())
    .then((data) => {
      const peopleContainer = document.getElementById("peopleContainer");

      if (!peopleContainer) {
        throw new Error("The people container element was not found.");
      }

      // Clear out any placeholder content
      peopleContainer.innerHTML = "";

      // Process each person in the fetched data
      data.forEach((person) => {
        // Create a container for the person's info and image
        let theSpotlight = document.createElement("div");
        theSpotlight.className = "person";

        // Sends personal description to the console
        console.log(describePerson(person));

        // Calculate age based on the birthday
        let age = calculateAge(person.birthday);

        // Calculate net income assuming a tax rate of 15%
        let netIncome = calculateNetIncome(person.salary);

        // Add the person's data to the container
        theSpotlight.innerHTML = `
            <div>
              <h1>${person.fname} ${person.lname}</h1>
              <p>Gender: ${person.gender}</p>
              <p>Age: ${age} years old</p>
              <p>Status: ${person.status}</p>
              <p>Salary: $${person.salary.toLocaleString()}</p>
              <p>Net Income: $${netIncome.toLocaleString()}</p>
              <p>Strength: ${person.attributes.strength}</p>
              <p>Wit: ${person.attributes.wit}</p>
              <p>Catchphrase: "${person.catchphrase}"</p>
            </div>            
          `;

        // Append the person container to the people container section
        peopleContainer.appendChild(theSpotlight);
      });
    })
    .catch((error) => {
      console.error("Couldn't grab the data. Time for plan B.", error);
    });
});

function calculateAge(birthday) {
  // birthday is a date string in the format "MM/DD/YYYY"
  const birthdayDate = new Date(birthday);
  const ageDifMs = Date.now() - birthdayDate.getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function calculateNetIncome(salary) {
  const taxRate = 0.15; // 15% tax rate
  return salary - salary * taxRate;
}

function describePerson(person) {
  let age = calculateAge(person.birthday);
  return `${person.fname} ${person.lname} is a ${age}-year-old ${person.status} known for being ${person.attributes.strength} and signature remarks like "${person.catchphrase}"`;
}
