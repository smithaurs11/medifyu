// Function to open the confirmation modal
function openConfirmation() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'flex';
}

// Function to close the confirmation modal
function closeConfirmation() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

// Function to book the appointment
function bookAppointment() {
    // Collect form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const therapyType = document.getElementById('therapyType').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    // Validate form data
    if (!fullName || !email || !phone || !therapyType || !appointmentDate) {
        alert('Please fill out all required fields.');
        return;
    }

    // Send data to the server
    fetch("http://127.0.0.1:5000/book_appointment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            phone: phone,
            therapyType: therapyType,
            appointmentDate: appointmentDate,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            alert('Appointment booked successfully!');
        } else {
            alert('Failed to book appointment: ' + data.message);
        }
        closeConfirmation();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while booking the appointment.');
        closeConfirmation();
    });
}

// Add event listeners
document.getElementById('therapyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    openConfirmation();
});

document.querySelector('.primary').addEventListener('click', bookAppointment);
document.querySelector('.secondary').addEventListener('click', closeConfirmation);
