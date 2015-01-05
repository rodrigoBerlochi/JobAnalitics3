var ProfileFormView = Backbone.View.extend({

});

var ProfileBriefView = Backbone.View.extend({
    
    el: '#wrapper'
    
    template: $('body'),
    
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