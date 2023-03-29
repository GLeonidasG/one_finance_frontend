import { useState } from "react"
import { redirect } from "react-router-dom"
import { authentication } from "../main"

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

type ButtonProps = {
  label?: string,
  onClick?: Function,
  className?: string
}

export function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button
      className={className}
      onClick={() =>
        onClick
          ? onClick()
          : () => {
            console.log("event not captured");
          }
      }
    >
      {label}
    </button>
  );
}

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex flex-col items-center self-center justify-start p-5 bg-gray-800 shadow-lg min-w-fit min-h-fit rounded-3xl">
      <h2 className="text-2xl font-bold tracking-wider text-center">Welcome to One Finance</h2>
      <FormInput
        inputType="email"
        label="Email"
        onChange={(value) => setEmail(value as string)}
      />
      <FormInput
        inputType="password"
        label="Password"
        onChange={(value) => setPassword(value as string)}
      />
      <Button
        className="flex flex-1 py-2 m-2 max-h-fit"
        onClick={() => {
          // const isAuthenticated = authentication.authenticate({ username: email, password })
          // if (isAuthenticated) {
          //   redirect("/dashboard")
          // }
        }}
        label="Login"
      />
    </div>
  );
}
