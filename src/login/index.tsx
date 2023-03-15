import { useState } from "react"

type FormInputProps = {
    inputType: string,
    label: string,
    onChange: (value: unknown) => void
}
export function FormInput({ inputType, label, onChange }: FormInputProps) {
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
                style={{
                    borderRadius: 100,
                    borderStyle: "solid",
                    borderColor: "#f9f9f9",
                    borderWidth: 1,
                    minHeight: "30px",
                    maxHeight: "45px",
                    outline: "none",
                    paddingInline: "5px",
                    width: "100%"
                }} />
        </div>
    )
}

type ButtonProps = {
    label?: string,
    onClick?: Function
}

export function Button({ label, onClick }: ButtonProps) {
    return (
      <button
        onClick={() =>
          onClick
            ? onClick()
            : () => {
                console.log("event not captured");
              }
        }
        style={{ marginTop: 5, marginBottom: 5 }}
      >
        {label}
      </button>
    );
}

const USER_AUTH_STORAGE_KEY = "user_auth"
export async function setUser(user: {email: string, password: string}): Promise<void> {
  localStorage.setItem(USER_AUTH_STORAGE_KEY, JSON.stringify(user));
}

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.table({ email, password });
    return (
      <div
        style={{
          backgroundColor: "#2A292E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          minWidth: 400,
          height: 300,
          borderRadius: 25,
          boxShadow: "1px 3px 5px #303030",
          alignSelf: "center",
        }}
      >
        <h2>Login</h2>
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
          onClick={() => {
            setUser({ email, password });
            console.log(localStorage.getItem(USER_AUTH_STORAGE_KEY));
          }}
          label="Login"
        />
      </div>
    );
}
