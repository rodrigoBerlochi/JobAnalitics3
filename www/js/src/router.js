var appRouter = Backbone.Router.extend({

    routes: {
        '': 'setLanding'
        //y si todos las routes que no sean default home, usan el mismo param y van al mismo metodo?
    },
    
    initialize: function() {
    
        Events.on('router:navigate', this.navigateTo, this);
        console.log('router');
        
    },
    
    navigateTo: function(page) {
        
        this.navigate('view/' + page);

    },
    
    setLanding: function(query) {
        
        app.consoleLog('setLanding');
        Events.trigger('LandingView:show');

    }
    
});