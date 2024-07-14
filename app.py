from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo
import logging

app = Flask(__name__)

# Configuration for MongoDB
app.config["MONGO_URI"] = "mongodb+srv://medify:faip6mMDWvuhniOy@cluster0.fk6glzz.mongodb.net/medifyu?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/medmt')
def medmgt():
    return render_template('medmt.html')

@app.route('/ehr')
def ehr():
    return render_template('ehr.html')

@app.route('/trpt')
def trpt():
    return render_template('trpt.html')

@app.route('/phcy')
def phcy():
    return render_template('phcy.html')

@app.route('/trpy')
def trpy():
    return render_template('trpy.html')

@app.route('/add_user', methods=['POST'])
def add_user(): 
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        # Insert into MongoDB collection 'users'
        result = mongo.db.users.insert_one({'email': email, 'password': password}) #change here
        
        if result.inserted_id:
            return jsonify({'status': 'success', 'message': 'User added successfully'}), 200
        else:
            return jsonify({'status': 'fail', 'message': 'Failed to add user'}), 500
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 500
    

@app.route('/signup')
def signup():
    return render_template('signup.html')

# Route to handle new user registration
@app.route('/new_users', methods=['POST'])
def new_users():
    try:
        # Get data from JSON request
        data = request.json
        email = data.get('email')
        country = data.get('country')
        password = data.get('password')
        
        # Insert into MongoDB collection 'new_users'
        result = mongo.db.new_users.insert_one({'email': email, 'country': country, 'password': password})
        
        if result.inserted_id:
            return jsonify({'status': 'success', 'message': 'User added successfully'}), 200
        else:
            return jsonify({'status': 'fail', 'message': 'Failed to add user'}), 500
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 500


@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

# Route to handle scheduling new appointments
@app.route('/schedule_appointment', methods=['POST'])
def schedule_appointment():
    try:
        # Get data from JSON request
        data = request.json
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        email = data.get('email')
        cellNumber = data.get('cellNumber')
        department = data.get('department')
        doctor = data.get('doctor')
        appointmentDate = data.get('appointmentDate')
        appointmentTime = data.get('appointmentTime')

        # Insert into MongoDB collection 'appointments'
        result = mongo.db.appointments.insert_one({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'cellNumber': cellNumber,
            'department': department,
            'doctor': doctor,
            'appointmentDate': appointmentDate,
            'appointmentTime': appointmentTime
        })

        if result.inserted_id:
            return jsonify({'status': 'success', 'message': 'Appointment scheduled successfully'}), 200
        else:
            return jsonify({'status': 'fail', 'message': 'Failed to schedule appointment'}), 500
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 500
    
@app.route('/save_medicines', methods=['POST'])
def save_medicines():
    try:
        medicines = request.json
        if not medicines:
            return jsonify({'status': 'fail', 'message': 'No data provided'}), 400

        # Insert or update medicines in MongoDB
        for medicine in medicines:
            mongo.db.medicines.update_one(
                {'name': medicine['name']},
                {'$set': medicine},
                upsert=True
            )

        return jsonify({'status': 'success', 'message': 'Medicines saved successfully'}), 200
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 500

@app.route('/book_appointment', methods=['POST'])
def book_appointment():
    try:
        data = request.json
        full_name = data.get('fullName')
        email = data.get('email')
        phone = data.get('phone')
        therapy_type = data.get('therapyType')
        appointment_date = data.get('appointmentDate')
        
        # Insert into MongoDB collection 'appointments'
        result = mongo.db.appointments.insert_one({
            'fullName': full_name,
            'email': email,
            'phone': phone,
            'therapyType': therapy_type,
            'appointmentDate': appointment_date
        })
        
        if result.inserted_id:
            return jsonify({'status': 'success', 'message': 'Appointment booked successfully'}), 200
        else:
            return jsonify({'status': 'fail', 'message': 'Failed to book appointment'}), 500
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)


