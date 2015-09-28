<img src='https://raw.githubusercontent.com/kethinov/DianeRehmDownloader/master/images/dianerehmdownloaderlogo.png' alt='Diane Rehm Downloader' width='128' height='128'>

[The Diane Rehm Show](http://thedianerehmshow.org/)'s website doesn't let you download episodes (easily) and their podcast frequently goes stale.

This app will let you download the episodes directly to your computer rather than having to listen to them on the website or via the podcast feed.

Download
===

- [Windows 32 bit]()
- [Windows 64 bit]()
- [Linux 32 bit]()
- [Linux 64 bit]()
- [Mac 32 bit]()
- [Mac 64 bit]()

Run from source
===

```
git clone https://github.com/kethinov/DianeRehmDownloader.git
cd DianeRehmDownloader
election .
```

Build
===

Build using [electron-packager](https://github.com/maxogden/electron-packager).

```
git clone https://github.com/kethinov/DianeRehmDownloader.git
cd DianeRehmDownloader
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

Mac 32 bit:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.icns --out=build --overwrite=true --platform=darwin --arch=ia32 --version=0.33.3 --app-version=1.0
```

Mac 64 bit:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.icns --out=build --overwrite=true --platform=darwin --arch=x64 --version=0.33.3 --app-version=1.0
```

All:

```
electron-packager ./ "Diane Rehm Downloader" --app-bundle-id=dianerehmdownloader --icon=images/appicon.icns --out=build --overwrite=true --platform=all --arch=all --version=0.33.3 --app-version=1.0
```