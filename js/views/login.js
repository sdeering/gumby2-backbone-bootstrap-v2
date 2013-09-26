window.LoginView = Backbone.View.extend({

    initialize:function () {

        window.WEBAPP = window.WEBAPP || {};
        window.WEBAPP.LOGIN = {

            cache: {},

            data: {},

            init: function()
            {
                console.log('Initializing Login View');

            }

        }

    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});