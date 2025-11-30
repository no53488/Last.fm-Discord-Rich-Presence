const fs = require("fs");
const path = require("path");
const { contextBridge, app } = require("electron");

const configPath = path.join(app.getPath("userData"), "config.json");

function readConfig() {
    if (!fs.existsSync(configPath)) return {};
    const raw = fs.readFileSync(configPath, "utf8");
    return JSON.parse(raw);
}

function writeConfig(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
}

contextBridge.exposeInMainWorld("configApi", {
    read: readConfig,
    write: writeConfig
});
