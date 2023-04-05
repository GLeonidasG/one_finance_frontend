import { useEffect, useState } from "react";
import { getRecordsFromCard, createRecord } from "../apis/records";
import { getUsers, User } from "../apis/users";
import { FormInput } from "../login";
import { CardContainer } from "./components/cards";

type RecordType = "CREDIT" | "DEBIT";

type Record = {
  id?: number,
  title: string,
  description: string,
  value: number,
  type: RecordType,
  entryDate: string,
}

type FormModalAction = "CREATE" | "UPDATE";
type OnSubmitResult = { action: FormModalAction, value: Record }

type RecordFormModalProps = {
  showModal: boolean;
  onSubmit: (results: OnSubmitResult) => void;
  onCancel: () => void;
  action: FormModalAction;
  data?: Record | null
};

const EmptyRecord: Record = { title: "", description: "", entryDate: new Date().toLocaleDateString().substring(0, 10), type: "CREDIT", value: 0 };
function RecordFormModal({ showModal, onSubmit, onCancel, action, data }: RecordFormModalProps) {

  const [record, setRecord] = useState<Record>(data || EmptyRecord);

  useEffect(() => {
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

type ConfirmationModalProps = {
  showModal: boolean,
  onConfirm: () => void,
  onCancel: () => void,
  title: string,
  body: string,
  confirmText: string,
  cancelText: string
};

function ConfirmationModal({ showModal, onConfirm, onCancel, title, body, confirmText, cancelText }: ConfirmationModalProps) {
  return showModal ? (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 opacity-90 backdrop-blur-3xl">
      <div className="flex flex-col p-8 font-bold text-black bg-gray-700 rounded-lg opacity-100 w-80">
        <h1 className="my-2 font-sans text-xl font-semibold tracking-wide text-center text-white">{title}</h1>
        <p className="my-1 font-sans text-base font-normal tracking-normal text-center text-white">{body}</p>
        <div className="flex justify-between flex-1 flex-rol">
          <button className="mx-2 my-2 text-white w-28" onClick={() => onConfirm()}>{confirmText}</button>
          <button className="mx-2 my-2 text-white w-28" onClick={() => onCancel()}>{cancelText}</button>
        </div>
      </div>
    </div>
  ) : null
}


type DashboardTableProps = {
  records: Array<Record>;
  onClick?: (index: number) => void;
  onDelete?: (index: number) => void;
};

function DashboardTable({ records, onClick, onDelete }: DashboardTableProps) {
  const headers = Object.keys(EmptyRecord || {});
  return (
    <div className="w-full h-full p-2 overflow-auto bg-gray-900 rounded-lg shadow-md">
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
                    onClick={() => !onClick ? () => { } : onClick(record.id || 0)}
                    key={`${recordIndex}-${headerIndex}`}
                    className="pl-2 border border-slate-700 hover:cursor-pointer">{(record as any)[header]}
                  </td>
                </>
              )}
              <td
                onClick={() => !onDelete ? () => { } : onDelete(record.id || 0)}
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
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showConfirmation, setShowConfimation] = useState(false)
  const [localRecords, setLocalRecords] = useState<Array<Record>>([])
  const [recordToUpdate, setRecordToUpdate] = useState<Record | null>(null)
  const [lastIndex, setLastIndex] = useState<number | null>(null)
  const [currentCard, setCurrentCard] = useState<number>()

  useEffect(() => {
    getUsers(3).then((user) => setCurrentUser(user))
  }, [])

  const updateRecords = (record: Record) => {
    if (lastIndex !== null) {
      localRecords[lastIndex] = record
      setLocalRecords(localRecords)
      setRecordToUpdate(null)
    }
  }

  const createRecords = (record: Record) => {
    if (!record && !currentCard) return;
    createRecord({
      title: record.title,
      description: record.description,
      entryDate: new Date(record.entryDate),
      type: record.type,
      value: record.value,
      recordsFromCardId: currentCard as number
    }).then(() => {
      setLocalRecords([...localRecords, record]);
    });
  }


  return (
    <div className="flex flex-1 m-6">
      <ConfirmationModal
        onConfirm={() => {
          if (lastIndex !== null) {
            setLocalRecords(localRecords.filter((_, index) => index !== lastIndex));
          }
          setShowConfimation(false);
        }}
        onCancel={() => {
          setLastIndex(null);
          setShowConfimation(false);
        }}
        title="Delete record"
        body="You are about to remove a record from the list. Are you sure?"
        confirmText="Yes"
        cancelText="No"
        showModal={showConfirmation}
      />
      <RecordFormModal
        onCancel={() => {
          setRecordToUpdate(null);
          setLastIndex(null);
          setShowModal(false);
        }}
        showModal={showModal}
        data={recordToUpdate}
        action={recordToUpdate ? "UPDATE" : "CREATE"}
        onSubmit={({ value: record, action }) => {
          console.table({ record, action });
          if (action === "CREATE") createRecords(record);
          if (action === "UPDATE") updateRecords(record);
          setShowModal(false);
        }}
      />
      <div className="flex flex-col items-center flex-1 max-w-md p-4 m-2 overflow-scroll bg-gray-800 shadow-md rounded-xl opacity-90 backdrop:blur-lg">
        {currentUser?.cards.map((card, index) => (
          <CardContainer
            onClick={(id) => {
              getRecordsFromCard(id)
                .then((records) => {
                  setLocalRecords(records)
                  setCurrentCard(Number(id))
                })
            }}
            ID={card.ID}
            key={index}
            cardID={card.cardID}
            name={card.name}
            owner={currentUser.username}
            validFrom={card.validFrom}
            validThru={card.validThru}
          />
        ))}
      </div>
      <div className="flex flex-col flex-1 p-3 bg-gray-800 rounded-xl backdrop:blur-lg opacity-90 table-container">
        <div className="flex flex-1 mb-5 max-h-12">
          <button onClick={() => setShowModal(true)}>Add record</button>
        </div>
        <DashboardTable
          onClick={(index) => {
            setRecordToUpdate(localRecords.find(record => record.id === index) || null);
            setLastIndex(index);
            setShowModal(true);
          }}
          onDelete={(index) => {
            setLastIndex(index);
            setShowConfimation(true);
          }}
          records={localRecords}
        />
      </div>
    </div>
  );
}
