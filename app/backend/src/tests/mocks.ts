import User from "../database/models/User";

const adminLogin = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const adminDb = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  userData: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  }
} as User

export { adminLogin, adminDb }