type FormInputProps = {
  inputType: string,
  label: string,
  value?: string | number,
  onChange: (value: unknown) => void
}
export function FormInput({ inputType, label, onChange, value }: FormInputProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      minWidth: "250px",
      maxWidth: "300px",
    }}>

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
          minHeight: "30px",
          maxHeight: "45px",
          outline: "none",
          paddingInline: "5px",
          width: "100%",
          color: "white"
        }} />
    </div>
  )
}

