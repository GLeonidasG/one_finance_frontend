import { BASE_URL } from "./users"

export const getYearMonth = (date: string | Date) =>
  new Date(date)
    .toLocaleDateString()
    .split("/")
    .filter((_, index) => index !== 1)
    .join("/")

export class Card {
  constructor(
    public ID: number,
    public belongsToUserID: number,
    public cardID: string,
    public name: string,
    public validFrom: string,
    public validThru: string
  ) { }

  public get _validThru() { return getYearMonth(this.validThru) }
  public get _validFrom() { return getYearMonth(this.validFrom) }
}

export class CreateCard {
  constructor(
    public cardID: string,
    public name: string,
    public validFrom: string,
    public validThru: string,
    public belongsToUserID: number
  ) { }
}


export async function createCard(card: Card): Promise<void> {
  const options = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card)
  }
  console.log(options.body)
  await fetch(`${BASE_URL}/card`, options)
}

export async function updateCard(id: string | number, card: Card): Promise<void> {
  const options = {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card)
  }
  await fetch(`${BASE_URL}/card/${id}`, options)
}

export async function deleteCard(id: string | number): Promise<void> {
  const options = {
    method: "DELETE",
  }
  await fetch(`${BASE_URL}/card/${id}`, options)
}
