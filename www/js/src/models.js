var ProfileModel = Backbone.Model.extend({
    
    initialize: function() {
    
        //validation event
        this.on('invalid', this.handleError, this);
        
    },
    
    defaults: {
        'category': '',
        'subcategory': '',
        'keyword': '',
        'city': '',
        'country': '',
        'province': '',
        'salaryRange': '',
        'contract': ''
    },
    
    url: function() {
    
        return url;
    },
    
    parse: function(response) {
        
        var parsedResponse = {
        
        };
    
        return parsedResponse;
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
        var data = this.toJSON();
        alert('pers');
        for(var key in data){
            if(data.hasOwnProperty(key) && data[key] !== ''){
                
                localStorage.setItem(key, data[key]);
                //alert('model ' + localStorage.getItem(key));
            }
        }
    },
    
    retrieveProfile: function() {
        //get from local storage
        //on model init, if they exists, and populate model
    }
    
});

var ResultSet = Backbone.Model.extend({

});

var ParamsModel = Backbone.Model.extend({

});

var LandingModel = Backbone.Model.extend({
    defaults: {
        resultsEnabled : false,
        profileEnabled : true
    },
    
    initialize: function() {
        Events.trigger('queryProfileStatus', this.setResultButton, this);
        Events.on('', this.setResultButton, this);
    },
    
    setResultButton: function() {
        
    }
});