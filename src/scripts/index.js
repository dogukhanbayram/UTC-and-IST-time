let g_response;
let g_timeOffset;

let G_API_KEY = 'API_KEY_HERE'

async function fetchData(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': G_API_KEY,
            'X-RapidAPI-Host': 'world-time2.p.rapidapi.com'
        }
    };
    
    var response = await fetch('https://world-time2.p.rapidapi.com/timezone/Asia/Istanbul', options);
    response = response.json();
    return response;
}


async function prepare(){
    response = await fetchData();
    g_timeOffset = response.utc_offset.charAt(2);
}

prepare();

async function renderTime(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes(); 
    var seconds = date.getSeconds(); 

    var UTCdate = new Date();
    var hoursUTC = UTCdate.getHours() - g_timeOffset;
    var minutesUTC = UTCdate.getMinutes(); 
    var secondsUTC = UTCdate.getSeconds(); 
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    hoursUTC = (hoursUTC < 10) ? "0" + hoursUTC : hoursUTC;
    minutesUTC = (minutesUTC < 10) ? "0" + minutesUTC : minutesUTC;
    secondsUTC = (secondsUTC < 10) ? "0" + secondsUTC : secondsUTC;
    
    var time = hours + ":" + minutes + ":" + seconds + " ";
    var timeUTC = hoursUTC + ":" + minutesUTC + ":" + secondsUTC + " ";

    document.getElementById("IST").innerText =  time;
    document.getElementById("IST").textContent = time;

    document.getElementById("UTC").innerText = timeUTC;
    document.getElementById("UTC").textContent = timeUTC;

    setTimeout(renderTime, 100);  
}

renderTime();
