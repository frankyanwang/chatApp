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
