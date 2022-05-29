const bcrypt = require('bcryptjs');


const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john1@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Jane Doe',
        email: 'jane1@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
]

module.exports = users;