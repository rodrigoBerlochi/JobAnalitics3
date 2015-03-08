var ProfileModel = Backbone.Model.extend({
    
    initialize: function() {
        
        //check if lcalStorage has profile values or is empty, an setup this model 
        this.retriveProfile();
        
        //validation event, when and attr to set is evaluated as invalid, fires callback
        this.on('invalid', this.handleError, this);
        
    },
    
    defaults: {
        'category': '',
        'subcategory': '',
        'keyword': '',
        'city': '',
        'country': '',
        'province': ''
    },
    
    validate: function(attrs) {
        //TODO: replace something with att name, see validation logic
        //maybe a switch for different attributes or different if for different rules: empty etc
        /*if(!attrs.something){
            return "This is a base error msg";
        }*/
    
    },
    
    handleError: function (model, error) {
        //TODO: maybe use toaster js to show error messages
        app.consoleLog(error);
    },
    
    setVal: function(valueObject, silent, validate) {
        
        silent = silent ||  false;
        validate = validate || false;
        
        if( typeof(valueObject) === "object" ){
            
            this.set(valueObject, {silent: silent}, {validate: validate});
        
        }          
    },
    
    persistProfile: function(){
        //persists between sessions
        //values are already in the model 
        var data = this.toJSON();
        //iterate attrs, just own ones, and SAVE them on the local storage
        for(var key in data){
            if(data.hasOwnProperty(key) && data[key] !== ''){

                localStorage.setItem(key, data[key]);

            }
        }
    },
    
    //get object from localStorage and set on model
    retriveProfile: function() {
         var data = this.toJSON();
        
         for(var key in data){
            if(data.hasOwnProperty(key)){

                var value = localStorage.getItem(key);
                
                if(value && value !== ''){
                    
                    this.set(key, value);
                    
                } else {
                   // alert('No value on LS for: ' + key);
                }

            }
         }
        
    },
    
    //get model attrs and create a query string
    getProfileQuery: function() {
        var data = this.toJSON();
        var query = $.param(data); 
        alert('setting PQ en LS: ' + query);
        //set it on localstorage to be accesible when the result page is loaded before profile page
        localStorage.setItem('profileQuery', $.trim(query));
        
        //Notice it won't return the question mark at the beginning. Should be added by receptor. 
        return $.trim(query);
    }
    
});



/*
*Results Model
*/
var ResultSet = Backbone.Model.extend({
    
    defaults: {},
    
    //url is build with a fixed string (host) and the query string (profile)
    url: function() {
        alert('URL to ask = https://api.infojobs.net/api/1/offer?facets=true&' + this.profile);
        return 'https://api.infojobs.net/api/1/offer?facets=true&' + this.profile;
    },
    
    //keep the profile query string stored in the data layer
    profile: '',
    
    initialize: function() {
        Events.on('FetchModel', this.fetchModel, this);
        this.lookForProfile();
    },
    
    lookForProfile: function() {
        
        if(this.profile === ''){
                var profileQuery = localStorage.getItem('profileQuery');
                if(profileQuery !== null){
                    this.profile = profileQuery;
                }
        }

    },
    
    //call this method to retrieve a JSON response from the API, with Offer results
    //it sets authorization headers and performs behind the scene, a Jquery AJAX call
    //when it succeds, fires render page using actual data on this model
    //otherwise communicate the error
    fetchModel: function() {
        this.fetch({
            beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic NTYwZWYxNjE5YzJmNGJjY2FmODE0NDkzZmNjZmNmNjk6SUllSkVTOXF1aGdFTHFnVlVDUk5oSEQ2dGRiS1ppUEMzR2tjVjROSWpaZC9SMHNYNTQ=');
            },
            success: function(model, response) {
                alert('success fetchModel');
                //console.log(response);
                //alert('Total results: ' +  this.get('totalResults') );
                Events.trigger('ResultSetView:render');
            },
            error: function(model, response) {
                 alert('error fetchModel');
                 console.log(response);
            }
        });
    }, 
    
    //after Fetch, gets the response and parse it extracting and ordering useful data
    //parsedResponse 
    parse: function(response) {
        
        return parsedResponse = {
            facets : response.facets,
            totalResults : response.totalResults,
            offers : response.offers
        };
        
    }
    
});



var LandingModel = Backbone.Model.extend({
    defaults: {
        shouldResultsAble : false,
        profileEnabled : true
    },
    
    initialize: function() {
        //Events.trigger('queryProfileStatus', this.setResultButton, this);
        
        //Events.on('', this.setResultButton, this);
        Events.on('LandingModel:profileStatus', this.setProfileStatus, this);
    },
    
    checkLocalStorage: function() {
        var empty = true; //= profile is empty, true
        if(localStorage.length > 0){
            empty = false;
        }
            alert('initial status ' + empty);
        this.set('shouldResultsAble', empty);
        return empty;
    }
    
});