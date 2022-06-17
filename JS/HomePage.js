let empPayrollList
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList =   getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
});
getEmployeePayrollDataFromStorage= () => {
    return localStorage.getItem('EmployeePayrollList') ? 
                    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    if (empPayrollList.length == 0) return;
    const headerHtml = "<tr><th>Profile</th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
            <tr>
                <td><img class="profile" alt="" src="${empPayrollData._profilePic}">
                </td>
                <td>${empPayrollData._name}</td>
                <td>${empPayrollData._gender}</td>
                <td>${getDeptHtml(empPayrollData._department)}</td>
                <td>${empPayrollData._salary}</td>
                <td>${empPayrollData._startDate}</td>
                <td>
                    <img id="1" onclick="remove(this)" alt="delete" src="/Assets/icons/delete-black-18dp.svg">
                    <img id="1" alt="edit" onclick="update(this)" src="/Assets/icons/create-black-18dp.svg">
                </td>
            </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}