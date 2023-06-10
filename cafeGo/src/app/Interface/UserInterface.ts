export interface UserInterface {
    name: string;
    email: string;
    password: string;
    passwordRepeat: string;
    checkPassword(): boolean;
  }
  