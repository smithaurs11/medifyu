document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const cellNumber = document.getElementById("cellNumber").value;
    const department = document.getElementById("department").value;
    const doctor = document.getElementById("doctor").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const confirmedTime = `${appointmentDate} at ${appointmentTime}`;

    console.log(firstName, lastName, email, cellNumber, department, doctor, appointmentDate, appointmentTime);
    
    document.getElementById('confirmed-appointment-time').innerText = confirmedTime;
    document.getElementById('appointment-confirm-popup').classList.remove('hidden');

    fetch("http://127.0.0.1:5000/schedule_appointment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            cellNumber: cellNumber,
            department: department,
            doctor: doctor,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.status === "success") {
                document.getElementById("confirmed-appointment-time").innerText =
                    `${appointmentDate} at ${appointmentTime}`;
                document.getElementById("appointment-confirm-popup").classList.remove("hidden");
            } else {
                alert("Failed to schedule appointment");
            }
        })
        .catch((error) => console.error("Error:", error));
});

// Function to update doctors based on selected department
function updateDoctors() {
    const department = document.getElementById("department").value;
    const doctorSelect = document.getElementById("doctor");
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';

    if (department && doctors[department]) {
        doctors[department].forEach((doctor) => {
            const option = document.createElement("option");
            option.value = doctor;
            option.textContent = doctor;
            doctorSelect.appendChild(option);
        });
    }
}

// Function to close the confirmation popup
document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("appointment-confirm-popup").classList.add("hidden");
});

// Function to handle confirmation button click
document.getElementById("confirm-button").addEventListener("click", function () {
    document.getElementById("appointment-confirm-popup").classList.add("hidden");
    alert("Appointment confirmed!");
});

const doctors = {
    neurology: ["Dr. Smith", "Dr. Jones", "Dr. Brown"],
    pediatric: ["Dr. Williams", "Dr. Davis", "Dr. Wilson"],
    cardiology: ["Dr. Taylor", "Dr. Anderson", "Dr. Thomas"]
};