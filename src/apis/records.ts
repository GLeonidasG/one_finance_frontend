import {Update} from "vite/types/hmrPayload";
import { BASE_URL } from "./users";

type RecordType = "DEBIT" | "CREDIT"

export class Record {
  constructor(
    public ID: number,
    public title: string,
    public description: string,
    public entryDate: string,
    public type: RecordType, public value: number
  ) {}
}

export class CreateRecordDTO {
  constructor(
    public title: string,
    public description: string,
    public entryDate: Date | string,
    public type: RecordType,
    public value: number,
    public recordsFromCardId: number
  ) {}
}

export class UpdateRecordDTO {
  constructor(
    public recordsFromCardId: number | string,
    public title?: string,
    public description?: string,
    public entryDate?: Date | string,
    public type?: RecordType,
    public value?: number
  ) {}
}

export async function getRecordsFromCard(id: number | string): Promise<Record[]> {
  return await (await fetch(new URL(`${BASE_URL}/record/fromCard/${id}`))).json();
}

export async function createRecord(record: CreateRecordDTO): Promise<void> {
  const options = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  }
  await fetch(`${BASE_URL}/record`, options)
}

export async function updateRecord(id: string | number, record: UpdateRecordDTO): Promise<void> {
  const options = {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  }
  await fetch(`${BASE_URL}/record/${id}`, options)
}

export async function deleteRecord(id: string | number): Promise<void> {
  const options = {
    method: "DELETE"
  }
  await fetch(`${BASE_URL}/record/${id}`, options)
}
