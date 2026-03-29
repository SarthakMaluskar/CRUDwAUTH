const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');


async function addAdmin() {
    await mongoose.connect('mongodb://127.0.0.1:27017/assignment');

    const existing = await User.findOne({ email: 'sarthak@gmail.com' });
    if (existing) {
        console.log("Admin already exists");
        return;
    }

    const hashed = await bcrypt.hash('test', 10);

    const newUser = new User({
        username: 'sarthak',
        email: 'sarthak@gmail.com',
        password: hashed, // test password not hashing here
        isAdmin: true
    });

    await newUser.save();

    console.log("added admin");
    process.exit();
}

addAdmin();