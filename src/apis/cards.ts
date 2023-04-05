export const getYearMonth = (date: string | Date) =>
  new Date(date)
    .toLocaleDateString()
    .split("/")
    .filter((_, index) => index !== 1)
    .join("/")
export class Card {
  constructor(
    public ID: number,
    public belogsToUserID: number,
    public cardID: string,
    public name: string,
    public validFrom: string,
    public validThru: string
  ) { }

  public get _validThru() { return getYearMonth(this.validThru) }
  public get _validFrom() { return getYearMonth(this.validFrom) }
}

