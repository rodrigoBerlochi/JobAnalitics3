var SideMenu = Backbone.View.extend({

    el: '.sidebar',
    
    initialize: function() {},
    
    events: {
        'click .sb-results': 'goResults',
        'click .sb-profile': 'goProfile',
        'click .sb-home': 'goHome'
    },
    
    goResults: function() {

        Events.trigger('router:navigate', 'resultView');
        this.closeSlide();
        
    },
    
    goProfile: function() {
    
        Events.trigger('router:navigate', 'profileView');
        this.closeSlide();
        
    },
    
    goHome: function() {
    
       window.location.hash =  '';
       this.closeSlide();
        
    },
    
    closeSlide: function() {
    
        this.$el.sidebar('toggle');
        
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
    
    template: JST['templates_src/profile.tpl'], 
    
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
        
        //create swiper to slide form, using plugin
        var mySwiper = new Swiper('.swiper-container',{
            //Your options here:
            mode:'horizontal',
            loop: true
            //etc..
        });  
        
        return this;
    }
    
});


var ResultSetView = Backbone.View.extend({

});
