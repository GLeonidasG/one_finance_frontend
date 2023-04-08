
type FormSelect = {
  options: {key: string, value: unknown}[]
}

export function FormSelect({ options }: FormSelect) {
  return (
    <div>
      <select>
        {options.map(({ key, value }, index) =>
          <option key={index} value={value as any}>{key}</option>
        )}
      </select>
    </div>
  )
}
