import { Record } from "../../../apis/records"
import { EmptyRecord } from "../RecordFormModal"

type DashboardTableProps = {
  records: Array<Record>;
  onClick?: (index: number) => void;
  onDelete?: (index: number) => void;
};

export function DashboardTable({ records, onClick, onDelete }: DashboardTableProps) {
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
              {headers.map((header, headerIndex) => {
                return (
                  <>
                    <td
                      onClick={() => !onClick ? () => { } : onClick(record.ID || 0)}
                      key={`${recordIndex}-${headerIndex}`}
                      className="pl-2 border border-slate-700 hover:cursor-pointer">{(record as any)[header]}
                    </td>
                  </>
                )
              }
              )}
              <td
                onClick={() => !onDelete ? () => { } : onDelete(record.ID || 0)}
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

