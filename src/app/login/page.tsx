import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";

export default function Home() {
    return (
        <main className="h-screen w-screen bg-cover bg-scroll bg-[url('/background-landscape.jpeg')] flex">
            <div className="bg-gray-800 bg-opacity-25 backdrop-blur-md flex justify-center items-center flex-1">
                <div className="py-10 sm:w-96 md:w-1/4 lg:w-1/5 md:h-2/5 sm:h-3/4 bg-slate-800 rounded-2xl shadow-md flex flex-col justify-start items-center">

                    <h2 className="text-3xl text-slate-200 font-sans">Login</h2>
                    <FormInput inputType="email" label="Email"/>
                    <FormInput inputType="password" label="Password"/>

                    <Button label="Login"/>

                </div>
            </div>
        </main>
    )
}