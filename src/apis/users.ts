import { Card } from "./cards";
export const BASE_URL = "http://localhost:3000";
  

export class User {
  constructor(
    public ID: number,
    public username: string,
    public email: string,
    public cards: Array<Card>
  ) { }
}
export async function getUsers(id: number): Promise<User> {
  return await (await fetch(new URL(`${BASE_URL}/user/${id}/withCards`))).json();
}
