const { PrismaClient } = require("@prisma/client");
const { encryptPassword } = require("../../src/helpers/bcrypt");

const prisma = new PrismaClient();

async function userSeed() {
  const user = await prisma.users.findUnique({
    where: { email: "superadmin@mail.com" },
  });
  if (user) return;
  return await prisma.users.upsert({
    where: { email: "superadmin@mail.com" },
    update: {},
    create: {
      email: "superadmin@mail.com",
      fullname: "Super Duper Admin",
      password: await encryptPassword("123456"),
      roleId: 1,
    },
  });
}

module.exports = userSeed;