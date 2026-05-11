let url = "http://universities.hipolabs.com/search?country=";

let btn = document.querySelector(".search");
let input = document.querySelector(".country");
let list = document.querySelector("#list");
let countDisplay = document.querySelector("#result-count");

btn.addEventListener("click", async () => {

    let country = input.value.trim();
    if(country === "") return;

    let colleges = await getColleges(country);
    show(colleges, country);

    input.value = "";         
    input.focus();             
});

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        btn.click();
    }
});

function show(colleges, country){

    list.innerHTML = "";       
    countDisplay.innerText = "";

    if(colleges.length === 0){
        let li = document.createElement("li");
        li.innerText = "No colleges found";
        list.appendChild(li);
        return;
    }

    let count = 0 ;
    for(let college of colleges){
        let li = document.createElement("li");
        let state = college['state-province'];
        let stateText = state ? state : "State not mentioned";
        
        li.innerHTML = `
            <div class="uni-name">${college.name}</div>
            <div class="uni-state">${stateText}</div>
        `;
        list.appendChild(li);
        count++;
    }
    
    countDisplay.innerText = `Total Universities Found in ${country} : ${count}`;
}

async function getColleges(country){
    try{
        let res = await axios.get(url + country);
        return res.data;
    }catch(error){
        console.log("College not found");
        return [];
    }
}