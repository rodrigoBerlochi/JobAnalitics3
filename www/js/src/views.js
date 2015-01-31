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
        'click .profile': 'goResults'
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
         
    }
    
});


var ProfileFormView = Backbone.View.extend({

});


var ProfileBriefView = Backbone.View.extend({
    
    el: '#container',
    
    //template: 'body',
    
    initialize: function() {
    
        //skipping it out here since this view uses stickit
        //this.listenTo(this.model, 'change', this.render);
    },
    
    events: {},
    
    bindings: {},
    
    render: function() {
        this.$el.html(this.template);
        this.stickit();
        return this;
    }
    
});


var ResultSetView = Backbone.View.extend({

});