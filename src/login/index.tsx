import { useState } from "react"
import { FormInput } from "../components/FormInput"
import { Button } from "../components/Button"

export default function LoginPage() {

  const [_email, setEmail] = useState("")
  const [_password, setPassword] = useState("")

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
