/*
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */



window.app = window.app || {} ;         // there should only be one of these...


//pageslider accesible
app.slider = null;

// Set to "true" if you want the console.log messages to appear.
app.LOG = true;

app.consoleLog = function() {           // only emits console.log messages if app.LOG != false
    if( app.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
};

//will turns True if profile filters can not be retrieved
app.errorLoadingFilters = false;


app.localDictionaries = (function() {
    var properties = {
            category : null,
            subcategory : null,
            city : null,
            country : null,
            province: null
        },
        dictionariesReady = 0,
        dictionaryNames = ['category', 'country', 'subcategory', 'city', 'province'],
        methods = {};
    
        methods.getDictionaries = function(){
            for(var i=0; i<dictionaryNames.length; i++){
                //alert(dictionaryNames[i]);
                methods.doRequest(dictionaryNames[i]);    
            }
        };
    
        methods.doRequest = function(name) {
            name = name;
            
            enableProfile = function() {
                    dictionariesReady += 1; console.log('dictionariesReady' + dictionariesReady);
                    if(dictionariesReady == dictionaryNames.length){
                        //all the Dict are ready, so enable profile button now
                        Events.trigger('LandingView:enableProfileBttn');
                    }
            };
            
            $.ajax({
                url: 'https://api.infojobs.net/api/1/dictionary/' + name,
                dataType: 'json',
                type: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic NTYwZWYxNjE5YzJmNGJjY2FmODE0NDkzZmNjZmNmNjk6SUllSkVTOXF1aGdFTHFnVlVDUk5oSEQ2dGRiS1ppUEMzR2tjVjROSWpaZC9SMHNYNTQ=');
                },
                success: function (data){
                    methods.updateProperty(data, name);
                    enableProfile();
                },
                error: function (err){
                    alert('Error occurred on retrieving profile options for ' + name);
                    app.errorLoadingFilters = true;
                    enableProfile();
                }
            });
        };
    
        methods.updateProperty = function(data, name) {
            //alert(data[1].value);
            properties[name] = data;
            //alert(properties.city[1].value);
        };
    
    methods.getThisDictonary = function(name){
        return properties[name];
    };
    
    return {
        dictionariesReady: dictionariesReady,
        getDictionaries : methods.getDictionaries,
        getThisDictonary : methods.getThisDictonary
        //askNewDictionary: methods.doRequest
    };
}());

//translated string to hanlde via JS
app.resourceBundle = {
    noResults : 'No se han hallado resultados con los criterios especificados. Prueba con otros parámetros en tu Perfil.',
    cleanStorage : '¿Desea borrar todos los datos de su perfil guardados en este dispositivo? Deberá ingresar un nuevo Perfil para volver a ver Resultados.'
};

app.initBackbone = function(){
    
    //init models
    var landingModel = new LandingModel();
    
    //init view and pass in models
    var landingView = new LandingView({model: landingModel});
    var sideMenu = new SideMenu();
    
    //init router
    var router = new appRouter();
    Backbone.history.start();

};


// App init point (runs on custom app.Ready event from init-dev.js).
// Runs after underlying device native code and webview/browser is ready.
// Where you should "kick off" your application by initializing app events, etc.

// NOTE: Customize this function to initialize your application, as needed.

app.initEvents = function() {
    "use strict" ;
    var fName = "app.initEvents():" ;
    app.consoleLog(fName, "entry") ;

    // NOTE: initialize your third-party libraries and event handlers

    // initThirdPartyLibraryNumberOne() ;
    // initThirdPartyLibraryNumberTwo() ;
    // initThirdPartyLibraryNumberEtc() ;

    // NOTE: initialize your application code

    // initMyAppCodeNumberOne() ;
    // initMyAppCodeNumberTwo() ;
    // initMyAppCodeNumberEtc() ;
    
    //initi pageSlider, it manage page transitions
    app.slider = new PageSlider($("#container"));
    
    //API request to get all the Dict.
    app.localDictionaries.getDictionaries();
    
    //init fast click
    FastClick.attach(document.body);
    
    app.initBackbone();
    
    
   
   /* $.ajax({
        url: 'https://api.infojobs.net/api/1/dictionary/city',
         dataType: 'json',
                type: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic NTYwZWYxNjE5YzJmNGJjY2FmODE0NDkzZmNjZmNmNjk6SUllSkVTOXF1aGdFTHFnVlVDUk5oSEQ2dGRiS1ppUEMzR2tjVjROSWpaZC9SMHNYNTQ=');
                },
        success: function(d){
            alert(d);
        }
    });*/

    // NOTE: initialize your app event handlers, see app.js for a simple event handler example

    // TODO: configure following to work with both touch and click events (mouse + touch)
    // see http://msopentech.com/blog/2013/09/16/add-pinch-pointer-events-apache-cordova-phonegap-app/

    var el, evt ;

    if( navigator.msPointerEnabled || !('ontouchend' in window))    // if on Win 8 machine or no touch
        evt = "click" ;                                             // let touch become a click event
    else                                                            // else, assume touch events available
        evt = "touchend" ;                                          // not optimum, but works

    /*el = document.getElementById("id_btnHello") ;
    el.addEventListener(evt, myEventHandler, false) ;*/

    // NOTE: ...you can put other miscellaneous init stuff in this function...
    // NOTE: ...and add whatever else you want to do now that the app has started...

    //app.initDebug() ;           // just for debug, not required; keep it if you want it or get rid of it
    app.hideSplashScreen() ;    // after init is good time to remove splash screen; using a splash screen is optional

    // app initialization is done
    // app event handlers are ready
    // exit to idle state and wait for app events...

    app.consoleLog(fName, "exit") ;
} ;


document.addEventListener("app.Ready", app.initEvents, false) ;



// Just a bunch of useful debug console.log() messages.
// Runs after underlying device native code and webview/browser is ready.
// The following is just for debug, not required; keep it if you want or get rid of it.

/*app.initDebug = function() {
    "use strict" ;
    var fName = "app.initDebug():" ;
    app.consoleLog(fName, "entry") ;

    if( window.device && device.cordova ) {                     // old Cordova 2.x version detection
        app.consoleLog("device.version: " + device.cordova) ;   // print the cordova version string...
        app.consoleLog("device.model: " + device.model) ;
        app.consoleLog("device.platform: " + device.platform) ;
        app.consoleLog("device.version: " + device.version) ;
    }

    if( window.cordova && cordova.version ) {                   // only works in Cordova 3.x
        app.consoleLog("cordova.version: " + cordova.version) ; // print new Cordova 3.x version string...

        if( cordova.require ) {                                 // print included cordova plugins
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1)) ;
        }
    }

    app.consoleLog(fName, "exit") ;
} ;*/



// Using a splash screen is optional. This function will not fail if none is present.
// This is also a simple study in the art of multi-platform device API detection.

app.hideSplashScreen = function() {
    "use strict" ;
    var fName = "app.hideSplashScreen():" ;
    app.consoleLog(fName, "entry") ;

    // see https://github.com/01org/appframework/blob/master/documentation/detail/%24.ui.launch.md
    // Do the following if you disabled App Framework autolaunch (in index.html, for example)
    // $.ui.launch() ;
    
    var spinner = document.querySelector('.spinner');
    spinner.className = 'hide';
    
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    if( window.intel && intel.xdk && intel.xdk.device ) {           // Intel XDK device API detected, but...
        if( intel.xdk.device.hideSplashScreen )                     // ...hideSplashScreen() is inside the base plugin
            intel.xdk.device.hideSplashScreen() ;
    }

    app.consoleLog(fName, "exit") ;
} ;
