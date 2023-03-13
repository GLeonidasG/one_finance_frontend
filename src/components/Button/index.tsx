type ButtonProps = {
    label: string
}

export function Button({ label }: ButtonProps) {
    return (
        <div className="max-h-10 w-48 md:w-60 my-5 bg-purple-700 rounded-full flex flex-1 justify-center items-center">
            <span className="text-lg text-slate-100 font-sans">{ label }</span>
        </div>
    )
}