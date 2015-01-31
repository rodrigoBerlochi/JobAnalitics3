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
        
        switch(query){
            case 'profileView':
                var profileModel = new ProfileModel();
                var profileView = new ProfileView({model: profileModel});
                Events.trigger('ProfileView:show');
                break;
        }
    }
    
});