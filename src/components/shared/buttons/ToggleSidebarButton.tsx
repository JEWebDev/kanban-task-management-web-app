import IconShowSidebar from "@/components/icons/IconShowSidebar";
import { useSidebarStore } from "@/stores/sidebar";

function ToggleSidebarButton() {
  const sidebarIsOpen = useSidebarStore((state) => state.SidebarIsOpen);
  const setSidebarIsOpen = useSidebarStore((state) => state.setSidebarIsOpen);
  return (
    <button
      className={`bottom-8 left-0 p-5 bg-purple-500 rounded-tr-full rounded-br-full hover:cursor-pointer hover:bg-purple-300 ${sidebarIsOpen ? "hidden" : "absolute"}`}
      onClick={() => {
        setSidebarIsOpen(!sidebarIsOpen);
      }}
    >
      <IconShowSidebar className="w-4 h-2.75" />
    </button>
  );
}

export default ToggleSidebarButton;
