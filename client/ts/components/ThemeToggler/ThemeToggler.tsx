import ToggleSwitch from "$client/components/ToggleSwitch/ToggleSwitch";

export default function ThemeToggler() {
  const localStorageKey = "app_theme";
  const root = document.documentElement;

  const toggleTheme = (checked: boolean) => {
    root.dataset.theme = checked
      ? "dark"
      : "light";
    localStorage.setItem(localStorageKey, root.dataset.theme);
  };

  root.dataset.theme = localStorage.getItem(localStorageKey) ?? "light";

  return (
    <ToggleSwitch
      id="theme-toggler"
      value={root.dataset.theme === "dark"}
      updateValue={toggleTheme}
      title="Color theme"
    />
  );
}