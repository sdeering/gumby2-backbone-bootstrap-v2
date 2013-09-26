window.FooterView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Footer View');

        window.WEBAPP = window.WEBAPP || {};
        window.WEBAPP.FOOTER = {

            cache: {},

            init: function()
            {
                console.log('FOOTER view controller init...');


                //modals with touch scrollbars - modals are in FooterView.html
                $('.modal-iscroll').on(Gumby.click, function(e)
                {
                    var scrollName = $(this).data('scrollName');

                    //it needs to be visible for it to work...
                    setTimeout(function()
                    {
                        if (!window[scrollName].wrapper) {
                            console.log('modal iscroll...');
                            console.log(scrollName);
                            window[scrollName] = new iScroll(scrollName);
                        }
                        else
                        {
                            window[scrollName].scrollTo(0,0);
                        }
                    }, 10);

                });

                //auto check terms when accept on modal
                $('#terms-ok').on(Gumby.click, function(e)
                {
                    $('#termsChk').trigger('gumby.check');
                    $('#termsChk').attr('checked', 'checked');
                });

            }

        }

    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});