const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
        win32metadata: "Nathan Olson",
        asar: true,
        name: "last-fm-rich-presence",
        executableName: "LastFM-RPC"
  },
  makers: [
    {
        name: "@electron-forge/maker-squirrel",
        config: {
            authors: "Nathan Olson and Monochromish",
            description: "An elegant, efficient, easy-to-setup and arguably the best Last.fm discord rich presence!",
            certificateFile: "./cert.pfx",
            certificatePassword: process.env.CERTIFICATE_PASSWORD,
            iconUrl: "https://raw.githubusercontent.com/Monochromish/Last.fm-Discord-Rich-Presence/main/src/icons/logo.png",
            setupUrl: "/src/icons/logo.ico",
        },
    },
    /*{
      name: '@electron-forge/maker-flatpak',
      config: {
        options: {
          categories: ['Video'],
          mimeType: ['video/h264']
        }
      }
    },*/
    /* {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Nathan Olson',
          homepage: 'https://felid.work',
        }
      }
    }*/
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'no53488',
          name: 'Last-fm-Discord-Rich-Presence'
        },
        prerelease: false,
        draft: true
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};