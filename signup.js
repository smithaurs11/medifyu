document.getElementById("signup").onclick = function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const password = document.getElementById('password').value;

    fetch('http://127.0.0.1:5000/new_users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, country: country, password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data.status === 'success') {
            alert('User added successfully');
        } else {
            alert('Failed to add user');
        }
    })
    .catch(error => console.error('Error:', error));
};
