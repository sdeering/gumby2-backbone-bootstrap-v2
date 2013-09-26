// Gumby is ready to go
Gumby.ready(function() {
	Gumby.log('Gumby is ready to go...', Gumby.dump());

	// placeholder polyfil
	if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
		$('input, textarea').placeholder();
	}

// Oldie document loaded
}).oldie(function() {
	Gumby.warn("This is an oldie browser...");

// Touch devices loaded
}).touch(function() {
	Gumby.log("This is a touch enabled device...");
});

// Document ready
$(function() {

	// skip link and toggle on one element
	// when the skip link completes, trigger the switch
	$('#skip-switch').on('gumby.onComplete', function() {
		$(this).trigger('gumby.trigger');
	});


	/* WEB APP BEGIN */

    window.WEBAPP = window.WEBAPP || {};
    window.WEBAPP = {

        settings: {


        },

        cache: {},

        init: function()
        {
            console.log('MAIN WEBAPP controller init...');
            this.preloadImages(); //handle preloading of assets
        },

        /* ------ ASSET PRELOAD FUNCTIONALITY ---------------------------------------------- */

        preloadImages: function()
        {
            var _this = this;

            // Create a preloader. There is no manifest added to it up-front, we will add items on-demand.
            var preload = new createjs.LoadQueue(true, "");
            preload.setMaxConnections(5); //control async loading

            //complete callback
            preload.addEventListener("complete", function()
            {
                console.log('ASSETS PRELOADED...');
            });

            //images
            var imagesManifest = [

                "/img/adventure-time.jpg",
                "/img/sam.jpg"

            ];
            preload.loadManifest(imagesManifest);

        }

    }

    window.WEBAPP.init();


});

