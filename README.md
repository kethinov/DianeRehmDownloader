<img src='https://raw.githubusercontent.com/kethinov/DianeRehmDownloader/master/images/dianerehmdownloaderlogo.png' alt='Diane Rehm Downloader' width='128' height='128'> [![Gittip](http://img.shields.io/gittip/kethinov.png)](https://www.gittip.com/kethinov/)

[The Diane Rehm Show](http://thedianerehmshow.org/)'s website doesn't let you download episodes (easily) and their podcast feed frequently is stale.

This app will let you download the episodes directly to your computer rather than having to listen to them on the website or via the podcast feed.

Download
===

- ~~Windows 32 bit~~ (coming soon)
- ~~Windows 64 bit~~ (coming soon)
- [Linux 32 bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.0/Diane.Rehm.Downloader-linux-ia32.zip)
- [Linux 64 bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.0/Diane.Rehm.Downloader-linux-x64.zip)
- [Mac 64 bit](https://github.com/kethinov/DianeRehmDownloader/releases/download/1.0.0/Diane.Rehm.Downloader-darwin-x64.zip)

Run from source
===

First run `npm i -g electron-prebuilt` (may require sudo on *nix platforms).

Then:

```
git clone https://github.com/kethinov/DianeRehmDownloader.git
cd DianeRehmDownloader
npm i
election .
```

Build
===

Build using [electron-packager](https://github.com/maxogden/electron-packager).

First run `npm i -g electron-package` (may require sudo on *nix platforms).

Then:

```
git clone https://github.com/kethinov/DianeRehmDownloader.git
cd DianeRehmDownloader
npm i
```

Windows 32 bit:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.ico --out=build --overwrite=true --platform=win32 --arch=ia32 --version=0.33.3 --app-version=1.0
```

Windows 64 bit:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.ico --out=build --overwrite=true --platform=win32 --arch=x64 --version=0.33.3 --app-version=1.0
```

Linux 32 bit:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.ico --out=build --overwrite=true --platform=linux --arch=ia32 --version=0.33.3 --app-version=1.0
```

Linux 64 bit:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.ico --out=build --overwrite=true --platform=linux --arch=x64 --version=0.33.3 --app-version=1.0
```

Mac 64 bit:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.icns --out=build --overwrite=true --platform=darwin --arch=x64 --version=0.33.3 --app-version=1.0
```

All:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.icns --out=build --overwrite=true --platform=all --arch=all --version=0.33.3 --app-version=1.0
```