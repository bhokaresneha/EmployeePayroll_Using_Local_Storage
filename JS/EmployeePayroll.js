window.addEventListener('DOMContentLoaded',(event) => {
    validateName();
    validateDate();
});
function validateName(){
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
        alert(new Date())
        alert(new Date(startDate))
        if(startDate> curruntDate)
        throw "Start Date iS future Date";
        const diff = Math.abs(curruntDate.getTime() - startDate.getTime());
        if(diff/(1000*60*60*24)>30)
        throw "Start Date is beyond 30 Days";
}
const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function () {
            output.textContent = salary.value;
});
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        alert("Added Sucedssfully");
        alert(employeePayrollData.toString());

    } catch (e) {
        return ;
    }
}
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayroll();

    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
   // alert(date);
    employeePayrollData.startDate = date;
  //  alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}




class EmployeePayroll {
    get id() { return this._id; }

    set id(id) {
        this.id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRgx = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRgx.test(name))
            this._name = name;
        else throw 'Name is Incorrect!';
    }
    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }
    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }
    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    toString() {
        // const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // const empDate = !this._startDate ? "undefined" : 
        //                 this._startDate.toLocaleDateString("en-US", options);
        return "name=" + this.name + ", gender=" + this.gender +
            ", profilePic=" + this.profilePic + ", department=" + this.department +
            ",salary=" + this.salary + ", startDate=" +this.startDate + ", note=" + this.note;
    }
}