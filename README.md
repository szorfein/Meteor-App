# Meteor-App
Minimal webblog with meteor and angular2.

## Installation 

1 - install Meteor 

    $ curl https://install.meteor.com/ | sh
    
2 - Clone.

    $ git clone https://github.com/szorfein/Meteor-App.git 

3 - Install npm with dependencies

    $ cd Meteor-App
    $ meteor npm install
    
4 - Edit ./lib/config.ts

    this.username = "s3cr3tR00t";
    this.password = "p4ss_C0mpl1c4t3d";
    this.email = "myroot@ki.ki";

5 - Meteor Dependencies

    $ meteor remove blaze-html-templates
    $ meteor remove autopublish
    $ meteor remove insecure
    $ meteor add angular2-compilers
    $ meteor add accounts-password

6 - Start

    $ meteor

## Troubleshooting
