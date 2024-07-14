// Function to add a new row to the medicine table
function addNewMedicine() {
    const table = document.getElementById("medicineTable");
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td class="border px-4 py-2 text-center">
            <input type="checkbox" class="medicine-checkbox">
        </td>
        <td class="border px-4 py-2"><input type="text" class="w-full"></td>
        <td class="border px-4 py-2"><input type="text" class="w-full"></td>
        <td class="border px-4 py-2"><input type="text" class="w-full"></td>
        <td class="border px-4 py-2"><input type="text" class="w-full"></td>
        <td class="border px-4 py-2"><input type="date" class="w-full"></td>
        <td class="border px-4 py-2">
            <select class="block w-full mt-1">
                <option value="taken">Taken</option>
                <option value="not_taken">Not Taken</option>
            </select>
        </td>
    `;
}

// Function to save the medicines
function saveMedicines() {
    // Gather data from the table and send to the server or store locally
    const medicines = [];
    const rows = document.querySelectorAll("#medicineTable tr");

    rows.forEach(row => {
        const nameInput = row.cells[1].querySelector("input");
        const reasonInput = row.cells[2].querySelector("input");
        const dosageInput = row.cells[3].querySelector("input");
        const durationInput = row.cells[4].querySelector("input");
        const expiryDateInput = row.cells[5].querySelector("input");
        const statusSelect = row.cells[6].querySelector("select");

        const medicine = {
            name: nameInput ? nameInput.value : row.cells[1].innerText,
            reason: reasonInput ? reasonInput.value : row.cells[2].innerText,
            dosage: dosageInput ? dosageInput.value : row.cells[3].innerText,
            duration: durationInput ? durationInput.value : row.cells[4].innerText,
            expiryDate: expiryDateInput ? expiryDateInput.value : row.cells[5].innerText,
            status: statusSelect ? statusSelect.value : row.cells[6].innerText
        };
        medicines.push(medicine);
    });

    console.log(medicines);

    fetch("http://127.0.0.1:5000/save_medicines", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(medicines),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Medicines saved successfully");
    })
    .catch(error => console.error("Error:", error));
}

// Function to delete selected medicines
function deleteSelected() {
    const checkboxes = document.querySelectorAll(".medicine-checkbox:checked");

    checkboxes.forEach(checkbox => {
        const row = checkbox.closest("tr");
        row.remove();
    });
}

// Function to select or deselect all medicines
function selectAllMedicines(selectAllCheckbox) {
    const checkboxes = document.querySelectorAll(".medicine-checkbox");
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

// Function to filter medicines by status
function filterByStatus() {
    const statusFilter = document.getElementById("actions").value;
    const rows = document.querySelectorAll("#medicineTable tr");

    rows.forEach(row => {
        const statusSelect = row.cells[6].querySelector("select");
        if (statusSelect) {
            const status = statusSelect.value;
            if (statusFilter === "all" || status === statusFilter) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    });
}

// Function to search medicines by name
function searchMedicine() {
    const searchValue = document.getElementById("searchMedicine").value.toLowerCase();
    const rows = document.querySelectorAll("#medicineTable tr");

    rows.forEach(row => {
        const medicineName = row.cells[1].querySelector("input") ? row.cells[1].querySelector("input").value.toLowerCase() : row.cells[1].innerText.toLowerCase();
        if (medicineName.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Function to search medicines by reason
function searchReason() {
    const searchValue = document.getElementById("searchReason").value.toLowerCase();
    const rows = document.querySelectorAll("#medicineTable tr");

    rows.forEach(row => {
        const reason = row.cells[2].querySelector("input") ? row.cells[2].querySelector("input").value.toLowerCase() : row.cells[2].innerText.toLowerCase();
        if (reason.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

document.getElementById("save").addEventListener("click", saveMedicines);
document.getElementById("delete").addEventListener("click", deleteSelected);
