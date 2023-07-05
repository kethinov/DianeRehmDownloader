<img src='https://raw.githubusercontent.com/kethinov/DianeRehmDownloader/master/images/dianerehmdownloaderlogo.png' alt='Diane Rehm Downloader' width='128' height='128'>

**NOTE: NO LONGER MAINTAINED.**

While this project is somewhat useless now that Diane Rehm doesn't do a daily show anymore, back when she broadcasted daily, [The Diane Rehm Show](http://thedianerehmshow.org/)'s website did not let you download episodes (easily) and their podcast feed was frequently stale.

This app was designed to let you download the episodes directly to your computer rather than having to listen to them on the website or via the podcast feed.

Now that Diane Rehm does a once weekly podcast, this app's utility has largely faded, so it isn't likely anyone will get much use out of this app anymore, but hey, if for whatever reason you want to download it, play with it, and/or hack on the source code… here you go. Enjoy.

And while you're at it, you might also want to check out the much more useful successor app [The 1A Downloader](https://github.com/kethinov/1ADownloader).

Download
===

- [Windows 64-bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.10/Diane.Rehm.Downloader-win32-x64.zip)
- [Windows 32-bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.10/Diane.Rehm.Downloader-win32-ia32.zip)
- [Linux 64-bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.10/Diane.Rehm.Downloader-linux-x64.zip)
- [Linux 32-bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.10/Diane.Rehm.Downloader-linux-ia32.zip)
- [macOS 64-bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.10/Diane.Rehm.Downloader-darwin-x64.zip)

Run from source
===

First install [Node.js](https://nodejs.org) and [git](https://git-scm.com).

Then:

```
git clone https://github.com/kethinov/DianeRehmDownloader.git
cd DianeRehmDownloader
npm i
electron .
```

Build
===

Builds are constructed with [electron-packager](https://github.com/maxogden/electron-packager).

Be sure to have [Node.js](https://nodejs.org) and [git](https://git-scm.com) installed. The build commands presume bash and zip are installed as well, so a Linux or Mac build environment is recommended, although it's probably possible to get a sane build environment set up in Windows too.

Set up the repo:

```
git clone https://github.com/kethinov/DianeRehmDownloader.git
cd DianeRehmDownloader
npm i
```

Do builds for:

- All platforms: `npm run build`
- All 64-bit platforms: `npm run build-64`
- Windows 64-bit: `npm run build-win`
- Windows 32-bit: `npm run build-win32`
- Linux 64-bit: `npm run build-linux`
- Linux 32-bit: `npm run build-linux32`
- macOS: `npm run build-mac`
