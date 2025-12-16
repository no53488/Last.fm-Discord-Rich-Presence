const { app } = require("electron");

const fs = require("fs")

const defaultConfig = [ "","","" ];

let config;

function loadConfig() {
    let resourcePath = path.join(app.getPath('appData'),"config.json");
    let configPath = resourcePath + "config.json";

    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
        config = defaultConfig;
    } else {
        config = JSON.parse(fs.readFileSync(configPath , 'utf8'));
    };
}

function writeConfig(clientid, username, key) {
    let configPath = path.join(app.getPath('appData'),"config.json");
    config = JSON.stringify({
        clientid,
        username,
        key
    })
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = {loadConfig, writeConfig}

