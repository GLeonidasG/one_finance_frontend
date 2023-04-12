import { useState } from "react"
import { FormInput } from "../components/FormInput"

export default function LoginPage() {

  const [_email, setEmail] = useState("")
  const [_password, setPassword] = useState("")

  return (
    <div className="flex flex-col items-center self-center justify-start m-auto bg-gray-800 shadow-lg m:w-80 lg:w-96 p-7 min-w-fit min-h-fit rounded-2xl">
      <div className="my-3">
        <h2 className="text-lg font-bold tracking-wider text-center">Welcome to</h2>
        <h2 className="text-3xl font-bold tracking-wider text-center">One Finance</h2>
      </div>
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
      <button
        className="flex items-center justify-center flex-1 w-full py-2 my-4 max-h-fit"
        onClick={() => {
          // const isAuthenticated = authentication.authenticate({ username: email, password })
          // if (isAuthenticated) {
          //   redirect("/dashboard")
          // }
        }}
      >
      Login
      </button>
    <a>Sign In</a>
    </div>
  );
}
