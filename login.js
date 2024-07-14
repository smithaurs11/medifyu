document.getElementById("login").onclick = function(e) {
    e.preventDefault();
    // change to get the data to be inserted in database
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://127.0.0.1:5000/add_user', { //change this for every function and keep the same name in the app.py file @app.route('/add_user', methods=['POST'])
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }) //change here 
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
}