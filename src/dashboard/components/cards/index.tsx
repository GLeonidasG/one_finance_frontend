import {getYearMonth} from "../../../apis/cards"

type CardProps = {
  ID: number | string,
  cardID: string,
  owner: string,
  validFrom: string | Date,
  validThru: string | Date,
  name: string,
  onClick: (id: string | number) => void
}


export function CardContainer({ ID, cardID, name, owner, validFrom, validThru, onClick }: CardProps) {

  return (
    <div onClick={() => {onClick(ID)}} className="flex flex-col w-4/5 p-2 my-2 bg-purple-700 shadow-lg opacity-100 h-44 rounded-2xl min-h-[165px] hover:cursor-pointer">
      <h1 className="text-lg font-medium tracking-normal text-left">{name}</h1>
      <h1 className="text-sm font-normal tracking-wide text-left">{owner}</h1>
      <div className="flex flex-row flex-1">
        <div className="flex flex-row items-center mr-4">
          <h1 className="text-xs font-light tracking-tighter text-left">valid <br /> from</h1>
          <h1 className="mx-2 text-xs font-light tracking-tighter text-left">{getYearMonth(validFrom || "")}</h1>
        </div>
        <div className="flex flex-row items-center ml-4">
          <h1 className="text-xs font-light tracking-tighter text-left">valid <br /> thru</h1>
          <h1 className="mx-2 text-xs font-light tracking-tighter text-left">{getYearMonth(validThru || "")}</h1>
        </div>
      </div>
      <h1 className="text-lg font-semibold tracking-wider text-left">{cardID}</h1>
    </div>
  )

}
