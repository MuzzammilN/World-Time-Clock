const ACairo = document.getElementById("ACairo");
const EMadrid = document.getElementById("EMadrid");
const IMaldives = document.getElementById("IMaldives");
const PFiji = document.getElementById("PFiji");
const AHalifax = document.getElementById("AHalifax");
const AVladivostok = document.getElementById("AVladivostok");
const ERome = document.getElementById("ERome");
const AHong_Kong = document.getElementById("AHong_Kong");

const time = document.querySelector(".time");
const cityInput = document.querySelector(".cityInput");
const crInput = document.querySelector(".crInput");
const regionInput = document.querySelector(".regionInput");


async function hello(city, region, nameElement, timeZone) {
    try {
        const cData = await getdata(city, region);
        updates(cData, nameElement, timeZone);
    } catch (error) {
        displayError(error);
    }
}

async function getdata(city, region) {
    const apiUrl = `http://worldtimeapi.org/api/timezone/${city}/${region}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch data");
    } else {
        return await response.json();
    }
}

function updates(data, nameElement, timeZone) {
    console.log(data);
    let unixTimestamp = data.unixtime * 1000;
    let dateObject = new Date(unixTimestamp);

    let formattedTime = dateObject.toLocaleTimeString([], { timeZone: timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    nameElement.textContent = formattedTime;
    console.log(`Updated time for ${timeZone}: ${formattedTime}`);
}

function start(city, region, nameElement, timeZone, isRunning, intervalId) {
    if (!isRunning) {
        intervalId = setInterval(() => {
            hello(city, region, nameElement, timeZone);
        }, 1000);
        return true;  
    }
    return false;  
}


function displayText()
{
    const element = document.getElementById("texts");
    element.parentNode.removeChild(element);
    const signs = document.getElementById("signs");
    const newDiv = document.createElement('div');
    signs.appendChild(newDiv);
    newDiv.setAttribute('id', 'entry');
    const ps = document.createElement('p');
    ps.setAttribute('id', 'name');
    newDiv.appendChild(ps);


    
}

function displayError(message){
    const name = document.getElementById("name");
    name.textContent = message;
}


time.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;
    const region = regionInput.value;
    const cr = crInput.value; 
    

    if (city && region && cr) {
        try {
            const cData = await getdata(city, region);
            displayText();
            const name = document.getElementById("name");
            updates(cData, name, cr);
            start(city, region, name, cr);

            
        } catch (error) {
            displayText();
            displayError(error.message);
        }
    } else {
        displayText();
        displayError("Please enter a city, region, and name");
    }
});


        start("Africa", "Cairo", ACairo, "Africa/Cairo");
        start("Europe", "Madrid", EMadrid, "Europe/Madrid");
        start("Indian", "Maldives", IMaldives, "Indian/Maldives");
        start("Pacific", "Fiji", PFiji, "Pacific/Fiji");
        start("America", "Halifax", AHalifax, "America/Halifax");
        start("Asia", "Vladivostok", AVladivostok, "Asia/Vladivostok");
        start("Europe", "Rome", ERome, "Europe/Rome");
        start("Asia", "Hong_Kong", AHong_Kong, "Asia/Hong_Kong")
    
       






