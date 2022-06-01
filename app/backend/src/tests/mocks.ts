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

const adminLoginJwtVerify = {
  data: { id: 1, username: 'Admin', role: 'admin', email: 'admin@admin.com' },
  iat: 1654110031,
  exp: 1654714831
}

export { adminLogin, adminLoginResult, adminLoginJwtVerify }