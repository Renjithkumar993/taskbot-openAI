const  { User } = require("../models")


const users = [
  {
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password1',
  },
  {
    username: 'janedoe',
    email: 'janedoe1cc@example.com',
    password: 'password2',
  },
  {
    username: 'bobsmith',
    email: 'bobsmith@example.com',
    password: 'password3',
  },
];

const userSeed = () => {
 User.bulkCreate(users);
}

module.exports = userSeed;