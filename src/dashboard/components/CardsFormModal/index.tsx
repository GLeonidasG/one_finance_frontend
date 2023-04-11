import { useState } from "react"
import { CreateCard } from "../../../apis/cards"
import { FormInput } from "../../../components/FormInput"

type Action = "CREATE" | "UPDATE"

type OnSubmitResult = {
  action: Action,
  value: CreateCardSimplified
}

type CardsFormModalProps = {
  showModal: boolean,
  action: Action,
  onSubmit: (results: OnSubmitResult) => void,
  onCancel: () => void
}

type CreateCardSimplified = Omit<CreateCard, "belongsToUserID" | "_validThru" | "_validFrom">

const EmptyCard: CreateCardSimplified = {
  cardID: "",
  name: "",
  validFrom: "",
  validThru: "",
}

export function CardsFormModal({ showModal, onCancel, onSubmit, action }: CardsFormModalProps) {
  const [card, setCard] = useState<CreateCardSimplified>(EmptyCard)
  return showModal ? (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 opacity-90 backdrop-blur-3xl">
      <div className="flex flex-col p-8 font-bold text-black bg-gray-700 rounded-lg opacity-100">
        <h1 className="text-xl font-semibold tracking-wide text-white">{action === "CREATE" ? "Create new card" : action === "UPDATE" && "Update current card"}</h1>
        <FormInput inputType="text" label="Title" onChange={(value) => setCard({...card, name: value as string})} />
        <FormInput inputType="text" label="Card ID" onChange={(value) => setCard({...card, cardID: value as string})} />
        <FormInput inputType="date" label="Valid from" onChange={(value) => setCard({...card, validFrom: value as string})} />
        <FormInput inputType="date" label="Valid thru" onChange={(value) => setCard({...card, validThru: value as string})} />
        <button className="mt-5 mb-2 font-semibold tracking-wide text-center text-white" onClick={() => onSubmit({ action, value: card })}>Submit</button>
        <button className="my-2 font-semibold tracking-wide text-center text-white bg-transparent border-2 border-gray-300" onClick={() => {
          setCard(EmptyCard)
          onCancel()
        }}>Cancel</button>
      </div>
    </div>
  ) : null
}
