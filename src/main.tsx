import ReactDOM from "react-dom/client";
import App from "./App";
// Supports weights 300-700
import '@fontsource-variable/space-grotesk';
import "./index.css"
import { TrayIcon } from '@tauri-apps/api/tray';
import { defaultWindowIcon } from '@tauri-apps/api/app';

import { check } from '@tauri-apps/plugin-updater';
import { ask } from '@tauri-apps/plugin-dialog';

async function checkForAppUpdates() {
  const update = await check();

  if (update) {
    const yes = await ask(`Update to ${update.version} is available!\n\nRelease notes: ${update.body}`, {
      title: 'Update Available',
      kind: 'info',
      okLabel: 'Update',
      cancelLabel: 'Cancel'
    });
    if (yes) {
      await update.downloadAndInstall();
    }
  }
}

async function setTrayIcon(){
  const options = {
    icon: await defaultWindowIcon(),
  };

  await TrayIcon.new(options as any);
}

setTrayIcon()
checkForAppUpdates()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
);
