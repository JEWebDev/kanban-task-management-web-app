interface ColumnProps {
  title: string;
  dotColor: string;
  taskCount: number;
  children: React.ReactNode;
}
function Column({ title, dotColor, taskCount, children }: ColumnProps) {
  return (
    <section className="h-full w-70 flex flex-col gap-6 shrink-0">
      <h3 className="heading-s text-grey-400 uppercase flex items-center gap-3">
        <span className={`bg-[${dotColor}] w-3.75 h-3.75 rounded-full`}></span>
        {title} ({taskCount})
      </h3>
      <div className="flex flex-col flex-1 min-h-0 gap-6 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </section>
  );
}
export default Column;
