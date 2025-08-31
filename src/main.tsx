import ReactDOM from "react-dom/client";
import App from "./App";
// Supports weights 300-700
import '@fontsource-variable/space-grotesk';
import "./index.css"
import { TrayIcon } from '@tauri-apps/api/tray';
import { defaultWindowIcon } from '@tauri-apps/api/app';

async function setTrayIcon(){
  const options = {
    icon: await defaultWindowIcon(),
  };

  await TrayIcon.new(options as any);
}

setTrayIcon()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
);
