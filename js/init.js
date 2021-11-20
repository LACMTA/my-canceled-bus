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
        loopThroughCancels(routeData) + `
        </p>
    </div>`;
    // let cleanEndTime = formatTime(routeData.TrpEndTime.trim());
    // let cleanStartTime = formatTime(routeData.TrpSrtTime.trim());
    let container = document.getElementById('accordion-routes');
    container.appendChild(panel);
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
    ${segment}<br>
    ${time}<br><br>
    `;
}

function sortJson(json) {
    var sorted = {};
    Object.keys(json).sort().forEach(function (key) {
        sorted[key] = json[key];
    });
    return sorted;
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

// Step 2: create the cards
// this function is used to create the cards for each bus line
function createCards(bus) {
    if(bus.TrpRoute) {
        let thisBusRoute = bus.TrpRoute;
        thisBusRoute = thisBusRoute.replace(/\s/g, '');
        
        let cleanEndTime = formatTime(bus.TrpEndTime);
        let cleanStartTime = formatTime(bus.TrpSrtTime);

        if(thisBusRoute) {

            // if the bus does not have a cancelled status, create a card
            if (listOfCanceledBuses.indexOf(thisBusRoute) === -1) {
                console.log(bus);
                listOfCanceledBuses.push(thisBusRoute);
                let card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                <div class="card-body" id=${thisBusRoute}>
                    <h5 class="card-title">${bus.TrpRoute}</h5>
                    <p class="card-text"id=${thisBusRoute}_text></p>
                </div>
                `;
                document.getElementById('canceled-buses-container').appendChild(card);
            }

            // this is for additional information per stop
            else{
                let extraContent = document.createElement('div');
                extraContent.innerHTML = `<p class="card-text">${cleanStartTime} - ${cleanEndTime}`;
                if (bus.TrpStrtPlace) {
                    extraContent.innerHTML += `${bus.TrpStrtPlace}`;
                }
                if (bus.TrpEndPlace) {
                    extraContent.innerHTML += ` - ${bus.TrpEndPlace}`;
                }
                // console.log(times)
                document.getElementById(thisBusRoute+"_text").appendChild(extraContent);
                // console.log('bus already exists')
            }
        }  
    }
}

// step 3: create the bus stop list on the right side
function addBusToDiv(busline){
    const newBusListing = document.createElement("button");
    newBusListing.id = "button"+busline;
    newBusListing.innerHTML = busline;
    const targetDiv = document.getElementById('canceledBusList');
    targetDiv.appendChild(newBusListing);
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