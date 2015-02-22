/*
* Side menu view
*/
var SideMenu = Backbone.View.extend({

    el: '.sidebar',
    
    initialize: function() {},
    
    events: {
        'click .sb-results': 'goResults',
        'click .sb-profile': 'goProfile',
        'click .sb-home': 'goHome',
        'click .sb-close': 'closeApp'
    },
    //close the App, after ask user for confirmation
    closeApp: function() {
        var answer = confirm('JobAnalitics va a ser cerrada');
        if(answer === true){
            navigator.app.exitApp();
        }
        this.closeSlide();
    },
    //Ask Router to change page, let's see Results
    goResults: function() {

        Events.trigger('router:navigate', 'resultView');
        this.closeSlide();
        
    },
    //Ask Router to change to Profile view
    goProfile: function() {
    
        Events.trigger('router:navigate', 'profileView');
        this.closeSlide();
        
    },
    //empty hash on URL to fire default route on Router. Fired events to evaluate again showing buttons
    goHome: function() {
    
       window.location.hash =  '';
       this.closeSlide();
       
       Events.trigger('LandingView:enableProfileBttn');
       Events.tri('LandingView:enableResultsBttn');    
        
    },
    //close side menu
    closeSlide: function() {
    
        this.$el.sidebar('toggle');
        
    }
    
});


/*
*Landing page view
*/
var LandingView = Backbone.View.extend({

    el: '#container',
    
    events: {
    
        'click .hamburger': 'slideMenu',
        'click .results': 'goResults',
        'click .profile': 'goProfile'
    },
    
    //store compiled template of the landing page
    template: JST['templates_src/landing.tpl'],
    
    //the Init create a custom global event to render this view. Router will trigger it.
    initialize: function() {
        
        Events.on('LandingView:show', this.render, this);
        Events.on('LandingView:enableProfileBttn', this.enableProfileButton, this);
        Events.on('LandingView:enableResultsBttn', this.enableResultButton, this);
    },
    
    //set data context into the template and pass it to the slidePage plugin, who renders it and
    //do the visual transition enter-exit page
    render: function() {
                
        var compiledTpl = this.template(this.model.toJSON());
            
        app.slider.slidePage($(compiledTpl));
    
        //let's evaluate if result access could be able
        this.enableResultButton();

    },
    //show/hide left side menu
    slideMenu: function(){

        $('.sidebar').sidebar('toggle');
        
    },
    //every page change is performed trough the Router
    //sending out the view name as a param
    goResults: function() {

        Events.trigger('router:navigate', 'resultView');
         
    },
    //asking Router for the profile view
    goProfile: function() {
    
         Events.trigger('router:navigate', 'profileView');
        
    },
    //check if Profile exists, then enable Results viewing
    enableResultButton: function() {
        var isProfileEmpty = Events.trigger('ProfileView:checkProfile');
        var bttn = this.$('.results');
        
        if(isProfileEmpty){ //true, any profile is already saved
            //don't show result button, we can't perform the API request
            bttn.attr('disabled','disabled');
        } else {
            //show button
            bttn.removeAttr('disabled');
        }
    },
    //enable profile button if dropdown options are ready
    //called from a custom event fired on the app.localDictionaries
    enableProfileButton: function() {
         this.$('.profile').removeAttr('disabled');
         this.$('.profile .dimmer').hide();
    }
    
});



