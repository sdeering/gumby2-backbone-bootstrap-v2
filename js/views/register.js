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

                //submit register form
                this.cache.formSubmit.on(Gumby.click, function(e)
                {
                    e.preventDefault();
                    console.log('submit form...');
                    _this.cache.form.submit();
                });

                //new captcha
                $('#refresh-captcha').on(Gumby.click, function(e)
                {
                    $('img#captcha').attr("src","/php/newCaptcha.php?rnd=" + Math.random());
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
                        "termsChk": {
                            "required": true
                        },
                        "captcha": {
                            "required": true,
                            "remote" :
                            {
                              url: '/php/checkCaptcha.php',
                              type: "post",
                              data:
                              {
                                  code: function()
                                  {
                                      return $(':input[name="captcha"]').val();
                                  }
                              }
                            }
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
                        "termsChk": "Please confirm you have read our Terms & Conditions.",
                        "captcha": {
                            "required": "Please enter the verifcation code.",
                            "remote": "Verication code incorrect, please try again."
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