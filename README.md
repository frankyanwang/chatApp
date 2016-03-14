Ionic Salesforce App Base
=====================

A starting project for Ionic Salesforce App base.

## Setup this project

If you previously install Android SDK using HomeBrew, it is time to uninstall it. I had a lot of trouble getting Android simulator working because of that.

```bash
$ brew uninstall android-sdk  
```

Install Cordova:
```bash
$ sudo npm install -g ionic cordova
```

Setup for Android:
```bash
$ ionic platform add android
$ ionic build android
$ ionic emulate android
$ ionic run android
```

Setup for iOS:  (Please install latest Xcode before)
```bash
$ npm install -g ios-sim
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios --target="iPhone-6"
$ ionic run ios
```

Check list of Cordova plugins: (this is what I have on my local)
```bash
$ cordova plugin list
com.salesforce 4.1.1 "SalesforceMobileSDK Plugins"
cordova-plugin-console 1.0.2 "Console"
cordova-plugin-device 1.1.1 "Device"
cordova-plugin-inappbrowser 1.2.1 "InAppBrowser"
cordova-plugin-screen-orientation 1.4.0 "Screen Orientation"
cordova-plugin-whitelist 1.2.1 "Whitelist"
ionic-plugin-keyboard 1.0.8 "Keyboard"
phonegap-plugin-push 1.5.3 "PushPlugin"
```

Install SalesforceMobileSDK Cordova plugin:
```bash
$ ionic plugin add https://github.com/forcedotcom/SalesforceMobileSDK-CordovaPlugin
```

Install Cordova plugin: (either one is okay.)
```bash
$ ionic plugin add name_of_plugin(cordova-plugin-screen-orientation)
$ cordova plugin add name_of_plugin
```

These are the Issue I run into:

Plugin doesn't support this project's cordova-android version. cordova-android: 4.1.1, failed version requirement: 5.0.0
```bash
$ cordova platform update android@5.0.0
```

Plugin doesn't support this project's cordova-ios version. cordova-ios: 3.8.0, failed version requirement: 3.9.2
```bash
$ cordova platform update ios@3.9.2
```

I also had problem using a bad MicroUSB cable connect with my android device, the code doesn't push correctly. The way to debug connection issue is to run ADB (android debug bridge). Make sure your device is listed below.
```bash
$ cd /Users/frankwang/Library/Android/sdk/platform-tools
$ ./adb devices
List of devices attached
emulator-5554 device
```


## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

```bash
$ force-server
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/submit-issue/) to the main Ionic repository.
# ionic-salesforce-bootstrap
# chatApp
