declare namespace Express {
  export interface Request {
    userData: {
      id: number;
      username: string;
      role: string;
      email: string;
    }
  }
}
