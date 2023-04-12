type FormInputProps = {
  inputType: string,
  label: string,
  value?: string | number,
  onChange: (value: unknown) => void
}
export function FormInput({ inputType, label, onChange, value }: FormInputProps) {
  return (
    <div className="flex flex-col items-start justify-start min-w-full" >

      <span style={{ fontSize: 15, color: "white", margin: 4 }}>{label}</span>
      <input
        onChange={({ target: { value } }) => onChange(value)}
        type={inputType}
        value={value}
        style={{
          borderRadius: 100,
          borderStyle: "solid",
          borderColor: "#f9f9f9",
          borderWidth: 1,
          minHeight: "35px",
          maxHeight: "55px",
          outline: "none",
          paddingInline: "8px",
          width: "100%",
          color: "white"
        }} />
    </div>
  )
}

