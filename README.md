# Meteor-App
Minimal webblog with meteor, ionic and angular2.

## Preview

![Article with preview](https://raw.githubusercontent.com/szorfein/Meteor-App/master/screenshot.jpg)

## Installation 

### 1 - install Meteor 

    $ curl https://install.meteor.com/ | sh
    
### 2 - Clone this repository.

    $ git clone https://github.com/szorfein/Meteor-App.git 

### 3 - Install npm with dependencies

    $ cd Meteor-App
    $ meteor npm install
    
### 4 - Edit ./lib/config.ts

    this.username = "s3cr3tR00t";
    this.password = "p4ss_C0mpl1c4t3d";
    this.email = "myroot@ki.ki";

### 5 - Copy file require for bootstrap in public/js

    cp node_modules/{bootstrap,tether}/dist/js/{bootstrap,tether}.js public/js
    cp node_modules/jquery/dist/jquery.js public/js/

### 6 - Start

    $ meteor

## Troubleshooting:

### With GrSec and PAX, you need disable MPROTECT on meteor and mongo.

    # paxctl-ng -Em ~/.meteor/packages/meteor-tool/.1.4.2.1r0536n++os.linux.x86_64+web.browser+web.cordova/mt-os.linux.x86_64/dev_bundle/bin/node
    # paxctl-ng -Em ~/.meteor/packages/meteor-tool/.1.4.2.1r0536n++os.linux.x86_64+web.browser+web.cordova/mt-os.linux.x86_64/dev_bundle/mongodb/bin/mongo 
