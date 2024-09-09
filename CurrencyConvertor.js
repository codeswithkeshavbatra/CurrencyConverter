// const BASE_URl =   "https://api.exchangerate-api.com/v4/latest";

const btn = document.querySelector("form button");
const dropDown = document.querySelectorAll(".dropDown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select")
const msg = document.querySelector(".msg");

for (let select of dropDown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if(select.name === "To" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

 let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
     evt.preventDefault();
     updateRate();
});

const updateRate = async () => {
    let amount = document.querySelector(".amount input");
     let amtVal = amount.value;
     console.log(amtVal);
     if(amount === 1 || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
     }
    // const URL =`${BASE_URl}/${fromCurr}`;     
    let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    let finalAmount = amtVal * rate;
    //console.log(finalAmount);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

window.addEventListener("load", updateRate);