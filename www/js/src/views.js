/*var SideMenu = Backbone.View.extend({

    el: '.sidebar',
    
    initialize: function() {},
    
    events: {
        'click .hamburger': 'slideMenu'
    },
    
    slideMenu: function(){
    
    }
    
});*/

var LandingView = Backbone.View.extend({

    el: '#container',
    
    events: {},
    
    template: JST['templates_src/landing.tpl'],
    
    initialize: function() {
        
        Events.on('LandingView:show', this.render, this);
        
    },
    
    render: function() {

        var compiledTpl = this.template(this.model.toJSON());
            
        app.slider.slidePage($(compiledTpl));
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