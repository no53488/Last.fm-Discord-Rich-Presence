const { app, BrowserWindow, Tray, Menu, shell, Notification } = require('electron/main');
const path = require('path');
const DiscordRPC = require('discord-rpc');
const prettyMilliseconds = require('pretty-ms');
const express = require('express');
const server = express();

const iconPath = path.join(__dirname, './icons/logo.ico');

let appIcon = null;
let status = false;

if (require('electron-squirrel-startup')) {
	app.quit();
}

server.use(express.json());

const client = new DiscordRPC.Client({ transport: 'ipc' });
client.on('error', error => {
	console.log(`An unexpected error occurred: ${error}`);
});

//Fetch function
server.post('/api/post-presence', (req, res) => {
	const { clientid, username, key } = req.body;
	if (status === true) {
		client.clearActivity().then(() => {
			status = false;
			console.log('Stopped Rich Presence\nThank you for using Last.fm Rich Presence');
		});
	} else {
		status = true;
		console.log('Started Rich Presence');
		async function fetchCurrentScrobble() {
			
            var GetRecentTrackCall = new Request(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${key}&format=json&limit=1`);

            const RecentsResponse = await fetch(GetRecentTrackCall);
            const RecentTracks = await RecentsResponse.json();

			/*if (!RecentTracks)
				return console.log(
					'An unexpected error occurred while fetching\nPlease check if the Last.fm username provided is correct\nRetrying in 30 seconds...'
			);*/
            
            let lastArtist = RecentTracks.recenttracks.track[0].artist['#text'];
            let lastTrackName = RecentTracks.recenttracks.track[0].name;

			var GetTrackInfo = new Request(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&user=${username}&api_key=${key}&artist=${lastArtist}&track=${lastTrackName}&format=json`);
            
			var fetchedTrack = await fetch(GetTrackInfo);
            var lastTrack = await fetchedTrack.json();

			if (lastTrack.message && lastTrack.message === 'Track not found') {
				var data = {
					artist: lastTrack.track.artist.name,
					album: lastTrack.track.album.title,
					trackName: lastTrack.track.name,
					trackUrl: lastTrack.track.url,
					playcount: '0',
					scrobbleStatus: !lastTrack.track['@attr']
						? `Last scrobbled ${prettyMilliseconds(Date.now() - lastTrack.track.date.uts * 1000)} ago
				`
						: 'Now scrobbling',
					cover: lastTrack.track.image[lastTrack.track.image.length - 1]['#text']
				};
			} else {
				var data = {
					artist: lastTrack.track.artist.name,
					album: lastTrack.track.album.title,
					trackName: lastTrack.track.name,
					trackUrl: lastTrack.track.url,
					playcount: lastTrack.track.userplaycount ? lastTrack.track.userplaycount : '0',
					scrobbleStatus: !lastTrack.track['@attr']
						? `Last scrobbled ${prettyMilliseconds(Date.now() - RecentTracks.recenttracks.track[0].date.uts * 1000)} ago
					`
						: 'Now scrobbling',
					cover:
						lastTrack.track.album.image[2]['#text'] ||
						'https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png' // Fixed no album bug - https://github.com/Monochromish/Last.fm-Discord-Rich-Presence/issues/3#issue-1157573199
				};
			}
			return data;
		}

		//Status update function
		async function updateStatus() {
			var data = await fetchCurrentScrobble();
            console.log(data);
			// Verifying Data
			let detailsStatus = 'Listening to';
			if (data.scrobbleStatus !== 'Now scrobbling') detailsStatus = `Was ${detailsStatus}`;
			let albumName = data.album;

			client
				.setActivity({
					details: `${detailsStatus} ${data.trackName}`,
					buttons: [
						{
							label: `View on Last.fm - ${data.playcount} Scrobbles`,
							url: data.trackUrl
						}
					],
					state: `by ${data.artist} on ${data.album}`,
					largeImageKey: data.cover,
					largeImageText: albumName,
					smallImageKey:
						'https://raw.githubusercontent.com/Monochromish/Last.fm-Discord-Rich-Presence/main/assets/play.gif',
					smallImageText: data.scrobbleStatus,
					instance: false
				})
				.then(() => {
					console.log('Updating Rich Presence');
				});
		}

		//Running the update status every 30 seconds
		setInterval(function () {
			updateStatus();
		}, 30000);

		//Logging in RPC
		client.login({ clientId: clientid }).then(function () {
			updateStatus();
		});
	}
});

app.whenReady().then(() => {
	let isQuiting;

	app.on('before-quit', function () {
		isQuiting = true;
	});

	const mainWindow = new BrowserWindow({
		autoHideMenuBar: false,
		width: 1280,
		height: 720,
		minWidth: 1024,
		minHeight: 550,
		maximizable: true,
		resizable: true,
		frame: true,
		icon: iconPath,
		show: false,
		autoHideMenuBar: true.valueOf,
		webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
			nodeIntegration: true,
			enableRemoteModule: true
		}
	});

	mainWindow.on('ready-to-show', mainWindow.show);
	mainWindow.loadFile(path.join(__dirname, 'index.html'));

	mainWindow.on('minimize', function (event) {
		new Notification({ title: `Minimizing to System Tray`, body: `Use the app icon on system tray to show again` }).show()
		event.preventDefault();
		mainWindow.hide();
	});
	
	mainWindow.on('close', function (event) {
		if(!isQuiting){
			new Notification({ title: `Minimizing to System Tray`, body: `Use the app icon on system tray to show again` }).show()
			event.preventDefault();
			mainWindow.hide();
		}
	
		return false;
	});

	appIcon = new Tray(iconPath);

	var contextMenu = Menu.buildFromTemplate([
		{
			label: 'Show App', click: () => mainWindow.show()
		},
		{
			label: 'Repository',
			click: function () {
				shell.openPath('https://github.com/Monochromish/Last.fm-Discord-Rich-Presence');
			}
		},
		{ label: 'Quit', type: 'normal', click: function() { 
			isQuiting = true;
			app.quit()
		} }
	]);

	appIcon.setToolTip('Last.fm Rich Presence');
	appIcon.setContextMenu(contextMenu);
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('new-window', function (e, url) {
	e.preventDefault();
	require('electron').shell.openExternal(url);
});

server.listen(3000, () => {
	console.log('Listening at http://localhost:3000');
});
