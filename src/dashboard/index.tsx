import { useEffect, useState } from "react";
import { FormInput } from "../login";

type Card = {
  cardID?: string,
  owner?: string,
  validFrom?: string | Date,
  validThru?: string | Date,
  title?: string
}

export function Card({ cardID, title, owner, validFrom, validThru }: Card) {

  return (
    <div className="flex flex-col w-4/5 p-2 my-2 bg-purple-700 shadow-lg opacity-100 h-44 rounded-2xl min-h-[165px]">
      <h1 className="text-lg font-medium tracking-normal text-left">{title}</h1>
      <h1 className="text-sm font-normal tracking-wide text-left">{owner}</h1>
      <div className="flex flex-row flex-1">
        <div className="flex flex-row items-center mr-4">
          <h1 className="text-xs font-light tracking-tighter text-left">valid <br /> from</h1>
          <h1 className="mx-2 text-xs font-light tracking-tighter text-left">{String(validFrom)}</h1>
        </div>
        <div className="flex flex-row items-center ml-4">
          <h1 className="text-xs font-light tracking-tighter text-left">valid <br /> thru</h1>
          <h1 className="mx-2 text-xs font-light tracking-tighter text-left">{String(validThru)}</h1>
        </div>
      </div>
      <h1 className="text-lg font-semibold tracking-wider text-left">{cardID}</h1>
    </div>
  )

}

const cards = [
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" }
];

type RecordType = "CREDIT" | "DEBIT";

type Record = {
  title: string,
  description: string,
  value: number,
  type: RecordType,
  entryDate: string
}

const records: Record[] = [
  { title: "UNISIONS", description: "Mensalidade da UNISIONS", value: 450, type: "DEBIT", entryDate: new Date().toISOString() },
  { title: "SALARIO", description: "Entrada do salario", value: 9500, type: "CREDIT", entryDate: new Date().toISOString() },
  { title: "Quiropraxia", description: "Quiropraxia", value: 310, type: "DEBIT", entryDate: new Date().toISOString() },
  { title: "Vale Ali/Ref", description: "Entrada dos vales", value: 850, type: "CREDIT", entryDate: new Date().toISOString() }
]


type FormModalAction = "CREATE" | "UPDATE";
type OnSubmitResult = { action: FormModalAction, value: Record }

type RecordFormModalProps = {
  showModal: boolean;
  onSubmit: (results: OnSubmitResult) => void;
  onCancel: () => void;
  action: FormModalAction;
  data?: Record | null
};

const EmptyRecord: Record = { title: "", description: "", entryDate: new Date().toISOString().substring(0, 10), type: "CREDIT", value: 0 };
function RecordFormModal({ showModal, onSubmit, onCancel, action, data }: RecordFormModalProps) {

  const [record, setRecord] = useState<Record>(data || EmptyRecord);

  useEffect(() => {
    console.log(data)
    if (data) setRecord(data)
  }, [data])

  return showModal ? (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 opacity-90 backdrop-blur-3xl">
      <div className="flex flex-col p-8 font-bold text-black bg-gray-700 rounded-lg opacity-100">
        <h1 className="text-xl font-semibold tracking-wide text-white">{action === "CREATE" ? "Create new record" : action === "UPDATE" && "Update current record"}</h1>
        <FormInput value={record.title} inputType="text" label="Title" onChange={(value) => setRecord({ ...record, title: value as string })} />
        <FormInput value={record.description} inputType="text" label="Description" onChange={(value) => setRecord({ ...record, description: value as string })} />
        <FormInput value={record.value} inputType="text" label="Value" onChange={(value) => setRecord({ ...record, value: isNaN(Number(value)) ? 0 : Number(value) })} />
        <FormInput value={record.type} inputType="text" label="Type" onChange={(value) => setRecord({ ...record, type: value as RecordType })} />
        <FormInput value={new Date(record.entryDate).toISOString().substring(0, 10)} inputType="date" label="Entry Date" onChange={(value) => setRecord({ ...record, entryDate: value as string })} />
        <button className="mt-5 mb-2 font-semibold tracking-wide text-center text-white" onClick={() => onSubmit({ action, value: record })}>Submit</button>
        <button className="my-2 font-semibold tracking-wide text-center text-white bg-transparent border-2 border-gray-300" onClick={() => {
          setRecord(EmptyRecord)
          onCancel()
        }}>Cancel</button>
      </div>
    </div>
  ) : null
}


