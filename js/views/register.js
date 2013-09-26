window.RegisterView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Register View');

        window.WEBAPP = window.WEBAPP || {};
        window.WEBAPP.REGISTER = {

            cache: {},

            data: {},

            init: function()
            {
                console.log('register view controller init...');

                var _this = this;

                //setup DOM cache
                this.cache.form = $('#register-form'); //main form with header
                this.cache.formSubmit = this.cache.form.find('#register-submit');

                this.eventHandlers();

                //rego form validation
                this.setupValidation();

                //clear the form
                this.resetForm(this.cache.form);

                //focus first input
                this.cache.form.find(':input').not('[type="reset"]').first().focus().trigger('click');

                //get/set the centres
                // this.getCentreData();
            },

            eventHandlers: function()
            {
                var _this = this;
                this.cache.formSubmit.on(Gumby.click, function(e)
                {
                    e.preventDefault();
                    console.log('submit form...');
                    _this.cache.form.submit();
                });

                //checkbox fix
                $('input.checkbox').on(Gumby.click, function(e) {
                    var thisChk = $(this);
                    if (thisChk.hasClass('checked'))
                    {
                        thisChk.find('span').html('');
                        thisChk.find('input[type=checkbox]').removeAttr("checked");
                        thisChk.removeClass('checked');
                    }
                    else
                    {
                        thisChk.find('input[type=checkbox]').attr("checked", "checked");
                        thisChk.find('span').html('<i class="icon-check"></i>');
                        thisChk.addClass('checked');
                    }
                });
            },

            setupValidation: function()
            {
                /*

                    Step1:
                        - all fields are required
                        - email as email
                        - mobile as phone
                        - dob as dd/mm/yyyy

                */

                var _this = this;

                /* Some of these rules are specified as HTML5 rules inline */
                this.cache.form.validate({
                   onkeyup: false,
                   onclick: false,
                   onfocusout: false,
                   rules: {
                        "first-name": {
                            "required": true
                        },
                        "last-name": {
                            "required": true
                        },
                        "email": {
                            "required": true
                        },
                        "mobile": {
                            "required": false,
                            "number": true,
                            "minlength": 10,
                            "maxlength": 10
                        },
                        "centre": {
                            "required": true
                        },
                        "terms": {
                            "required": true
                        }
                    },
                    messages: {
                        "first-name": "Please enter your first name.",
                        "last-name": "Please enter your last name.",
                        "email": {
                            "required": "Please enter your email address.",
                            "email": "Please enter a valid email address."
                        },
                        "mobile": "Please enter a valid mobile number.",
                        "centre": {
                            "required": "Please select your nearest Centre."
                        },
                        "terms": {
                            "required": "Please confirm you have read our Terms & Conditions."
                        }
                    },
                    submitHandler: function(form)
                    {

                        console.log('submitting form...');

                        /* -------- AJAX REGISTER ----------------------------------------------------- */

                        var registerRequest = $.ajax({
                             type: "POST",
                             url: "/php/dummyScript.php",
                             data: {
                                "data": _this.cache.form.serialize()
                            }
                        });

                        registerRequest.done(function(msg)
                        {
                            //registration was a success
                            console.log('registration was a success');
                            window.location.href = "#entry";
                        });

                        registerRequest.fail(function(jqXHR, textStatus)
                        {
                            //registration fail
                            console.log( "registration fail - an error occurred: (" + textStatus + ")." );
                        });

                    }

                });

            },

            getCentreData: function()
            {
                var _this = this;

                /* -------- AJAX GET POSTCODE DATA ----------------------------------------------------- */
                //cache this data in browser HTML5

                var checkMembershipRequest = $.ajax({
                    type: "GET",
                    dataType: "JSON",
                    url: "/php/suburbs.php"
                });

                checkMembershipRequest.done(function(data)
                {
                    // console.log(data);
                    // localStorage.postcodeData = JSON.stringify(data);
                    _this.data.suburbs = data.suburbs;
                    $.each(_this.data.suburbs, function(i,v)
                    {
                        _this.cache.$suburbs.append('<option data-value='+i+' data-postcode='+v.postcode+' data-state='+v.state+'>'+i+'</option>');
                    });

                    //hook up data handler when suburb is changed
                    _this.cache.$suburbInput.on('change, blur', function()
                    {
                        var $el = $(this);

                        //slight delay needed for plugin to register change
                        setTimeout(function()
                        {
                            var val = $el.val(),
                                selected = _this.data.suburbs[val],
                                postcode = selected.postcode,
                                state = selected.state;

                            if (postcode)
                            {
                                _this.cache.$postcodeInput.val(postcode);
                            }

                            if (state)
                            {
                                _this.cache.$stateInput.val(state);
                            }

                        }, 300);

                    });

                    //hook up drop down auto complete
                    _this.cache.$suburbInput.relevantDropdown();

                });

                checkMembershipRequest.fail(function(jqXHR, textStatus)
                {
                    console.log( "postcode request fail - an error occurred: (" + textStatus + ")." );
                    //try again...
                });

            },

            resetForm: function($form)
            {
                $form.find('input[type="reset"]').trigger('click');
                $form.find('label.error').remove();
                $form.find(':input.error').removeClass('error');
            }

        }

    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});