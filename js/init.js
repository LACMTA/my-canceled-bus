// canceled bus list
let listOfCanceledBuses = [];

// this is the main function that is called when the page is loaded
function main() {
    const url = './data/CancelledTripsRT.json';
    fetch(url)
    .then(response => response.json()) // get the data from the json file
    .then(data => {addData(data);}) // used to create the cards for each bus line
    .then(() => listOfCanceledBuses.forEach(bus => addBusToDiv(bus))) // used to create the bus stop buttons on the right side
    .then(()=>toggleAccordion())
    .catch(error => console.log(error));
}

function toggleAccordion() {
    let accordions = document.getElementsByClassName("usa-accordion__button")
    console.log(accordions)
    Array.from(accordions).forEach((accordion) => {
        accordion.click();
    });
}

// Step 1: Load the JSON data, filter it, and group by lines
function addData(data) {
    let defaultData = data.Employees.Employee;
    let allRoutes = groupBy(defaultData, 'TrpType');
    let regularRoutes = allRoutes.Regular;
    let groupedRegularRoutes = groupBy(regularRoutes, 'TrpRoute');
    groupedRegularRoutes = convertKeysToInt(groupedRegularRoutes);

    for (let key in groupedRegularRoutes) {
        createRoutePanels(groupedRegularRoutes[key], key);
    }
}

// Step 2: For each Route, create an accordion card 
function createRoutePanels(routeData, routeName) {
    // let panelContent = 
    let sortedRouteData = sortRouteData(routeData)
    let panel = document.createElement('div');
    panel.className = 'usa-accordion usa-accordion--bordered';
    panel.innerHTML = `
    <h2 class="usa-accordion__heading" id="accordion-heading-${routeName}">
        <button class="usa-accordion__button" aria-controls="panel-${routeName}" >
            Line ${routeName}
        </button>
    </h2>
    <div id="panel-${routeName}" class="usa-accordion__content usa-prose">
        <p>` + 
        
        loopThroughCancels(sortedRouteData) + `
        </p>
    </div>`;
    // let cleanEndTime = formatTime(routeData.TrpEndTime.trim());
    // let cleanStartTime = formatTime(routeData.TrpSrtTime.trim());
    let container = document.getElementById('accordion-routes');
    container.appendChild(panel);
}
function sortRouteData(routeData) {
    return routeData.sort((a, b) => (a.TrpSrtTime > b.TrpSrtTime) ? 1 : -1);
}


function loopThroughCancels(routeData) {
    let results = "";
    for (let key in routeData) {
        results += createCanceledTrip(routeData[key]);
    }
    return results;
}

function createCanceledTrip(trip) {
    let cleanEndTime = formatTime(trip.TrpEndTime);
    let cleanStartTime = formatTime(trip.TrpSrtTime);
    let time = `${cleanStartTime} - ${cleanEndTime}`;
    let startPlace = trip.TrpStrtPlace;
    let endPlace = trip.TrpEndPlace;
    let segment = `${startPlace} to ${endPlace}`;

    return `
    <b>${time}</b> - 
    ${segment}<br><br>
    `;
}

function sortJson(json) {
    var sorted = {};
    Object.keys(json).sort().forEach(function (key) {
        sorted[key] = json[key];
    });
    return sorted;
}

function sortTimes(times) {
    var list_of_times = times;
    
}

function groupBy(ar, key) {
    return ar.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

function convertKeysToInt(obj) {
    let newObj = {};
    for (let key in obj) {
        newObj[parseInt(key)] = obj[key];
    }
    return newObj;
}

// helper function to clean the time
function formatTime(time){
    let hour = time.slice(0, 2);
    let minute = time.slice(2, 4);
    let ampm = "AM";
    if(hour > 12){
        hour = hour - 12;
        ampm = "PM";
    }
    return `${hour}:${minute} ${ampm}`;
}

main();