type DashboardTableProps = {
  records: Record[];
  onClick?: (index: number) => void;
  onDelete?: (index: number) => void;
};

function DashboardTable({ records, onClick, onDelete }: DashboardTableProps) {
  const headers = Object.keys(EmptyRecord || {});
  return (
    <div className="w-full p-2 overflow-auto bg-gray-900 rounded-lg shadow-md h-min">
      <table className="w-full border border-collapse rounded-lg border-slate-500">
        <thead className="bg-gray-900 border-b-1 border-b-gray-50">
          <tr>
            {headers.map((header, index) => <th key={index} className="p-3 text-sm font-semibold tracking-wide text-left capitalize">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {records.map((record, recordIndex) =>
            <tr key={recordIndex} className={`even:bg-gray-800 odd:bg-gray-900`}>
              {headers.map((header, headerIndex) =>
                <>
                  <td
                    onClick={() => !onClick ? () => { } : onClick(recordIndex)}
                    key={`${recordIndex}-${headerIndex}`}
                    className="border border-slate-700 hover:cursor-pointer">{(record as any)[header]}
                  </td>
                </>
              )}
              <td
                onClick={() => !onDelete ? () => { } : onDelete(recordIndex)}
                key={`${recordIndex}-delete`}
                className="font-mono text-2xl font-bold text-center border border-slate-700 hover:cursor-pointer"
              >
                X
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [localRecords, setLocalRecords] = useState(records)
  const [recordToUpdate, setRecordToUpdate] = useState<Record | null>(null)
  const [lastIndex, setLastIndex] = useState<number | null>(null)

  const updateRecords = (record: Record) => {
    console.log(lastIndex)
    if (lastIndex !== null) {
      console.table({ lastIndex, record })
      localRecords[lastIndex] = record
      setLocalRecords(localRecords)
      setRecordToUpdate(null)
    }
  }

  const createRecords = (record: Record) => {
    setLocalRecords([...localRecords, record])
  }


  return (
    <div className="flex flex-1 m-6">
      <RecordFormModal
        onCancel={() => setShowModal(false)}
        showModal={showModal}
        data={recordToUpdate}
        action={recordToUpdate ? "UPDATE" : "CREATE"}
        onSubmit={({ value: record, action }) => {
          console.table({ record, action })
          if (action === "CREATE") createRecords(record)
          if (action === "UPDATE") updateRecords(record)
          setShowModal(false)
        }}
      />
      <div className="flex flex-col items-center flex-1 max-w-md p-4 m-2 overflow-scroll bg-gray-800 shadow-md rounded-xl opacity-90 backdrop:blur-lg">
        {cards.map((card) => <Card {...card} />)}
      </div>
      <div className="flex flex-col flex-1 p-3 bg-gray-800 rounded-xl backdrop:blur-lg opacity-90 table-container">
        <div className="flex flex-1 mb-5 max-h-12">
          <button onClick={() => setShowModal(true)}>Add record</button>
        </div>
        <DashboardTable
          onClick={(index) => {
            setRecordToUpdate(localRecords[index])
            setLastIndex(index)
            setShowModal(true)
          }}
          onDelete={(index) => {
            setLocalRecords(localRecords.filter((_, recordIndex) => recordIndex !== index))
          }}
          records={localRecords}
        />
      </div>
    </div>
  );
}
