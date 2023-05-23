const prisma = require("./prisma");

const findUserByEmail = (email) => {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
};

const saveUser = (user) => {
  return prisma.users.create({
    data: user,
  });
};

module.exports = {
  saveUser,
  findUserByEmail,
};
