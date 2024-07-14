function selectAllMedicines(source) {
    checkboxes = document.getElementsByClassName('medicine-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = source.checked;
    }
}

function deleteSelected() {
    let table = document.getElementById('medicineTable');
    let checkboxes = document.getElementsByClassName('medicine-checkbox');
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            table.deleteRow(i);
        }
    }
}

function addNewMedicine() {
    let table = document.getElementById('medicineTable');
    let newRow = table.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    let cell7 = newRow.insertCell(6);

    cell1.className = 'border px-4 py-2 text-center';
    cell2.className = 'border px-4 py-2';
    cell3.className = 'border px-4 py-2';
    cell4.className = 'border px-4 py-2';
    cell5.className = 'border px-4 py-2';
    cell6.className = 'border px-4 py-2';
    cell7.className = 'border px-4 py-2';

    cell1.innerHTML = '<input type="checkbox" class="medicine-checkbox">';
    cell2.innerHTML = '<input type="text" class="block w-full  border-gray-300" placeholder="Medicine">';
    cell3.innerHTML = '<input type="text" class="block w-full mt-1 border-gray-300" placeholder="Reason">';
    cell4.innerHTML = '<input type="text" class="block w-full mt-1 border-gray-300" placeholder="Dosage">';
    cell5.innerHTML = '<input type="text" class="block w-full mt-1 border-gray-300" placeholder="Duration">';
    cell6.innerHTML = '<input type="date" class="block w-full mt-1 border-gray-300">';
    cell7.innerHTML = '<select class="block w-full mt-1 border-gray-300"><option value="taken">Taken</option><option value="not_taken">Not Taken</option></select>';
    // saveTableState();
}

function searchMedicine() {
    let input = document.getElementById('searchMedicine').value.toUpperCase();
    let table = document.getElementById('medicineTable');
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];
        if (td) {
            let textValue = td.textContent || td.innerText;
            if (textValue.toUpperCase().indexOf(input) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

function searchReason() {
    let input = document.getElementById('searchReason').value.toUpperCase();
    let table = document.getElementById('medicineTable');
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[2];
        if (td) {
            let textValue = td.textContent || td.innerText;
            if (textValue.toUpperCase().indexOf(input) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

function filterByStatus() {
    let statusFilter = document.getElementById('actions').value;
    let table = document.getElementById('medicineTable');
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[6].getElementsByTagName('select')[0];
        if (td) {
            let selectedValue = td.value;
            if (statusFilter === 'all' || selectedValue === statusFilter) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}


// Function to delete selected rows when "Delete" button is clicked
function deleteSelectedRows() {
    let table = document.getElementById('medicineTable');
    let checkboxes = document.getElementsByClassName('medicine-checkbox');
    
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            table.deleteRow(i + 1); // i + 1 to account for the header row
        }
    }
    // saveTableState();
}

// Function to save the table data (for demonstration)
function saveMedicines() {
    let table = document.getElementById('medicineTable');
    let rows = table.getElementsByTagName('tr');
    let savedData = [];

    for (let i = 1; i < rows.length; i++) { // start from index 1 to skip header row
        let cells = rows[i].getElementsByTagName('td');
        if (cells.length > 0) {
            let medicine = {
                checkbox: cells[0].getElementsByTagName('input')[0].checked,
                name: cells[1].innerText,
                reason: cells[2].innerText,
                dosage: cells[3].innerText,
                duration: cells[4].innerText,
                expiryDate: cells[5].innerText,
                status: cells[6].getElementsByTagName('select')[0].value,
            };
            savedData.push(medicine);
        }
    }
    localStorage.setItem('medicineTable', JSON.stringify(savedData)); // Store data in localStorage
    console.log('Saved Medicines:', savedData);
}

// function loadTableState() {
//     let savedData = localStorage.getItem('medicineTable');
//     if (savedData) {
//         savedData = JSON.parse(savedData);
//         let table = document.getElementById('medicineTable');

//         savedData.forEach(medicine => {
//             let newRow = table.insertRow();
//             let cell1 = newRow.insertCell(0);
//             let cell2 = newRow.insertCell(1);
//             let cell3 = newRow.insertCell(2);
//             let cell4 = newRow.insertCell(3);
//             let cell5 = newRow.insertCell(4);
//             let cell6 = newRow.insertCell(5);
//             let cell7 = newRow.insertCell(6);

//             cell1.className = 'border px-4 py-2 text-center';
//             cell2.className = 'border px-4 py-2';
//             cell3.className = 'border px-4 py-2';
//             cell4.className = 'border px-4 py-2';
//             cell5.className = 'border px-4 py-2';
//             cell6.className = 'border px-4 py-2';
//             cell7.className = 'border px-4 py-2';

//             cell1.innerHTML = '<input type="checkbox" class="medicine-checkbox">';
//             cell2.innerHTML = '<input type="text" class="block w-full  border-gray-300" value="' + medicine.name + '">';
//             cell3.innerHTML = '<input type="text" class="block w-full mt-1 border-gray-300" value="' + medicine.reason + '">';
//             cell4.innerHTML = '<input type="text" class="block w-full mt-1 border-gray-300" value="' + medicine.dosage + '">';
//             cell5.innerHTML = '<input type="text" class="block w-full mt-1 border-gray-300" value="' + medicine.duration + '">';
//             cell6.innerHTML = '<input type="date" class="block w-full mt-1 border-gray-300" value="' + medicine.expiryDate + '">';
//             cell7.innerHTML = '<select class="block w-full mt-1 border-gray-300"><option value="taken">Taken</option><option value="not_taken">Not Taken</option></select>';
            
//             cell7.getElementsByTagName('select')[0].value = medicine.status;
//         });
//     }
// }

// document.addEventListener('DOMContentLoaded', function() {
//     loadTableState();
// });