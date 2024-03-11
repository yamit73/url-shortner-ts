interface IToken {
  generate(): Promise<string>;
  validate(token: string): Promise<boolean>;
}

export { IToken };
