
window.addEventListener('DOMContentLoaded', (event) => {
    validateDate();
    validatename();
    salaryrange();

});
function salaryrange(){
    const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function () {
            output.textContent = salary.value;
});

}

//validating Name
function validatename(){
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if(name.value.length==0){
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;
             textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
} 

//validating Date
function validateDate(){
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');

    day.addEventListener('input',checkdate)
    month.addEventListener('input',checkdate)
    year.addEventListener('input',checkdate)

}

function checkdate(){
    const dateError = document.querySelector('.date-error');
 try{
    let date=day.value+""+month.value+""+year.value;
    checkStartDate(date);
    dateError.textContent="";
 }
 catch(e)
 {
    dateError.textContent=e;
 }
}
checkStartDate=(date)=>{
    let curruntDate = new Date();
    let startDate=new Date(date)
    if(startDate> curruntDate)
        throw "Start Date iS future Date";
      
    // alert("C"+curruntDate.getTime());
    // alert("s"+startDate.getTime());
    // alert("C-S"+(curruntDate.getTime() - startDate.getTime()));

    const diff = Math.abs(curruntDate.getTime() - startDate.getTime());
    if(diff/(1000*60*60*24)>30)
        throw "Start Date is beyond 30 Days";
}


function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const setElementValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

