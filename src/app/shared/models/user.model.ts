export class User {

  constructor(
    name: string,
    username: string,
    accessToken: string,
  ){}

  get name(): string {
    return this.name;
  }

  get username(): string {
    return this.username;
  }

  get accessToken(): string {
    return this.accessToken;
  }

  toJSON() {
    return {
      name: this.name,
      username: this.username,
      accessToken: this.accessToken,
    }
  }
}
