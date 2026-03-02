interface PrimaryButtonProps {
  children: React.ReactNode;
}
function PrimaryButton({ children }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className="px-4.5 py-2 md:px-6 md:py-2 bg-purple-500 rounded-3xl flex items-center justify-center enabled:hover:cursor-pointer hover:bg-purple-300 disabled:opacity-25 disabled:hover:bg-purple-500 disabled:hover:cursor-not-allowed text-white body-l text-[13px] font-bold"
    >
      {children}
    </button>
  );
}
export default PrimaryButton;
