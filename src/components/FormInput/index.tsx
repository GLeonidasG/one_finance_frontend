type FormInputProps = {
    inputType:  string,
    label:  string,
}
export function FormInput({ inputType, label }: FormInputProps) {
    return (
        <div className="flex justify-start flex-col my-5">
            <span className="font-sans font-semibold text-lg text-slate-200">{ label }</span>
            <div className="w-48 md:w-60 h-8 border-solid border-grey-400 rounded-xl border flex justify-start items-center">
                <input type={ inputType } name="email" className="px-1 outline-0 rounded-xl bg-transparent flex flex-1 autofill:!bg-transparent border-none text-slate-200" />
            </div>
        </div>
    )
}

