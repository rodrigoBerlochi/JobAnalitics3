var SideMenu = Backbone.View.extend({

    el: '.sidebar',
    
    initialize: function() {},
    
    events: {
       
    }
    
});

var LandingView = Backbone.View.extend({

    el: '#container',
    
    events: {
    
        'click .hamburger': 'slideMenu',
        'click .results': 'goResults',
        'click .profile': 'goProfile'
    },
    
    template: JST['templates_src/landing.tpl'],
    
    initialize: function() {
        
        Events.on('LandingView:show', this.render, this);
        
    },
    
    render: function() {

        var compiledTpl = this.template(this.model.toJSON());
            
        app.slider.slidePage($(compiledTpl));
    },
    
    slideMenu: function(){

        $('.sidebar').sidebar('toggle');
        
    },
    
    goResults: function() {

        Events.trigger('router:navigate', 'resultView');
         
    },
    
    goProfile: function() {
    
         Events.trigger('router:navigate', 'profileView');
        
    }
    
});


var ProfileView = Backbone.View.extend({
    
    el: '#container',
    
    //template: 'body',
    
    initialize: function() {
    
         Events.on('ProfileView:show', this.render, this);
        //skipping it out here since this view uses stickit
        //this.listenTo(this.model, 'change', this.render);
    },
    
    events: {},
    
    bindings: {},
    
    render: function() {
        //this.$el.html(this.template);
        var compiledTpl = this.template();
        app.slider.slidePage($(compiledTpl));
        this.stickit();
        return this;
    }
    
});


var ResultSetView = Backbone.View.extend({

});
