import User from "../database/models/user";

const adminLogin = {
  userData: {
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com",
}} as User

export { adminLogin }