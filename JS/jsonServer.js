const getElem = document.querySelector("#get_services");
const getURL = "http://localhost:3000/EmployeePayrollDB/1";
makeServiceCall("GET", getURL, true)
    .then(responseText => {
        getElem.textContent = "Get User Data: " + responseText;
    })
    .catch(error => {
        getElem.textContent = "GET Error Status: " + JSON.stringify(error);
    });

const deleteElem = document.querySelector("#delete_services");
const deleteURL = "http://localhost:3000/EmployeePayrollDB/3";
makeServiceCall("DELETE", deleteURL, false)
    .then(responseText => {
        deleteElem.textContent = "Delete Data: " + responseText;
    })
    .catch(error => {
        deleteElem.textContent = "DELETE Error Status: " + JSON.stringify(error);
    });

const empPayrollData =
{
    _name: 'Amarpa Shashanka Keerthi Kumar',
    gender: 'female',
    _department: [
        'Sales'
    ],
    _salary: "400000",
    _startDate: '29 Oct 2019',
    _note: "",
    _profilePic: "/assest/profile-images/Ellipse -1.png"
};

const postElem = document.querySelector("#post_services");
const postURL = "http://localhost:3000/EmployeePayrollDB/";
makeServiceCall("POST", postURL, true, empPayrollData)
    .then(responseText => {
        postElem.textContent = "New User Data: " + responseText;
    })
    .catch(error => {
        postElem.textContent = "POST Error Status: " + JSON.stringify(error);
    });