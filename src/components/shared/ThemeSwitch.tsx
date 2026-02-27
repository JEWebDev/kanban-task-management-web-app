import { useTheme } from "next-themes";
import IconMoon from "../icons/IconMoon";
import IconSun from "../icons/IconSun";
import Switch from "./Switch";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-6 justify-center py-4 ml-6 bg-grey-200 dark:bg-black-600 rounded-md">
      <IconSun className="w-4.5 h-4" />
      <Switch
        onChange={() => {
          setTheme(theme === "light" ? "dark" : "light");
          console.log(theme);
        }}
        isChecked={theme === "dark"}
        ariaLabel="Change color theme"
      />
      <IconMoon className="w-4.5 h-4" />
    </div>
  );
}

export default ThemeSwitch;
