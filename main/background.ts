import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      webSecurity: false,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./index.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

/* Updater ======================================================*/

autoUpdater.on("checking-for-update", () => {
  log.info("업데이트 확인 중...");
});
autoUpdater.on("update-available", (info) => {
  log.info("업데이트가 가능합니다.");
});
autoUpdater.on("update-not-available", (info) => {
  log.info("현재 최신버전입니다.");
});
autoUpdater.on("error", (err) => {
  log.info("에러가 발생하였습니다. 에러내용 : " + err);
});
autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
  log_message = log_message + " - 현재 " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  log.info(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
  log.info("업데이트가 완료되었습니다.");
});

/* Electron =====================================================*/

/** 초기화가 끝나게 되면 실행 */
app.on("ready", () => {
  // 메인 창 생성
  (async () => {
    await app.whenReady();

    const mainWindow = createWindow("main", {
      width: 1000,
      height: 600,
      webPreferences: {
        webSecurity: false,
      },
    });

    if (isProd) {
      await mainWindow.loadURL("app://./index.html");
    } else {
      const port = process.argv[2];
      await mainWindow.loadURL(`http://localhost:${port}`);
      mainWindow.webContents.openDevTools();
    }
  })();

  // 자동 업데이트 등록
  autoUpdater.checkForUpdates();
});

/** [생명주기] 모든 창이 닫히면 자동으로 앱 종료 */
app.on("window-all-closed", () => {
  app.quit();
});
