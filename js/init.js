let listOfCanceledBusses = [];

function addData(data){
    // console.log(data)
    // var data = JSON.parse(data);
    // console.log(data)
    let employeeDataArray = data.Employees.Employee
    // console.log(employeeDataArray)
    employeeDataArray.forEach(createCards)

}
// this function is used to create the cards for each bus line
function createCards(bus){
    if(bus.TrpRoute){
        let thisBusRoute = bus.TrpRoute
        thisBusRoute = thisBusRoute.replace(/\s/g, '')
        
        // let thisBusNumber = bus.BusNumber
        // console.log(thisBusRoute)
        if(thisBusRoute){
            let times = bus.TrpSrtTime
            // time = times.split(';')
            time = times
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
            // potentially add additional information 
            else{
                let extraContent = document.createElement('div')
                extraContent.innerHTML = `<p class="card-text">${time} - ${bus.TrpEndTime}`
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
    

    // for ([busses] in listOfCanceledBusses){
    //     console.log(busses)
    // }
    // else{
        
        // console.log('already added')

        // console.log('this bus: '+thisBusRoute.toString()+' already exists')
    // }

    // console.log(listOfCanceledBusses)
    // const newBusCard = document.createElement("button");
    // newBusCard.id = "button"+bus;
    // newBusCard.innerHTML = bus;
    // const spaceForButtons = document.getElementById('canceledBussesContent')
    // spaceForButtons.appendChild(newBusCard);
}

function addBusToDiv(busline){
    const newBusListing = document.createElement("button");
    newBusListing.id = "button"+busline;
    newBusListing.innerHTML = busline;
    const targetDiv = document.getElementById('canceledBusList')
    targetDiv.appendChild(newBusListing);
}

console.log('init.js loaded')

const url = './data/CancelledTripsRT.json'
fetch(url)
.then(response => response.json())
.then(data => {addData(data)})
.then(() => listOfCanceledBusses.forEach(bus => addBusToDiv(bus)))
.catch(error => console.log(error))