/*
*Profile page view
*/
var ProfileView = Backbone.View.extend({
    
    el: '#container',
    
    template: JST['templates_src/profile.tpl'], 
    
    initialize: function() {
    
        Events.on('ProfileView:show', this.render, this);

        //this.listenTo(this.model, 'change', this.render);
        Events.on('ProfileView:checkProfile', this.isProfileEmpty, this);
        Events.on('ProfileView:getQueryString', this.getProfileQueryString, this);
        
        this.createDropDowns();
       
    },
    
    events: {
        'click .cancel': 'goHome',
        'change select': 'saveAttribute',
        'change select.category': 'showSubcategories',
        
        'change select.country': 'showProvince',
        'change select.province': 'showCity',
        
        'click input': 'enableSaving',
        'click .edit': 'toggleEditLayer',
        
        'click .save': 'saveProfile'
    },
    
/*    bindings: {
        '#category': 'category',
        '#subcategory': 'subcategory',
        '#keyword': 'keyword',
        '#city': 'city',
        '#country': 'country',
        '#province': 'province',
        '#salaryRange': 'salaryRange',
        '#contract': 'contract'
    },*/
    
    //don't erase next attribute, will hold every dictionary
    dictionaries: {},
    
    saveProfile: function() {
        
        this.getKeyword();
        
        this.model.persistProfile();
        
        Events.trigger('LandingView:enableResultsBttn');
        
        //TODO remove it, just for testing, the QS should be asked from Result view
        Events.trigger('ProfileView:getQueryString');
        
    },
    
    getKeyword: function() {
        
        var val = this.$('#keyword').val();
        if(val !== ''){
            this.model.set('keyword',val);
    
            alert('profile view - check keyword from model, kw saved!: ' + this.model.get('keyword') );
        }
        
    },
    
    createDropDowns: function() {
        this.getDictionaries(); 
    },
    
    showSubcategories: function() {
        var el = this.$('select.category'),
            val = el.find('option:selected').attr('id');
        
        this.populateDropDown(this.dictionaries.subcategory, 'subcategory', val);
        
        this.$('.subcategory-holder').removeClass('hide');
    },
    
    showProvince: function() {
        var el = this.$('select.country'),
            val = el.find('option:selected').attr('id');
       
        
        this.populateDropDown(this.dictionaries.province, 'province', val);
        
        this.$('.province-holder').removeClass('hide');
    },
    
    showCity: function() {
        var el = this.$('select.province'),
            val = el.find('option:selected').attr('id');
         
        this.populateDropDown(this.dictionaries.city, 'city', val);
        
        this.$('.city-holder').removeClass('hide');
    },
    
    getDictionaries: function() {
        
        this.dictionaries.city = app.localDictionaries.getThisDictonary('city');
        this.dictionaries.country = app.localDictionaries.getThisDictonary('country');
        this.dictionaries.subcategory = app.localDictionaries.getThisDictonary('subcategory');
        this.dictionaries.category = app.localDictionaries.getThisDictonary('category');
        this.dictionaries.salaryRange = app.localDictionaries.getThisDictonary('salary-range');
        this.dictionaries.contractType = app.localDictionaries.getThisDictonary('contract-type');
        this.dictionaries.province = app.localDictionaries.getThisDictonary('province');
            
    },
    
    populateDropDown: function(data, target, filterBy) {
      var html = '',
          data = data || {};
        
      for(var i=0; i < data.length; i++){  
         
          if(filterBy != undefined){
            if(data[i].parent != filterBy){              
                continue;
            }else{
                //alert(data[i].parent + '-' + filterBy);
            }; 
          }
         
          
          html += '<option id="' + data[i].id + '" value="' + data[i].key + '">' + data[i].value + '</option>';
      }
        
      this.$('.' + target).html(html);      
    },
    
    enableSaving: function() {
        this.$('.save').removeAttr('disabled');
    },
    
    //save selected value on the model
    saveAttribute: function(event) {
        this.$('.save').removeAttr('disabled');
        
        var el = event.target;
        var name = el.className;
        var node = el.nodeName;
        var value = el.options[el.selectedIndex].value;
        
        this.model.set(name,value);
    
        //alert('model saved this: ' + name + '-val: ' + this.model.get(name) );
    },
    
    isProfileEmpty: function() {
        //get model attributes
        var model = this.model.toJSON(),
            key;
        //iterate model attr
        for(key in model){
            //if each attr is empty, we won't return FALSE never, returning default value
            //if just one attr has value, we'll return FALSE = is not empty
            if(model.hasOwnProperty(key) && model[key] !== ''){
                return false;
            }
        }
        //default value is true = empty
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
        //model vals are linked to the brief profile layer, not to controls
        var compiledTpl = this.template(this.model.toJSON());

        app.slider.slidePage($(compiledTpl));
        //stick then model vals to hidden inputs, not to controls
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
        
    },
    //service to return query string asking own model
    //call event to ask this service, from external modules
    //never call directly this model from an external view
    getProfileQueryString: function() {
        
        var qsProfile = this.model.getProfileQuery();
        alert('view profile getProfileQueryString: ' + qsProfile);
        return qsProfile;
    }
    
});

var ResultSetView = Backbone.View.extend({

});
