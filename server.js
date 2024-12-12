import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';  // Use import here

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// In-memory data store
const users = new Map();

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[\w-\.]+@[\w-\.]+\.[a-z]{2,7}$/i;
    return emailRegex.test(email);
}

// Create user
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required.' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    const id = uuidv4();
    const newUser = { id, name, email, age };
    users.set(id, newUser);

    res.status(201).json(newUser);
});

// Read all users
app.get('/users', (req, res) => {
    res.json(Array.from(users.values()));
});

// Read user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.get(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
});

// Update user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const user = users.get(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    const updatedUser = {
        ...user,
        name: name || user.name,
        email: email || user.email,
        age: age || user.age
    };

    users.set(id, updatedUser);

    res.json(updatedUser);
});

// Delete user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!users.has(id)) {
        return res.status(404).json({ error: 'User not found.' });
    }

    users.delete(id);

    res.status(204).send();
});

// Fetch the users (now works with ES modules)
// fetch('http://localhost:8000/users', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: 'shivarth',
//         email: 'shivarth.drona@gmail.com',
//         age: 30
//     })
// })
// .then(response => response.json())
// .then(data => console.log('User created:', data))
// .catch(error => console.error('Error:', error));


const usersToCreate = [
    { name: 'Shivarth', email: 'shivarth.drona@gmail.com', age: 30 },
    { name: 'Alice', email: 'alice@example.com', age: 28 },
    { name: 'Bob', email: 'bob@example.com', age: 35 },
    {name:'prodigy', email:"prody@gmail.com" , age:67},
];

const userIdsToDelete = [
    'user-id-1', // replace with actual user IDs
    'user-id-2', // replace with actual user IDs
    'user-id-3', // replace with actual user IDs
];

// Create multiple users
usersToCreate.forEach(user => {
    fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => console.log('User created:', data))
    .catch(error => console.error('Error:', error));
});

// Delete multiple users
userIdsToDelete.forEach(id => {
    fetch(`http://localhost:8000/users/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log(`User with ID ${id} deleted.`);
        } else {
            console.error(`Failed to delete user with ID ${id}`);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
