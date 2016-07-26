Vlocity Mobile Hybrid App
=====================

A starting project for Vlocity Mobile Hybrid App based on Ionic, SalesforceCordovaSDK and AngularJS.

## Setup this project

If you previously install Android SDK using HomeBrew, it is time to uninstall it. I had a lot of trouble getting Android simulator working because of that.

```bash
$ brew uninstall android-sdk  
```

Due to use of Salesforce Cordova plugins library, there are currently many restrictions, so please use recommanded versions of libraries to avoid problems.

Corova CLI:  6.3.0
Cordova platform android: 5.0.0
Cordova platform ios: 3.9.2
shelljs: 0.7.0

For Android build, current Ionic generated Android project doesn't work well with Salesforce Cordova plugins. A special version of ForceDroid (forcedroid-4.1.1.tgz sent from Bharath Hariharan) are used to generate the project.

Install Ionic, Cordova, ShellJS:
```bash
$ sudo npm install -g ionic cordova
$ sudo npm install shelljs@0.7.0
```

Assume you are in your project root folder $.

Note: ionic and cordova command are interchangable for most of command below.

Setup for iOS:  (Please install latest Xcode before)
```bash
$ npm install -g ios-sim
$ ionic platform add ios@3.9.2
$ ionic build ios

1. Run on iOS simulator.
$ ionic emulate ios --target="iPhone-6"
$ ionic emulate ios --target="iPad-Air"

2. Run on iOS real device, if no device, fall back to Simulator.
$ ionic run ios
```

Setup for Android: (Note: Since SalesforceMobileSDK-CordovaPlugin has fixed the broken build process issue, so I reverted two hacks I did to make it build/running on Android device. However it is still not perfect. So please follow the steps below strictly.)

```bash
Migration Steps, Assume you have already setup the Android Platform and SalesforceCordovaPlugin:
1. Remove Salesforce Plugin.
$ cordova plugin rm com.salesforce
2. Remove Android Platform
$ cordova platform remove android

3. Add required and plugins.
$ cordova plugin add cordova-plugin-screen-orientation
$ cordova plugin add cordova-plugin-inappbrowser
etc.....

4. Add SalesforceCordovaPlugin and its dependent plugins.
$ cordova plugin add https://github.com/forcedotcom/SalesforceMobileSDK-CordovaPlugin

Important: this step will do bunch of things: 1. add plugins. 2.post install scripts. 3. copy assets to android platform folders. 4. fixed up the AndroidManifest.xml file. This step has to work perfectly.

Never run the following two commands. It will screwed up the whole build process.
$ Cordova Prepare. 
$ Cordova build android

5. Launch Android Studio: (v2.1.2)
From the welcome screen, select Import project (Eclipse ADT, Gradle, etc.).
Select <your_target_dir>/<your_app_name>/platforms/android and click OK.

6. Build will failed.
Open build.gradle file.
Change this block: gradle:2.1.2.

else if (gradle.gradleVersion >= "2.1") {
        dependencies {
            classpath 'com.android.tools.build:gradle:2.1.2'
        }
}

Then you can click on try again click to start build again.

After the build finishes, select the android target and click Run ‘android’ from either the menu or the toolbar. Select a connected Android device or emulator.

Now Everything should work the first time.

Continue development:

After you make some changes. Copy dev files to generated android assets folder
$ grunt android 

1. Run on real device.
assume you have adb on your path. Otherwise use full path "/Users/frankwang/Library/Android/sdk/platform-tools/adb" instead.

Find list of devices connected to your computer
$ adb devices

Deploy apk file to your selected device. note: -s DEVICE_ID is optional if there is only one on the list.
$ adb -s DEVICE_ID install -r build/outputs/apk/android-debug.apk

2. Run on emulator.

Find list of emulators you currently have.
$ emulator -list-avds
$ emulator @Nexus_6_API_23 (@Nexus_6_API_23 is your emulator name)
$ emulator -avd @Nexus_6_API_23 -netspeed full -netdelay none (Alternative to launch emulator)
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

## Coding Guideline

The code is based heavily on John Papa's Angular Style Guide. https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

Especially LIFT principall for appa and coding structure. 

    1. `L`ocating our code is easy
    2. `I`dentify code at a glance
    3. `F`lat structure as long as we can
    4. `T`ry to stay DRY (Don’t Repeat Yourself) or T-DRY

You can even download the template from here to use in your favorite editor like Bracket or Sublime.
https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#file-templates-and-snippets

Sample Coding structure:

  ```javascript
(function() {
    'use strict';

    angular
        .module('module')
        .controller('Controller', Controller);

    Controller.$inject = ['dependencies'];

    /* @ngInject */
    function Controller(dependencies) {
        var vm = this;

        // bindable members and notification...
        vm.property = 'Controller';

        vm.func1 = func1;
        vm.func2 = func2;

        // Notification setup.
        var listenerCleanFn = $rootScope.$on('event:action', function(event, data) {});
        $scope.$on('$destroy', function() {
            listenerCleanFn();
        });

        activate();

        ////////////////

        function activate() {
            //main logic for the controller.
        }

        // public functions

        function func1() {
            privateFunc();
        }

        function func2() {}

        // private functions
        function privateFunc() {}
    }
})();
  ```




