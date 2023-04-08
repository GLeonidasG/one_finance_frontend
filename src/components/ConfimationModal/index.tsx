
type ConfirmationModalProps = {
  showModal: boolean,
  onConfirm: () => void,
  onCancel: () => void,
  title: string,
  body: string,
  confirmText: string,
  cancelText: string
};

export function ConfirmationModal({ showModal, onConfirm, onCancel, title, body, confirmText, cancelText }: ConfirmationModalProps) {
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


