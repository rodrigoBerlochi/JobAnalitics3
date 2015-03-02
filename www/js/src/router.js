var appRouter = Backbone.Router.extend({

    routes: {
        '': 'setLanding',
        'view/:query': 'setView'
    },
    
    initialize: function() {
    
        Events.on('router:navigate', this.navigateTo, this);
        app.consoleLog('router');
            
    },
    
    navigateTo: function(page) {
        
        this.navigate('view/' + page, {trigger: true});

    },
    
    setLanding: function(query) {
        
        app.consoleLog('setLanding');
        Events.trigger('LandingView:show');

    },
    
    setView: function(query) {
        
        app.consoleLog('set view');
        app.consoleLog(query);
        
         /*Just create one time each model and view, to avoid conflicts
            Keep them accessible at app level, so using the -app- namespace*/   
        switch(query){
        
            case 'profileView':
                
                if(app.profileModel === undefined){
                    app.profileModel = new ProfileModel();
                }
                if(app.profileView === undefined){
                    app.profileView = new ProfileView({model: app.profileModel});
                }
                     
                Events.trigger('ProfileView:show');
            break;
                
            case 'resultView':
                if(app.resultSet === undefined){
                    app.resultSet = new ResultSet();
                }
                if(app.resultSetView === undefined){
                    app.resultSetView = new ResultSetView({model: app.resultSet});
                }
                     
                Events.trigger('ResultSetView:show');
            break;
        }
    }
    
});