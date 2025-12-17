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
                certificatePassword: process.env.CERTIFICATE_PASSWORD
            },
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {},
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {},
        },
    ],
    publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'no53488',
          name: 'Last.fm-Discord-Rich-Presence'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
};