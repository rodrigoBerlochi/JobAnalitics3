/*
* Side menu view
*/
var SideMenu = Backbone.View.extend({

    el: '.sidebar',
    
    initialize: function() {
        Events.on('SideMenu:enableResultOption', this.enableResultOption, this);
    },
    
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
       Events.trigger('LandingView:enableResultsBttn');    
        
    },
    //close side menu
    closeSlide: function() {
    
        this.$el.sidebar('toggle');
        
    },
    
    //
    enableResultOption: function(isProfileEmpty) {
        if(isProfileEmpty){
            this.$('.sb-results').addClass('hide');
        }else{
            this.$('.sb-results').removeClass('hide');
        }
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
        
        //Events.trigger('ProfileView:checkProfile');
    },
    
    //set data context into the template and pass it to the slidePage plugin, who renders it and
    //do the visual transition enter-exit page
    render: function() {
                
        var compiledTpl = this.template(this.model.toJSON());
            
        app.slider.slidePage($(compiledTpl));
    
        //let's evaluate if result access could be able
        this.enableResultButton();
             
        if(app.profileView !== undefined){ 
           //all the Dict are ready, so enable profile button now
           Events.trigger('LandingView:enableProfileBttn');
        }
        
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
            //alert('enabling result bttn');
        var isProfileEmpty = this.model.checkLocalStorage();
        
        var bttn = this.$('.results');
            //alert('isProfileEmpty: ' + isProfileEmpty);
        
        if(isProfileEmpty){ //true, any profile is already saved
            //alert('no enabling');
            //don't show result button, we can't perform the API request
            bttn.attr('disabled','disabled');
            
        } else {
            //alert('enabling!');
            //show button
            bttn.removeAttr('disabled');
        }
        
        Events.trigger('SideMenu:enableResultOption', isProfileEmpty);
    },
    //enable profile button if dropdown options are ready
    //called from a custom event fired on the app.localDictionaries
    enableProfileButton: function() {
        //console.log('enabling profile');
        
         this.$('.profile').removeAttr('disabled');
         this.$('.dimmer.lnd').hide();
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
        
        if(app.errorLoadingFilters){
            this.enableSaving();
        }
        
        this.createDropDowns();
       
    },
    
    events: {
        'click .cancel': 'goHome',
        'change select': 'saveAttribute',
        'change select.category': 'showSubcategories',
        
        'change select.country': 'showProvince',
        'change select.province': 'showCity',
        'click .clear': 'clearingLocalStorage',
        'click input': 'enableSaving',
        'click .edit': 'toggleEditLayer',
        'click .search': 'searchResults',
        'click .save': 'saveProfile'
    },
    
    //don't erase next attribute, will hold every dictionary
    dictionaries: {},
    
    //clear Profile params from local storage
    clearingLocalStorage: function() {
        var direction = confirm(app.resourceBundle.cleanStorage);
        if(direction === true){
            localStorage.clear();
            window.location.hash =  '';
       
            Events.trigger('LandingView:enableProfileBttn');
            Events.trigger('LandingView:enableResultsBttn'); 
        }
    },
    
    searchResults: function() {
        Events.trigger('LandingView:enableResultsBttn');
        
        //Ask Router to show result page
        Events.trigger('router:navigate', 'resultView');
    },
    
    saveProfile: function() {
        
        this.getKeyword();
        
        this.model.persistProfile();
        
        
        this.searchResults();
        //Events.trigger('LandingView:enableResultsBttn');
        
        //Ask Router to show result page
        //Events.trigger('router:navigate', 'resultView');
        
    },
    
    getKeyword: function() {
       
        var val = this.$('#keyword').val();
       
        if(val !== ''){
            this.model.set('keyword',val);
    
        //alert('profile view - check keyword from model, kw saved!: ' + this.model.get('keyword') );
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
        //this.dictionaries.salaryRange = app.localDictionaries.getThisDictonary('salary-range');
        //this.dictionaries.contractType = app.localDictionaries.getThisDictonary('contract-type');
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
        
        if(value === ''){
            return false;
        }
        
        this.model.set(name, value);
    
        //alert('model saved this: ' + name + '-val: ' + this.model.get(name) );
    },
    
    isProfileEmpty: function() {
        //get model attributes
        var model = this.model.toJSON(),
            key, 
            answer = true; //default value is true = empty
        
        //iterate model attr
        for(key in model){
            //if each attr is empty, we won't return FALSE never, returning default value
            //if just one attr has value, we'll return FALSE = is not empty
            if(model.hasOwnProperty(key) && model[key] !== ''){
                answer = false;
            }
        }
        alert('answer 1 ' + answer);
        
        Events.trigger('LandingModel:profileStatus', answer);
        //returning for other kind of uses
        return answer;
    },
    
    toggleEditLayer: function() {
        
        var action = this.isProfileEmpty()?'show':'hide';
        
        var brief = this.$('.profile-brief'),
            editing = this.$('.swiper-container'),
            save = this.$('.topcoat-button--cta.save'),
            edit = this.$('.topcoat-button--cta.edit'),
            search = this.$('.topcoat-button--cta.search'),
            clear = this.$('.topcoat-button--cta.clear');
        
            
        if(action === 'show'){
            
            brief.addClass('hide');
            editing.removeClass('hide');
            save.removeClass('hide');
            edit.addClass('hide');
            clear.addClass('hide');
            search.addClass('hide');
            
            this.createSwiper();
            
        }else{ //'hide'
            
            editing.addClass('hide');
            search.removeClass('hide');
            brief.removeClass('hide');
            save.addClass('hide');
            edit.removeClass('hide');
            clear.removeClass('hide');
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
        this.toggleEditLayer();
        
        //this.populateDropDown(this.dictionaries.city, 'city');
        this.populateDropDown(this.dictionaries.country, 'country');
        //this.populateDropDown(this.dictionaries.subcategory, 'subcategory');
        this.populateDropDown(this.dictionaries.category , 'category');
        //this.populateDropDown(this.dictionaries.salaryRange, 'salary-range');
       // this.populateDropDown(this.dictionaries.contractType, 'contract-type');

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
        alert('Profile, query string got from model: ' + qsProfile);
        
        Events.trigger('setProfileOnResults', qsProfile);
    }
    
});



/*
*Result page view
*/
var ResultSetView = Backbone.View.extend({
    
    el: '#container',
    
    template: JST['templates_src/results.tpl'],
    
    events: {

    },
    
    initialize: function() {
        alert('Initialize Result View');         
        
        Events.on('setProfileOnResults', this.setProfileOnResults, this);
        Events.on('ResultSetView:show', this.populateModel, this);
        Events.on('ResultSetView:render', this.render, this);
        

       // this.setProfileFromLocal();
    },
    
    //Basic mechanism to get Job offers from the API: ask Profile module for the profile query
    //and ask its own model to request answer from the API
    populateModel: function() {
        //get profile from Profile View in a query string format
        Events.trigger('ProfileView:getQueryString');
        //use that query string and model information, to ask model to update its attributes from Infojobs API
        Events.trigger('FetchModel');
    },
    
    //event-callback fired from profile view, it gets the profile query string 
    //and set it in its model
    setProfileOnResults: function(string) {
        this.model.profile = string;
        alert('Profile string saved on result model: ' + this.model.profile);
    },
    
    //workaround to get profile string when Profile view-model has not already create
    //in example, user asks for result page without enter never to profile
    //expecting to use its saved profile
    /*setProfileFromLocal: function() {
        
        if(this.model.profile === ''){
            this.model.profile = localStorage.getItem('profileQuery');
        }
        
    },*/
    
    //render template on the page, fired when the Fetch is done and succesful
    render: function() {
        alert('ResultSetView:render fired');
        var compiledTpl = this.template( this.model.toJSON() );

        app.slider.slidePage($(compiledTpl));
        
        console.dir(this.model.toJSON());
        
        alert(this.model.get('totalResults') + ' son los resultados totales');
        
        
        if(this.model.get('totalResults') == 0 ){
            this.$('#graphics .msg').html(app.resourceBundle.noResults);
        } else {
            this.getFacetsValues();
        }
        
        this.fireScrolling();
        
        return this;
    },
    
    //
    fireScrolling: function(){
        var wrapp = document.getElementById('graphics');
        var v = this;
        wrapp.addEventListener('touchmove', function(e){
            if(e.changedTouches[0].pageY > 265){
                v.$('header').addClass('reduced');
            }
            
        }, false);
    },
    
    //iterates useful facets values from model
    getFacetsValues: function() {
    
        var facets = this.model.get('facets'),
            facetsLength = facets.length;
        
        for(var i=0; i<facetsLength; i++){
            var key = facets[i].key, 
                name = facets[i].name, 
                values = facets[i].values;

            
            //one chart per facet node
            /*key = normalized ID
             *name = chart human name
             *values =  array of objects, each object is X/Y point
             *where [i].value is X, and [i].count is Y
             */
            this.createChartGraphics(key, name, values);
            
        }
        
        
    },
    
    
    //it works as a general hub articulating all function calling in order to create a graph
    createChartGraphics: function(key, name, values) {
        
        this.createCanvas(key, name);
        
        var data = this.createData(key, name, values);
        
        this.createGraphic(key, data);

    },
    
    //insert in the DOM a canvas for each facet
    createCanvas: function(key, name) {
        
        this.$('#graphics').prepend('<div id="' + key + '" style="width:100%; height:400px;"></div>');
  
    },
    

    createData: function(key, name, values) {
        
        name = name || '';
        key = key || '';
        values = values || {};
        var serieName = 'Empleos';
        var chartType = 'bar';
        
        var data = {
            
            chart: {
                type: chartType,
                zoomType: 'xy'
            },
            title: {
                text: name
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: name
                }
            },
            series: [{
                name: serieName,
                data: []
            }]
        
        };
        
        
        //data.xAxis.categories[] -> value
        //data.yAxis.series.data[] -> count
        
        var vLength = values.length;
        
        for(var i=0; i<vLength; i++){
            data.xAxis.categories.push(values[i].value);
            data.series[0].data.push(values[i].count);
        }
        
        return data;
    },
    
    
    /*randomColor: function() {
    
        return '#'+Math.floor(Math.random()*16777215).toString(16);
        
    },*/
    
    //
    createGraphic: function(key, data) {
    
        $('#' + key).highcharts(data);
    
    }
    
});
