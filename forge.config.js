module.exports = {
    packagerConfig: {
        win32metadata: "Nathan Olson"
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
        {
          name: '@electron-forge/maker-flatpak',
          config: {
            options: {
              categories: ['Video'],
              mimeType: ['video/h264']
            }
          }
        }
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
  ]
};