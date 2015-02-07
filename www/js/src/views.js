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
    
    events: {
        'click .cancel': 'goHome',
        'change select': 'enableSaving',
        'click input': 'enableSaving',
        'click .edit': 'toggleEditLayer'
    },
    
    bindings: {},
    
    enableSaving: function() {
        this.$('.save').removeAttr('disabled');
    },
    
    isProfileEmpty: function() {
    
        var model = this.model.toJSON(),
            key;
        
        for(key in model){
            if(model.hasOwnProperty(key) && model[key] !== ''){
                return false;
            }
        }
        
        return true;
        
    },
    
    toggleEditLayer: function(action) {
        
        var brief = this.$('.profile-brief'),
            editing = this.$('.swiper-container'),
            save = this.$('.topcoat-button--cta.save'),
            edit = this.$('.topcoat-button--cta.edit');
        
        //default value if it's called without params
        action = typeof action !== 'string'?'show':action; 
            
        if(action === 'show'){
            
            brief.addClass('hide');
            editing.removeClass('hide');
            save.removeClass('hide');
            edit.addClass('hide');
            
            this.createSwiper();
            
        }else{ //'hide'
            
            editing.addClass('hide');
            brief.removeClass('hide');
            save.addClass('hide');
            edit.removeClass('hide');
        
        }
    },
    
    createSwiper: function() {
        //create swiper to slide form, using plugin
        var mySwiper = new Swiper('.swiper-container',{
            //Your options here:
            mode:'horizontal',
            //loop: true,
            pagination: '.pagination',
            paginationClickable: true
        });  
    },
    
    render: function() {
        //this.$el.html(this.template);
        var compiledTpl = this.template(this.model.toJSON());
        app.slider.slidePage($(compiledTpl));
        //this.stickit(); 
        
        //show form or brief?
        var action = this.isProfileEmpty()?'show':'hide';
        this.toggleEditLayer(action);

        return this;
    },
    
    goHome: function() {
    
       window.location.hash =  '';
        
    }
    
});


var ResultSetView = Backbone.View.extend({

});
