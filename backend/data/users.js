import bcrypt from "bcryptjs";
const users = [
   {
      name: "adminn",
      email: "beybi@google.com",
      password: bcrypt.hashSync("xxx", 10),
      isAdmin: true,
   },
   {
      name: "james",
      email: "james@dean.com",
      password: bcrypt.hashSync("zzz", 10),
   },
   {
      name: "tutan come on!",
      email: "tutan@google.com",
      password: bcrypt.hashSync("ccc", 10),
   },
];

export default users;
