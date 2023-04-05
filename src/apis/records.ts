import { BASE_URL } from "./users";

type RecordType = "DEBIT" | "CREDIT"

export class Record {
  constructor(
    public ID: number,
    public title: string,
    public description: string,
    public entryDate: string,
    public type: RecordType,
    public value: number
  ) {}
}

export async function getRecordsFromCard(id: number | string): Promise<Record[]> {
  return await (await fetch(new URL(`${BASE_URL}/record/fromCard/${id}`))).json();
}
