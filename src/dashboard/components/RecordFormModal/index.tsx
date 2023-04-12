import { useState, useEffect } from "react"
import { Record } from "../../../apis/records"
import { FormSelect } from "../../../components/FormSelect"
import { FormInput } from "../../../components/FormInput"

type FormModalAction = "CREATE" | "UPDATE";
type OnSubmitResult = { action: FormModalAction, value: Record }

type RecordFormModalProps = {
  showModal: boolean;
  onSubmit: (results: OnSubmitResult) => void;
  onCancel: () => void;
  action: FormModalAction;
  data?: Record | null
};

const RecordTypes = [
  { key: "Credit", value: "CREDIT" },
  { key: "Debit", value: "DEBIT" },
]

export const EmptyRecord: Record = { ID: 0, title: "", description: "", entryDate: new Date().toLocaleDateString().substring(0, 10), type: "CREDIT", value: 0 };

export function RecordFormModal({ showModal, onSubmit, onCancel, action, data }: RecordFormModalProps) {

  const [record, setRecord] = useState<Record>(data || EmptyRecord);

  useEffect(() => {
    if (data) setRecord(data)
  }, [data])

  return showModal ? (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 opacity-90 backdrop-blur-3xl">
      <div className="flex flex-col p-8 font-bold text-black bg-gray-700 rounded-lg opacity-100 lg:w-96 m:w-80">
        <h1 className="text-xl font-semibold tracking-wide text-white">{action === "CREATE" ? "Create new record" : action === "UPDATE" && "Update current record"}</h1>
        <FormInput value={record.title} inputType="text" label="Title" onChange={(value) => setRecord({ ...record, title: value as string })} />

        <FormInput value={record.description} inputType="text" label="Description" onChange={(value) => setRecord({ ...record, description: value as string })} />

        <FormInput value={record.value} inputType="text" label="Value" onChange={(value) => setRecord({ ...record, value: isNaN(Number(value)) ? 0 : Number(value) })} />

        <FormSelect label="Type" options={RecordTypes} />

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

