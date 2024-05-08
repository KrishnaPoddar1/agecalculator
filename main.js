const d = new Date();
const year = d.getFullYear();
const month = d.getMonth();
const date = d.getDate();

const writeYear = document.getElementById("years");
const writeMonth = document.getElementById("months");
const writeDate = document.getElementById("days");


const errorMessage = document.querySelectorAll(".day p");
const label = document.querySelectorAll("label");
const input = document.querySelectorAll("input");
const btn = document.getElementById("btn-submit");


function getDateDifference(date1, date2){
    let yearDifference = date1.getFullYear() - date2.getFullYear();
    let monthDifference = date1.getMonth() - date2.getMonth();
    if(monthDifference<0){
        yearDifference--;
        monthDifference+=12;
    }
    const differenceInMilliseconds = date1.getTime() - date2.getTime();//Difference in time in milliseconds
    const day1 = new Date(date1.getFullYear(), date1.getMonth(), 1).getTime();// 1st day of month of date1
    const day2 = new Date(date2.getFullYear(), date2.getMonth(), 1).getTime();// 1st day of month of date2
    const daysInMonth1 = new Date(date1.getFullYear(), date1.getMonth() + 1, 0).getDate();//Total Number of days in date1
    const daysInMonth2 = new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();//Total Number of days in date2
    let dayDifference = Math.floor((differenceInMilliseconds - (day1 - day2)) / (1000 * 60 * 60 * 24));
    if (dayDifference < 0) {
        monthDifference--;
        dayDifference += daysInMonth2;
    } else if (dayDifference > daysInMonth1) {
        dayDifference -= daysInMonth1;
    }

    // console.log(yearDifference,monthDifference,dayDifference);

    return {
        years: yearDifference,
        months: monthDifference,
        days: dayDifference,
    };
}


btn.addEventListener("click",()=>{
    const userYear = parseInt(document.getElementById("userYear").value,10);
    // console.log(userYear);
    const userMonth = parseInt(document.getElementById("userMonth").value,10);
    const userDate = parseInt(document.getElementById("userDate").value,10);
    if((userDate > 31 || userDate<=0 || isNaN(userDate))||(userMonth > 12 || userMonth<=0 || isNaN(userMonth))||(userYear > year || isNaN(userYear))){
        // console.log("Invalid Date");
        if(userDate > 31 || userDate<=0 || isNaN(userDate)){
            errorMessage[0].classList.remove("errormessage");
        }
        if(userMonth > 12 || userMonth<=0 || isNaN(userMonth)){
            errorMessage[1].classList.remove("errormessage");
        }
        if(userYear > year || isNaN(userYear)){
            errorMessage[2].classList.remove("errormessage");
        }
        for(let i=0;i<3;i++){
            // errorMessage[i].classList.remove("errormessage");
            label[i].classList.add("redText");
            input[i].classList.add("red");
        }
        btn.style.top = "37%";
        writeYear.textContent = "--";
        writeMonth.textContent = "--";
        writeDate.textContent = "--";
    }else{
        // console.log("Valid Date");
        for(let i=0;i<3;i++){
            errorMessage[i].classList.add("errormessage");
            label[i].classList.remove("redText");
            input[i].classList.remove("red");
        }
        btn.style.top = "30%";
        const d1 = new Date(year,month,date);
        const d2 = new Date(userYear,userMonth-1,userDate);
        
        const difference = getDateDifference(d1,d2);
        writeYear.textContent = difference.years;
        writeMonth.textContent = difference.months;
        writeDate.textContent = difference.days;
    }
});