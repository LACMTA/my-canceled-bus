let routes =[]
let cancelations =[]

function main() {
    const summary_url = 'https://metro-api-v2.ofhq3vd1r7une.us-west-2.cs.amazonlightsail.com/canceled_service_summary/';
    fetch(summary_url)
    .then(response => response.json()) // get the data from the json file
    .then(json_data => format_data(json_data)) 
    .catch(error => console.log(error));
    console.log(routes);
    console.log(cancelations);
    update_the_time()
}

function format_data(the_data){
    let defaultData = the_data.canceled_trips_summary;
    // let lastUpdatedDate = new Date(the_data.last_updated);
    // let updated_time = lastUpdatedDate.toLocaleTimeString('en-US',{hour: 'numeric', minute:'2-digit'});
    // let update_date = lastUpdatedDate.toLocaleDateString('en-US');
    for (let key in defaultData) {
        format_chart_data(defaultData[key], key);
    }
}

function format_chart_data(x,y){
    routes.push(x);
    cancelations.push(y);
}

function add_chart(){
    const ctx = document.getElementById('canceled_chart_summary');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cancelations,
            datasets: [{
                label: 'Cancelations',
                data: routes,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false, // if `true` causes weird layout issues
            scaleShowValues: true,
            scales: {
                y: {
                    beginAtZero: true,
                    display: true,
                    autoSkipPadding: 0,
                    autoSkip: false
                }          
            }
    }
    });
}
function update_the_time(){
    let container = document.getElementById('last_updated_label');
    const summary_url = 'https://metro-api-v2.ofhq3vd1r7une.us-west-2.cs.amazonlightsail.com/canceled_service_summary/';
    fetch(summary_url).then(response => response.json()).then(data => {
        let lastUpdatedDate = new Date(data.last_updated);
        let updated_time = lastUpdatedDate.toLocaleTimeString('en-US',{hour: 'numeric', minute:'2-digit'});
        let update_date = lastUpdatedDate.toLocaleDateString('en-US');
        container.innerHTML =  `<time datetime="${update_date}">${update_date}</time> at ${updated_time}.`;
    });
}

main()
setTimeout(add_chart, 500);