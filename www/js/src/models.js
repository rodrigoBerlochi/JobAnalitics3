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
        'province': '',
        'salaryRange': '',
        'contractType': ''
    },
    
    /*url: function() {
    
        return url;
    },*/
    
    /*parse: function(response) {
        
        var parsedResponse = {
        
        };
    
        return parsedResponse;
    },*/
    
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

        //Notice it won't return the question mark at the beginning. Should be added by receptor. 
        return $.trim(query);
    }
    
});

var ResultSet = Backbone.Model.extend({

});

/*var ParamsModel = Backbone.Model.extend({

});*/

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