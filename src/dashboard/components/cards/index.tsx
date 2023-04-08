import { getYearMonth } from "../../../apis/cards"

type CardProps = {
  ID: number | string,
  cardID: string,
  owner: string,
  validFrom: string | Date,
  validThru: string | Date,
  name: string,
  isSelected: boolean,
  onClick: (id: string | number) => void
}


export function CardContainer({ ID, cardID, name, owner, validFrom, validThru, onClick, isSelected }: CardProps) {

  return (
    <div onClick={() => { onClick(ID) }} className={`flex flex-col justify-evenly w-4/5 p-2 my-2 from-purple-900 via-indigo-600 to-sky-600 bg-gradient-to-t shadow-xl h-44 rounded-2xl min-h-[165px] hover:cursor-pointer ${isSelected ? "border-solid border-sky-500 border-2" : ""}`}>
      <h1 className="text-lg font-medium tracking-normal text-left">{name}</h1>
      <h1 className="self-center text-lg font-semibold tracking-wider text-left">{cardID}</h1>
      <div className="flex flex-row h-fit">
        <div className="flex flex-row items-center mr-4 h-fit">
          <h1 className="text-xs font-light tracking-tighter text-left">valid <br /> from</h1>
          <h1 className="mx-2 text-xs font-light tracking-tighter text-left">{getYearMonth(validFrom || "")}</h1>
        </div>
        <div className="flex flex-row items-center h-fit">
          <h1 className="my-0 text-xs font-light tracking-tighter text-left">valid <br /> thru</h1>
          <h1 className="m-0 mx-2 text-xs font-light tracking-tighter text-left">{getYearMonth(validThru || "")}</h1>
        </div>
      </div>
      <h1 className="m-0 text-xs tracking-wide text-left font-sm">{owner}</h1>
    </div>
  )

}
