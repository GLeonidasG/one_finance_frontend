
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

