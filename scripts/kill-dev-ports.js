const { execSync } = require("child_process");

const ports = [3000, 3001, 3002];
const DEV_PORT = 3000;

function killWindowsPort(port) {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    const pids = new Set();

    for (const line of out.split("\n")) {
      if (!line.includes("LISTENING")) continue;
      const pid = line.trim().split(/\s+/).pop();
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`Stopped process ${pid} on port ${port}`);
      } catch {
        // already exited
      }
    }
  } catch {
    // port is free
  }
}

if (process.platform === "win32") {
  for (const port of ports) killWindowsPort(port);
  // Give Windows a moment to release the port
  execSync("powershell -Command Start-Sleep -Seconds 1", { stdio: "ignore" });
}

console.log(`Dev server will use http://localhost:${DEV_PORT}`);
