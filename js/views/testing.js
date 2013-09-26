


window.TestingView = Backbone.View.extend({

    initialize:function () {

        window.WEBAPP = window.WEBAPP || {};
        window.WEBAPP.TESTING = {

            cache: {},

            data: {},

            init: function()
            {
                console.log('Initializing Testing View');

            }

        }

    },

    render:function () {

        var _this = this;
        this.data1 = {"data1":{"name":"Sam Deering","location":"Sydney, Australia","occupation":"Web Developer","blog":"jQuery4u.com","website":"samdeering.com"}};

        // console.log(this.el);
        if (!this.data2)
        {
            var dataRequest = $.getJSON('php/data.php');
            dataRequest.done(function(data)
            {
                console.log('ajax request to get data done..');
                _this.data2 = data;
                _this.data = $.extend({}, _this.data1, _this.data2);
                $(_this.el).html(_this.template(_this.data));
            });
        }
        else
        {
            $(this.el).html(this.template(this.data));
        }
        return this;

    }

});


// window.TestingView = Backbone.View.extend({

//     // `tagName` and `className` are standard parts of Backbone.View that
//     // are used to dynamically create the view's `el` property.
//     tagName: 'li',
//     className: 'foo',

//     // `template` is an HTML fragment that will be populated with data
//     // from the model. More on this further on in the post.
//     template: '<strong><%= name %></strong><a href="#" class="fooButton">Click me</a>',

//     // `events` functions as a hash table of events and function names
//     // for a Backbone.View to map DOM events to. Think of it as the Router's
//     // `routes` hash table for your View.
//     events: {
//         'click .fooButton': 'fooClicked'
//     },

//     // `initialize` is used as an entry point into the View. It functions
//     // like a constructor.
//     initialize: function (options) {

//         // If your view needs to be dynamic, you'll want to pass it a model.
//         this.model = options.model;

//         // Here, we're listening to the `change` event on the model. Any time
//         // the Model this View is watching changes, its `render` method will
//         // get called, allowing the view to keep up to date with the Model state.
//         this.model.on('change', this.render);
//     },

//     // `render` dictates how the Model will be represented in the DOM. You can use
//     // whatever methods you like to create your View's content. The most popular
//     // way of doing so is to use a client-side templating system.
//     render: function () {

//         // Creating an HTML string populated with the Model our view is watching.
//         // Here, we're using Underscore's built in `template` function, but you
//         // can use any other templating system, or concatenate strings manually
//         // if that's your thing.
//         var html = _.template(this.template, this.model.toJSON());

//         // Inject the HTML fragment into our view's `$el` alias (more on this)
//         // below...
//         this.$el.html(html);

//         // It's always good practice to return `this` from your render method
//         // so it can be chained off of.
//         return this;
//     }

// });




// var TemplatedView = Backbone.View.extend({
//     render: function(){
//       var html = this.template.tmpl(this.model.toJSON());
//       this.el.html(html);
//     }
// });

// window.TestingView = TemplatedView.extend({

//     el: $("#user-list ul"),

//     template: $("#user-list-template")

// });





