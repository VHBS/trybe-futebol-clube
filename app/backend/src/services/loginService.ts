export default class LoginController {
  public login({ email, password }: { email: string, password: string }) {
    return { email, password };
  }
}
