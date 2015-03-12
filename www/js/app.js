/*
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

function myEventHandler() {
    "use strict" ;

    var ua = navigator.userAgent ;
    var str ;

    if( window.Cordova && dev.isDeviceReady.c_cordova_ready__ ) {
            str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!" ;
    }
    else if( window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______ ) {
            str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!" ;
    }
    else {
        str = "Bad device ready, or none available because we're running in a browser." ;
    }

    alert(str) ;
}

function notifyOfflineStatus(){
    
    var netState = navigator.connection.type;
    
    if(netState === Connection.NONE){
        
        navigator.notification.alert(
            'Verifica tu conexión de red. Esta App requiere que estés conectado para funcionar.',
            null,
            'Sin conexión',
            'Listo'
        );
        
    }
    
};

document.addEventListener("offline", notifyOfflineStatus, false);

//      document.addEventListener("deviceready", myDeviceReadyListener, false);
//      document.addEventListener("resume", myResumeListener, false);
//      document.addEventListener("pause", myPauseListener, false);
 
// ...additional event handlers here...
