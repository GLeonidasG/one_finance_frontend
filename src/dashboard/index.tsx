import { useEffect, useState } from "react";
import { getRecordsFromCard, createRecord, Record, updateRecord, deleteRecord } from "../apis/records";
import { getUsers, User } from "../apis/users";
import { CardContainer } from "./components/cards";
import { ConfirmationModal } from "../components/ConfimationModal"
import { RecordFormModal } from "./components/RecordFormModal"
import { DashboardTable } from "./components/DashboardTable"
import { CardsFormModal } from "./components/CardsFormModal";
import { createCard, deleteCard, updateCard } from "../apis/cards";

export default function Dashboard() {
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showConfirmation, setShowConfimation] = useState(false)
  const [localRecords, setLocalRecords] = useState<Array<Record>>([])
  const [recordToUpdate, setRecordToUpdate] = useState<Record | null>(null)
  const [lastIndex, setLastIndex] = useState<number | null>(null)
  const [currentCard, setCurrentCard] = useState<number | null>()

  useEffect(() => {
    getUsers(3).then((user) => {
      setCurrentUser(user)
      const cardID = user.cards[0] !== undefined ? user.cards[0].ID : null
      setCurrentCard(cardID)
      if (cardID !== null) {
        getRecordsFromCard(cardID).then((records) => {
          setLocalRecords(records)
        })
      }
    })
  }, [])

  const updateRecords = (record: Record) => {
    if (lastIndex !== null && currentCard !== null && currentCard !== undefined) {
      updateRecord(lastIndex, { ...record, recordsFromCardId: currentCard })
        .then(() => {
          getRecordsFromCard(currentCard).then((records) => {
            setLocalRecords(records)
            setRecordToUpdate(null)

          })
        })
    }
  }

  const createRecords = (record: Record) => {
    if (!record || currentCard == undefined || currentCard == null) return;
    createRecord({
      title: record.title,
      description: record.description,
      entryDate: new Date(record.entryDate),
      type: record.type,
      value: record.value,
      recordsFromCardId: currentCard
    }).then(() => {
      getRecordsFromCard(currentCard).then(records => setLocalRecords(records))
    });
  }

  function cancelDelete() {
    setLastIndex(null);
    setShowConfimation(false);
  };

  function confirmDelete() {
    if (lastIndex !== null) {
      deleteRecord(lastIndex)
        .then(() => {
          getRecordsFromCard(currentCard as number)
            .then((records) => setLocalRecords(records));
        });
    }
    setShowConfimation(false);
  }

  function cancelRecord() {
    setRecordToUpdate(null);
    setLastIndex(null);
    setShowRecordModal(false);
  }

  function submitRecord({ value: record, action }: any) {
    if (action === "CREATE") createRecords(record);
    if (action === "UPDATE") updateRecords(record);
    setShowRecordModal(false);
  }

  function generateCards() {
    return currentUser?.cards.map((card, index) => (
      <CardContainer
        onClick={onClick}
        onDelete={onDelete}
        isSelected={card.ID === currentCard}
        ID={card.ID}
        key={index}
        cardID={card.cardID}
        name={card.name}
        owner={currentUser.username}
        validFrom={card.validFrom}
        validThru={card.validThru} />
    ));

    function onDelete(id: string | number): void {
      deleteCard(id)
        .then(() => {
          getUsers(3).then((user) => {
            setCurrentUser(user)
            setCurrentCard(user.cards[0].ID)
            getRecordsFromCard(user.cards[0].ID).then((records) => {
              setLocalRecords(records)
            })
          })
        })
    }

    function onClick(id: string | number): void {
      getRecordsFromCard(id)
        .then((records) => {
          setLocalRecords(records);
          setCurrentCard(Number(id));
        });
    }
  }

  function onSubmitCard({ action, value: card }: any) {
    if (!currentUser) return
    console.log(card)
    if (action === "CREATE") {
      createCard({ ...card, belongsToUserID: currentUser.ID })
        .then(() => {
          setShowCardModal(false)
          getUsers(currentUser.ID)
            .then((value) => {
              setCurrentUser(value)
            })

        })
    }
    if (action === "UPDATE") {
      updateCard(lastIndex || "", { ...card, belongsToUserID: currentUser.ID })
      setLastIndex(null)
      setShowCardModal(false)
      getUsers(3)
        .then((value) => {
          setCurrentUser(value)
        })
    }
  }

  return (
    <div className="flex flex-1 m-6">
      <ConfirmationModal
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete record"
        body="You are about to remove a record from the list. Are you sure?"
        confirmText="Yes"
        cancelText="No"
        showModal={showConfirmation}
      />
      <RecordFormModal
        onCancel={cancelRecord}
        showModal={showRecordModal}
        data={recordToUpdate}
        action={recordToUpdate ? "UPDATE" : "CREATE"}
        onSubmit={submitRecord}
      />
      <CardsFormModal
        showModal={showCardModal}
        action="CREATE"
        onCancel={() => setShowCardModal(false)}
        onSubmit={onSubmitCard}
      />


      <div className="flex flex-col items-center flex-1 max-w-md p-4 mr-2 overflow-scroll bg-gray-800 shadow-md rounded-xl opacity-90 backdrop:blur-lg">
        <div className="flex flex-1 w-4/5 max-h-12">
          <button
            className="self-start"
            onClick={() => setShowCardModal(true)}>
            Add cards
          </button>
        </div>
        {generateCards()}
      </div>

      <div className="flex flex-col flex-1 p-3 ml-2 bg-gray-800 rounded-xl backdrop:blur-lg opacity-90">
        <div className="mb-5 max-h-12">
          <button onClick={() => setShowRecordModal(true)}>Add record</button>
        </div>
        <DashboardTable
          onClick={(index) => {
            setRecordToUpdate(localRecords.find(record => record.ID === index) || null);
            setLastIndex(index);
            setShowRecordModal(true);
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
