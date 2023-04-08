
type FormSelect = {
  options: {key: string, value: unknown}[],
  label: string
}

export function FormSelect({ options, label }: FormSelect) {
  return (
    <div className="flex flex-col flex-1">
      <span className="m-1 text-slate-50">{label}</span>
      <select className="h-8 px-1 border border-solid rounded-full outline-none text-slate-50 border-slate-50">
        {options.map(({ key, value }, index) =>
          <option key={index} value={value as any}>{key}</option>
        )}
      </select>
    </div>
  )
}
