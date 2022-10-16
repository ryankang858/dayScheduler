document.querySelector("#currentDay");
var date = moment().format("MMMM DD, YYYY")
document.querySelector("#currentDay").textContent = date

var currentHour = moment().hour();

currentHour = 11

var timeBlocks = document.querySelectorAll(".time-block");

for (let i = 0; i < timeBlocks.length; i++) {
    const element = timeBlocks[i];

    var timeBlockHour = element.getAttribute("hour");
    var timeBlockHourNumber = parseInt(timeBlockHour)

    console.log(timeBlockHourNumber);

    if (timeBlockHourNumber < currentHour) {
        element.classList.add('past');
    } else if (timeBlockHourNumber == currentHour) {
        element.classList.add('present');
    } else {
        element.classList.add('future');
    }
}

// save button click - store local storage data
document.querySelector(".container").addEventListener("click", function (event) {
    if (event.target.className.indexOf('saveBtn') > -1) {
        console.log(event);

        // get the text
        const text = event.target.previousElementSibling.value;
        // get the selected hour
        const hour = event.target.parentElement.getAttribute('hour');
        // couple text and hour into obj
        const newData = {
            text: text.trim(),
            hour: hour
        }

        console.log(newData)

        // get the old data from the local
        const oldData = localStorage.getItem('data') || [];

        console.log(oldData);

        let parsedData = oldData.length === 0 ? [] : JSON.parse(oldData) ;

        // update the old data
        parsedData.push(newData);
        // overwrite the old data with the updated data, make sure to stirfigy into JSON
        localStorage.setItem('data', JSON.stringify(parsedData));
    }
});

// get the data 

const UIdata = localStorage.getItem('data') || [];

// parse the data 

let parsedUIData = JSON.parse(UIdata);

// loop through the data

for (let i = 0; i < parsedUIData.length; i++) {
    // match - gather materials

    const targetHour = parsedUIData[i].hour;

    const query = '[hour="' + targetHour + '"] textarea';

    document.querySelector(query).value = parsedUIData[i].text;
}