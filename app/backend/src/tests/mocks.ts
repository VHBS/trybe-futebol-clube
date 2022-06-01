import User from "../database/models/user";

const adminLogin = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const adminLoginResult = {
  userData: {
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com",
}} as User

export { adminLogin, adminLoginResult }