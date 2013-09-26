window.EntryView = Backbone.View.extend({

    initialize:function () {

        window.WEBAPP = window.WEBAPP || {};
        window.WEBAPP.ENTRY = {

            cache: {},

            data: {},

            init: function()
            {
                console.log('Initializing Entry View');

            }

        }

    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});