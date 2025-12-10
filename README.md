# GeoFS_Carrier_Launch_System
@Ariakim-Taiyo made the original GeoFS-Carrier-Cats Addon but it didn't work for me so I made this one with new features and upgrades.

# How to use:
1. Add the code to whatever userscript manager you use.
   (note: a userscript manager is requires, such as Tapermonkey, or whatever you prefer)
2. Go to GeoFS and spawn onto the carrier.
3. Click "q" to lower the launch bar. A UI notification will appear.
4. Click "k" to lock the launch bar in place. A UI notification will appear.
5. Go full throttle.
6. CLick "l" to launch the jet. A UI notification will appear.
7. That's it! You have officially launched from a carrier in GeoFS. A UI notification will appear, wishing you "g'day"!

# How to tweak hotkeys:

`let barKey = "q"; // change hotkeys by changing these variables`

`let launchKey = "l"`

`let lockKey = "k";`

Simply Change the text in the `"quotes"` and reload the page.

# How to tweak UI notifications:

`ui.notification.show("Launch Bar Stowed")`

`ui.notification.show("Launch Bar Deployed")`

`ui.notification.show("Launch Bar Unlocked")`

`ui.notification.show("Launch Bar Locked, throttle full and press '" + launchKey + "' to Launch!")`

`ui.notification.show("launching")`

`ui.notification.show("g'day!")`

Simply change the text in the `"quotes"` and reload the page.

# For developers, how to debug code if it isn't working:

Each time you load into a new aircraft, the following code runs:

`console.log("GeoFS Carrier Cats script activated successfully for aircraft ID: " + geofs.aircraft.instance.id);`

This runs in the beginning of the userscript, so if *"GeoFS Carrier Cats script activated successfully for aircraft ID:" plus whaterver aircraft ID* doesn't display, **THE ADDON IS NOT RUNNING AT ALL**.

Note: this only runs once GeoFS has fully loaded in.

Once the keyboard listeners that read for the hotkeys are working the following code runs:

`console.log("Carrier Cats: Keyboard listeners attached.");`

If *"Keyboard listeners attached"* doesn't display, **THE ADDON CANNOT READ THE KEYBOARD**.

# Supoorted aircraft include:

Boeing F/A-18F Super Hornet *(27)*

Dassault Rafale *(29)*

F-14B Tomcat *(2581)*

E-2C Hawkeye *(3460)*

Grumman JF2-5 Duck *(2786)*

Chance Vought F4U-1D Corsair *(4251)*

Lockheed Martin F-35B Lightning II *(5229)*

*note: the F35B has no tail hook so it can't land on the carrier*

F-16 Fighting Falcon *(7)*

**Aircraft codes in *(brackets)***

# Suggestions or support:

Simply add an `issue` and I will try to help.
