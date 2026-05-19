const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword
    });

    console.log("Default admin created");
  } catch (error) {
    console.error("Failed to create default admin:", error.message);
  }
};

module.exports = createAdmin;
