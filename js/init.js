// canceled bus list
let listOfCanceledBusses = [];

// this is the main function that is called when the page is loaded
function main(){
    const url = './data/CancelledTripsRT.json'
    fetch(url)
    .then(response => response.json()) // get the data from the json file
    .then(data => {addData(data)}) // used to create the cards for each bus line
    .then(() => listOfCanceledBusses.forEach(bus => addBusToDiv(bus))) // used to create the bus stop buttons on the right side
    .catch(error => console.log(error))
}

// Step 1: data into the cards
function addData(data){
    let defaultData = data.Employees.Employee
    // console.log(defaultData)
    defaultData.forEach(createCards)
}

// Step 2: create the cards
// this function is used to create the cards for each bus line
function createCards(bus){
    if(bus.TrpRoute){
        let thisBusRoute = bus.TrpRoute
        thisBusRoute = thisBusRoute.replace(/\s/g, '')
        
        // let thisBusNumber = bus.BusNumber
        // console.log(thisBusRoute)
        var cleanEndTime = formatTime(bus.TrpEndTime)
        var cleanStartTime = formatTime(bus.TrpSrtTime)
        if(thisBusRoute){
            let times = bus.TrpSrtTime
            // time = times.split(';')
            time = times
            console.log(time)
            var cleantime = formatTime(time)
            console.log(cleantime)
            // console.log(""+time.slice(0, 2))
            // console.log(":"+time.slice(2, 4))
            // if the bus does not have a cancelled status, create a card
            if (listOfCanceledBusses.indexOf(thisBusRoute) === -1){
                console.log(bus)
                listOfCanceledBusses.push(thisBusRoute)
                let card = document.createElement('div')
                card.className = 'card'
                card.innerHTML = `
                <div class="card-body" id=${thisBusRoute}>
                    <h5 class="card-title">${bus.TrpRoute}</h5>
                    <p class="card-text"id=${thisBusRoute}_text></p>
                </div>
                `
                document.getElementById('canceled-busses-container').appendChild(card)
            }

            // this is for additional information per stop
            else{
                let extraContent = document.createElement('div')
                extraContent.innerHTML = `<p class="card-text">${cleanStartTime} - ${cleanEndTime}`
                if (bus.TrpStrtPlace){
                    extraContent.innerHTML += `${bus.TrpStrtPlace}`
                }
                if (bus.TrpEndPlace){
                    extraContent.innerHTML += ` - ${bus.TrpEndPlace}`
                }
                // console.log(times)
                document.getElementById(thisBusRoute+"_text").appendChild(extraContent)
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
    const targetDiv = document.getElementById('canceledBusList')
    targetDiv.appendChild(newBusListing);
}


// helper function to clean the time
function formatTime(time){
    let hour = time.slice(0, 2)
    let minute = time.slice(2, 4)
    let ampm = "AM"
    if(hour > 12){
        hour = hour - 12
        ampm = "PM"
    }
    return `${hour}:${minute} ${ampm}`
}

main()