import {
    getCurrentWindow,
    PhysicalPosition,
    currentMonitor,
} from "@tauri-apps/api/window";

export async function screen() {
    const win = await getCurrentWindow();
    const monitor = await currentMonitor();

    if (!monitor) {
        console.error("Monitor not found");
        return;
    }

    const screenWidth = monitor.size.width;
    const screenHeight = monitor.size.height;
    const appSize = await win.innerSize(); // Your app window size
    console.log(screenWidth, screenHeight, appSize)

    const x = (screenWidth - appSize.width) / 2;
    const y = (screenHeight - appSize.height) / 2;

    await win.setPosition(new PhysicalPosition(x, y));
}
