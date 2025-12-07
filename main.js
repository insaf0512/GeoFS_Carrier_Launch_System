// ==UserScript==
// @name        GeoFS Carrier Cats V2
// @description This one works
// @match        https://www.geo-fs.com/geofs.php?v=*
// @match        https://*.geo-fs.com/geofs.php*
// ==/UserScript==
var checkGeofsReady = setInterval(function() {
    if (typeof geofs !== 'undefined' && geofs.aircraft.instance && geofs.aircraft.instance.id) {
        clearInterval(checkGeofsReady);
        console.log("GeoFS Carrier Cats script activated successfully for aircraft ID: " + geofs.aircraft.instance.id);
        // >>> GAME IS READY, NOW RUN THE MAIN SCRIPT LOGIC BELOW THIS LINE <<<

        let catLlas = [[37.778307623586805, -122.6090264835742, 22.753097613256113]]; //Modify to add new LLA locations for catapults.
        let carrierPlaneIds = ["27" ,"29", "2581" ,"3460" ,"2786" ,"4251" ,"5229" ,"7"]; //Will update as more planes are released
//Aircraft Codes:
//Boeing F/A-18F Super Hornet: 27
//Dassault Rafale: 29
//F-14B Tomcat: 2581
//E-2C Hawkeye: 3460
//Grumman JF2-5 Duck: 2786
//Chance Vought F4U-1D Corsair: 4251
//Lockheed Martin F-35B Lightning II: 5229
//F-16 Fighting Falcon: 7
        let barDown = false;
        let barLocked = false;
        let barKey = "q"; // change hotkeys by changing these variables
        let launchKey = "l" 
        let lockKey = "k"; 
        let lockInt = null; // Declare lockInt globally or in scope

        function gearBarPosLock() {
         if (barLocked) {
           geofs.aircraft.instance.rigidBody.setLinearVelocity([0, 0, 0])
         }
        }

        function resolveForceVector(force, angle) {
          fx = force * (Math.cos(angle * (Math.PI/180)));
          fy = force * (Math.sin(angle * (Math.PI/180)));
          return [fx, fy, 0];
        }

        function distance(pos1, pos2) {
          var a = pos2[0] - pos1[0];
          var b = pos2[1] - pos1[1];
          var c = pos2[2] - pos1[2];

          return Math.sqrt(a * a + b * b + c * c);
        }
        
        // Ensure we are in a carrier plane before attaching listeners
        if (carrierPlaneIds.includes(geofs.aircraft.instance.id)) {
            document.addEventListener("keypress", function onEvent(event) {
                if (event.key === barKey) {
                  if (barDown) {
                    barDown = false;
                    ui.notification.show("Launch Bar Stowed")
                  }
                  else {
                      if (geofs.animation.values.groundContact == 1) { 
                       barDown = true 
                       ui.notification.show("Launch Bar Deployed")
                    }
                  }
                }

                if (event.key === lockKey) {
                    if (barLocked) {
                    barLocked = false;
                    clearInterval(lockInt)
                    ui.notification.show("Launch Bar Unlocked")
                  }
                  else {
                    catLlas.forEach(function(e){
                      if (distance(geofs.aircraft.instance.llaLocation, e) < 10) {
                        barLocked = true;
                        ui.notification.show("Launch Bar Locked, throttle full and press '" + launchKey + "' to Launch!")
                        lockInt = setInterval(function(){
                        gearBarPosLock()
                          })
                      }
                      })            
                    }
                  }
                  if (event.key === launchKey) {
                    if (barLocked && geofs.animation.values.throttle == 1) {
                          clearInterval(lockInt)
                              barLocked = false;
                              barDown = false;
                         geofs.aircraft.instance.rigidBody.reset();
                      ui.notification.show("launching")
                      var launchForce = geofs.aircraft.instance.rigidBody.mass * 10
                      let whiteSmokeEmitter = new geofs.fx.ParticleEmitter({
                        anchor: {
                                    worldPosition: [0, 0, -1]
                                },
                        duration: 1E5,
                        rate: .05,
                        life: 4E4,
                        easing: "easeOutQuart",
                        startScale: .0005,
                        endScale: .0005,
                        randomizeStartScale: .05,
                        randomizeEndScale: .15,
                        startOpacity: 0.9,
                        endOpacity: 1E-5,
                        startRotation: "random",
                        texture: "whitesmoke"
                    })
                      launchInterval = setInterval(function(){
                        if (geofs.animation.values.groundContact == 1){
                        geofs.aircraft.instance.rigidBody.applyCentralImpulse([resolveForceVector(launchForce, geofs.animation.values.heading360)[1], resolveForceVector(launchForce, geofs.animation.values.heading360)[0], resolveForceVector(launchForce, geofs.animation.values.heading360)[2]])
                          }
                        else {
                          clearInterval(launchInterval)
                          whiteSmokeEmitter.destroy()
                          ui.notification.show("g'day!")
                        }
                        }, 200)
                      }
                    }
                  })
            console.log("Carrier Cats: Keyboard listeners attached.");
            }; // End of carrier plane check
            
        } // End of game ready check
}, 500); // Check every half second
