interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}
function SecondaryButton({
  children,
  onClick,
  className,
  disabled,
}: SecondaryButtonProps) {
  return (
    <button
      type="button"
      className={`w-full py-2 rounded-[20px] bg-purple-500/10 dark:bg-white text-purple-500 body-l font-bold text-[13px] flex justify-center hover:cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default SecondaryButton;
