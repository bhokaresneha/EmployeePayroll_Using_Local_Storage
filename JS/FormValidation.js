let isUpdate = false;
let employPayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    validateDate();
    validatename();
    salaryrange();
    checkForUpdate();

});

function salaryrange() {
    const salary = document.querySelector('#salary');
    setTextValue('.salary-output', salary.value);
    salary.addEventListener('input', function () {
        setTextValue('.salary-output', salary.value);

    });

}
function validatename() {
    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValue('.text-error',"");
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;
            setTextValue('.text-error',"");
        } catch (e) {
            setTextValue('.text-error',e);
        }
    });
}

function validateDate() {
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');

    day.addEventListener('input',checkdate);
    month.addEventListener('input',checkdate);
    year.addEventListener('input',checkdate);

}

function checkdate() {
    const dateError = document.querySelector('.date-error');
    try {
        let date = day.value + "" + month.value + "" + year.value;
        checkStartDate(date);
        dateError.textContent = "";
    }
    catch (e) {
        dateError.textContent = e;
    }
}

checkStartDate = (date) => {
    let curruntDate = new Date();
    let startDate = new Date(date)
    let dd = curruntDate.getTime();
    let aa = startDate.getTime();
    if (startDate > curruntDate)
        throw "Start Date iS future Date";
    const diff = Math.abs(curruntDate.getTime() - startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30)
        throw "Start Date is beyond 30 Days";
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayorollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);

    } catch (e) {
        return;
    }
}

const setEmployeePayorollObject = () => {
    employPayrollObject.name = getInputValueById('#name');
    employPayrollObject.profilePic = getSelectedValues('[name=profile]').pop();
    employPayrollObject.gender = getSelectedValues('[name=gender]').pop();
    employPayrollObject.department = getSelectedValues('[name=department]');
    employPayrollObject.salary = getInputValueById('#salary');
    employPayrollObject.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employPayrollObject.startDate = date;
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(empData => empData._id == employPayrollObject._id);
        if (!empPayrollData) {
            employeePayrollList.push(createEmployeePayrollData());
            alert("Added Successfully");
        } else {
            const index = employeePayrollList
                .map(empData => empData._id)
                .indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
            alert("Updated Successfully");
        }
    } else {
        employeePayrollList = [createEmployeePayrollData()]
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}


const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayroll();
    if (!id) employeePayrollData._id = createNewEmpId();
    else employeePayrollData._id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}



const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData._name = employPayrollObject.name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData._profilePic = employPayrollObject.profilePic;
    employeePayrollData._gender = employPayrollObject.gender;
    employeePayrollData._department = employPayrollObject.department;
    employeePayrollData._salary = employPayrollObject.salary;
    employeePayrollData._note = employPayrollObject.note;
    try {
        employeePayrollData._startDate =
            employPayrollObject.startDate;
    } catch (e) {
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) 
        selItems.push(item.value);
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

const createNewEmpId = () => {
    let empId = localStorage.getItem("EmpId");
    empId = !empId ? 1 : (parseInt(empId)+1).toString();
    localStorage.setItem("EmpId", empId);
    return empId;
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setTextValue('.salary-output', '400000');
    setValue('#notes', '');
    setValue('#day', '');
    setValue('#month', '');
    setValue('#year', '');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue); allItems.forEach(item => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id); 
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const employeePayrollJSONData = localStorage.getItem('editEmp'); //edit
    isUpdate = employeePayrollJSONData ? true : false;
    if (!isUpdate) return;
    employPayrollObject = JSON.parse(employeePayrollJSONData);
    setForm();
}

const setForm = () => {

    setValue('#name', employPayrollObject._name);
    setSelectedValue('[name = profile]', employPayrollObject._profilePic);
    setSelectedValue('[name = gender]', employPayrollObject._gender);
    setSelectedValue('[name = department]', employPayrollObject._department);
    setValue('#salary', employPayrollObject._salary);
    setTextValue('.salary-output', employPayrollObject._salary);
    let date = employPayrollObject._startDate.split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    setValue('#notes', employPayrollObject._note);
}

const setSelectedValue = (propertyValue, value) => {
    let allItem = document.querySelectorAll(propertyValue);
    allItem.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) {
            item.checked = true;
        }
    });
}