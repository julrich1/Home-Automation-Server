# Home-Automation-Server

A small NodeJS server meant to run on a Raspberry Pi to handle requests from the IFTTT Maker Web Hooks module.
The application was designed to be modular so routes and actions can easily be added for additional functionality. Currently I'm utilizing this to automate a few things at my house:

* Goodnight routine
  - Turns on a white noise machine
  - Sets the bedroom lights to red and slowly dims them over 30 minutes
  
* Twitch.tv integration
  - An action that will respond with a list of all currently online streamers that I follow
  - Cast action to cast a streamer that matches the hashmap key/value pairs

* Google Home Hotifier
  - This allows Google Home to respond to requests and could be easily used for additional functions/alerts.
  
This runs on a Raspberry Pi w/ Node 8x
