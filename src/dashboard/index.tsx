
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

type Record = {
  title: string,
  description: string,
  value: number,
  type: "CREDIT" | "DEBIT",
  entryDate: string
}

const records: Record[] = [
  { title: "UNISIONS", description: "Mensalidade da UNISIONS", value: 450, type: "DEBIT", entryDate: new Date().toISOString() },
  { title: "SALARIO", description: "Entrada do salario", value: 9500, type: "CREDIT", entryDate: new Date().toISOString() },
  { title: "Quiropraxia", description: "Quiropraxia", value: 310, type: "DEBIT", entryDate: new Date().toISOString() },
  { title: "Vale Ali/Ref", description: "Entrada dos vales", value: 850, type: "CREDIT", entryDate: new Date().toISOString() }
]


function DashboardTable({ records }: { records: Record[] }) {
  const headers = Object.keys(records[0]);
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
                <td key={`${recordIndex}-${headerIndex}`} className="border border-slate-700 ...">{(record as any)[header]}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="flex flex-1 m-6">
      <div className="flex flex-col items-center flex-1 max-w-md p-4 m-2 overflow-scroll bg-gray-800 shadow-md rounded-xl opacity-90 backdrop:blur-lg">
        {cards.map((card) => <Card {...card} />)}
      </div>
      <div className="flex flex-col flex-1 p-3 bg-gray-800 rounded-xl backdrop:blur-lg opacity-90 table-container">
        <div className="flex flex-1 mb-5 max-h-12">
          <button>Add record</button>
        </div>
        <DashboardTable records={records} />
      </div>
    </div>
  );
}
