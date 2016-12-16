# Meteor-App
Minimal webblog with meteor, ionic and angular2.

## Installation 

### 0 - Mobile.

Require JDK (Java Development Kit) installed for mobile compability (ionic, cordova).  
On gentoo, proceed with:  

    emerge -av dev-util/android-studio
    download [jdk-8u112-linux-x64.tar.gz](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
    Move it in /usr/portage/distfiles
    emerge -av oracle-jdk-bin
    java-config --list-available-vms
    java-config --set-system-vm icedtea-8
    
on tilling wm, u must launch command bellow  before launch studio.sh:

    export _JAVA_AWT_WM_NONREPARENTING=1

if problem with tmp dir is full, simply change directory:

    export _JAVA_OPTIONS=-Djava.io.tmpdir=/var/tmp

    cd /opt/android-studio/bin && ./studio.sh

    export ANDROID_HOME=$HOME/meteor-sdk
    export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
    export JAVA_HOME=/opt/oracle-jdk-bin-1.8.0.112

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

### 5 - Start

    $ meteor
