<img src='https://raw.githubusercontent.com/kethinov/DianeRehmDownloader/master/images/dianerehmdownloaderlogo.png' alt='Diane Rehm Downloader' width='128' height='128'> [![Gittip](http://img.shields.io/gittip/kethinov.png)](https://www.gittip.com/kethinov/)

[The Diane Rehm Show](http://thedianerehmshow.org/)'s website doesn't let you download episodes (easily) and their podcast feed frequently is stale.

This app will let you download the episodes directly to your computer rather than having to listen to them on the website or via the podcast feed.

Download
===

- [Windows 32 bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.6/Diane.Rehm.Downloader-win32-ia32.zip)
- [Windows 64 bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.6/Diane.Rehm.Downloader-win32-x64.zip)
- [Linux 32 bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.6/Diane.Rehm.Downloader-linux-ia32.zip)
- [Linux 64 bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.6/Diane.Rehm.Downloader-linux-x64.zip)
- [Mac 64 bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.6/Diane.Rehm.Downloader-darwin-x64.zip)

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

Be sure to have [Node.js](https://nodejs.org) and [git](https://git-scm.com) installed.

First, be sure to run:

```
git clone https://github.com/kethinov/DianeRehmDownloader.git
cd DianeRehmDownloader
npm i
```

Then:

All Platforms: `npm run build`

64-Bit Platforms Only: `npm run build-64`

macOS: `npm run build-mac`

Windows 64-Bit: `npm run build-win`

Windows 32-Bit: `npm run build-win32`

Linux 64-Bit: `npm run build-linux`

Linux 32-Bit: `npm run build-linux32`
