<p align="center">
<img width="200" src="https://raw.githubusercontent.com/Monochromish/Last.fm-Discord-Rich-Presence/main/src/icons/logo.png" alt="Logo">
<br><br>
</p>

An elegant, efficient, easy-to-setup and arguably the best Last.fm discord rich presence! Written in Electron with daisyUI.
Now with Persistent values!

Supports GIF album covers and provides information such as `Track name`, `Track Album`, `Track Artist`, `Last Played`, `Your Scrobbles` and much more!
It will update your status every 30 seconds.

## Works with

This Last.FM Discord Rich Presence works with all music platforms that Last.fm supports including:

- [x] Spotify
- [x] iTunes or Apple Music
- [x] Youtube
- [x] Google Play Music
- [x] Tidal
- [x] Deezer
- [x] SoundCloud
- [x] Mixcloud
- [x] Bandcamp
- [x] Pandora

## Requirements

1. Node.js from [here](https://nodejs.org).
2. Last.fm account from [here](https://www.last.fm/join) and a Last.fm API from [here](https://www.last.fm/api/account/create).
3. **Optional** - A Discord Application from [here](https://discord.com/developers/applications)

## How to setup

1. Download the windows binary from the [releases tab](https://github.com/Monochromish/Last.fm-Discord-Rich-Presence/releases).
2. Run the setup. If you get a **Windows SmartScreen Protection Popup**, click on the `More info` button and then click on `Run anyway` button. Complete the setup and run the application.
3. Provide your details and then click on the `Enable/Disable` button.
4. Your details will be saved to `%appdata$\Roaming\Last.fm Rich Presence\config.json`.
5. Future launches of the application will read from this file, or overwrite username and key values if provided in the ui.

## Contribution and issues

Feel free to fork this repository and create pull requests, I will review them when I get notified.
To create an environment, you would have to open the root folder in a terminal and install the dependencies. Make sure no instances are already running, and run `npm run` to see build commands.

## Credits

| [![Monochromish](https://github.com/Monochromish.png?size=100)](https://github.com/Monochromish) 	|
|---	|
| [Monochromish](https://github.com/Monochromish) 	|

Code for this rich presence was originally written by [Monochromish](https://monolul.me), and updated by [Nathan Olson](https://felid.work). Please share this repository to support this project.
If you come across any errors or need help with setting up, feel free to reachout via email.
