Ionic Salesforce App Base
=====================

A starting project for Ionic Salesforce App base.

## Setup this project

If you previously install Android SDK using HomeBrew, it is time to uninstall it. I had a lot of trouble getting Android simulator working because of that.

```bash
$ brew uninstall android-sdk  
```

Due to use of Salesforce Cordova plugins library, there are currently many restrictions, so please use recommanded versions of libraries to avoid problems.

Corova CLI:  5.4.0
Cordova platform android: 5.0.0
shelljs: 0.5.3

For Android build, current Ionic generated Android project doesn't work well with Salesforce Cordova plugins. A special version of ForceDroid (forcedroid-4.1.1.tgz sent from Bharath Hariharan) are used to generate the project.

Install Cordova:
```bash
$ sudo npm install -g ionic cordova@5.4.0 (prefered version)
```

Assume you are in your project root folder $.

Setup for iOS:  (Please install latest Xcode before)
```bash
$ npm install -g ios-sim
$ ionic platform add ios@3.9.2
$ ionic build ios
1. Run on iOS simulator.
$ ionic emulate ios --target="iPhone-6"
2. Run on iOS real device, if no device, fall back to Simulator.
$ ionic run ios
```

Setup for Android: (android generated code are checked in already. no need to go through the creation process again.)
```bash
$ grunt android (copy dev files to generated folder)
$ cd platforms/android
$ ./gradlew assembleDebug (use assembleDebug for now, this will build the android apk file)
1. Run on real device.
assume you have adb on your path. otherwise use "/Users/frankwang/Library/Android/sdk/platform-tools/adb" instead.
$ adb devices (find list of devices connected to your computer)
$ adb -s DEVICE_ID install -r build/outputs/apk/android-debug.apk (push apk file to your selected device. note: -s DEVICE_ID is optional if there is only one on the list.)
2. Run on emulator.
$ emulator -list-avds (find list of emulators you have)
$ emulator @Nexus_6_API_23 (@Nexus_6_API_23 is your emulator name)
$ emulator -avd @Nexus_6_API_23 -netspeed full -netdelay none (another way to launch emulator it)
```

1. ... or (for iOS) open **platforms/ios/myApp.xcodeproj** in Xcode and run the app on your device. If the build fails in Xcode, select the myApp target, click the **Build Settings** tab, search for **bitcode**, select **No** for **Enable Bitcode**, and try again.

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


## Running in the browser

Because of the browser's cross-origin restrictions, your Ionic application hosted on your own server (or localhost) will not be able to make API calls directly to the *.salesforce.com domain. The solution is to proxy your API calls through your own server. You can use your own proxy server or use [ForceServer](https://github.com/ccoenraets/force-server), a simple development server for Force.com. It provides two main features:

- A **Proxy Server** to avoid cross-domain policy issues when invoking Salesforce REST services. (The Chatter API supports CORS, but other APIs don’t yet)
- A **Local Web Server** to (1) serve the OAuth callback URL defined in your Connected App, and (2) serve the whole app during development and avoid cross-domain policy issues when loading files (for example, templates) from the local file system.

To run the application in the browser using ForceServer:

1. Install ForceServer

    ```bash
    $ sudo npm install -g force-server
    ```

2. Navigate (cd) to your Ionic app's **www** directory  

3. Start the server

    ```
    force-server
    ```

    This command will start the server on port 8200, and automatically load your app (http://localhost:8200) in a browser window. You'll see the Salesforce login window (make sure you enable the popup), and the list of contacts will appear after you log in. If you don’t have a free Salesforce Developer Edition to log in to, you can create one [here](http://developer.salesforce.com/signup).

    You can change the port number and the web root. Type the following command for more info:

    ```
    force-server --help
    ```
