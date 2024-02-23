interface IPassword {
  password: string;

  setPassword(password: string): void;
  getPassword(): string;
  encrypt(): Promise<string>;
  match(encrypedPassword: string): Promise<boolean>;
  validate(): boolean;
}

export { IPassword };
