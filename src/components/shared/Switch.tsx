interface SwitchProps {
  onChange: () => void;
  isChecked: boolean;
  ariaLabel: string;
}

function Switch({ onChange, isChecked, ariaLabel }: SwitchProps) {
  return (
    <div className="flex items-center">
      <label
        className="w-10 h-5 bg-purple-500 rounded-xl p-0.75 hover:cursor-pointer"
        htmlFor="switch"
      >
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isChecked}
          role="switch"
          aria-label={ariaLabel}
          id="switch"
          onChange={onChange}
        />
        <span className="w-3.5 h-3.5 bg-white rounded-full block peer-checked:translate-x-5 transition-transform"></span>
        <span className="sr-only">{ariaLabel}</span>
      </label>
    </div>
  );
}

export default Switch;
