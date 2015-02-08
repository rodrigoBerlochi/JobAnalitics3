var SideMenu = Backbone.View.extend({

    el: '.sidebar',
    
    initialize: function() {},
    
    events: {
        'click .sb-results': 'goResults',
        'click .sb-profile': 'goProfile',
        'click .sb-home': 'goHome',
        'click .sb-close': 'closeApp'
    },
    
    closeApp: function() {
        var answer = confirm('JobAnalitics va a ser cerrada');
        if(answer === true){
            navigator.app.exitApp();
        }
        this.closeSlide();
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
        this.createDropDowns();
    },
    
    events: {
        'click .cancel': 'goHome',
        'change select': 'enableSaving',
        'change select.category': 'showSubcategories',
        'click input': 'enableSaving',
        'click .edit': 'toggleEditLayer'
    },
    
    bindings: {},
    
    dictionaries: {},
    
    createDropDowns: function() {
        this.getDictionaries();
    },
    
    showSubcategories: function() {
        var el = this.$('select.category'),
            val = el.find('option:selected').attr('id');
        
        this.populateDropDown(this.dictionaries.subcategory, 'subcategory', val);
        
        this.$('.subcategory-holder').removeClass('hide');
    },
    
    getDictionaries: function() {
        
        this.dictionaries.city = app.localDictionaries.getThisDictonary('city');
        this.dictionaries.country = app.localDictionaries.getThisDictonary('country');
        this.dictionaries.subcategory = app.localDictionaries.getThisDictonary('subcategory');
        this.dictionaries.category = app.localDictionaries.getThisDictonary('category');
        this.dictionaries.salaryRange = app.localDictionaries.getThisDictonary('salary-range');
        this.dictionaries.contractType = app.localDictionaries.getThisDictonary('contract-type');
            
    },
    
    populateDropDown: function(data, target, filterBy) {
      var html = '',
          data = data || {};
        
      for(var i=0; i < data.length; i++){  
         
          if(filterBy != undefined){
            if(data[i].parent != filterBy){
                continue;
            }; 
          }
         
          
          html += '<option id="' + data[i].id + '" value="' + data[i].key + '">' + data[i].value + '</option>';
      }
        
      this.$('.' + target).html(html);      
    },
    
/*    populateOneDropDown: function(data, target, filterBy) {
      var html = '',
          data = data || {};
        
      for(var i=0; i < data.length; i++){
          if(data[i].parent != filterBy){
            continue;
          };
          html += '<option id="' + data[i].id + '" value="' + data[i].key + '">' + data[i].value + '</option>';
      }
        
      this.$('.' + target).html(html);      
    },*/
    
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
        
        //this.populateDropDown(this.dictionaries.city, 'city');
        this.populateDropDown(this.dictionaries.country, 'country');
        //this.populateDropDown(this.dictionaries.subcategory, 'subcategory');
        this.populateDropDown(this.dictionaries.category , 'category');
        this.populateDropDown(this.dictionaries.salaryRange, 'salaryRange');
        this.populateDropDown(this.dictionaries.contractType, 'contractType');

        return this;
    },
    
    goHome: function() {
    
       window.location.hash =  '';
        
    }
    
});


var ResultSetView = Backbone.View.extend({

});
